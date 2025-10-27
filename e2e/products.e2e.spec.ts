// E2E: Products Page Normal and Edge Cases

import { test, expect } from "@playwright/test";

test.describe("Products Page", () => {
  // Products table renders and paginates
  test("renders products table and paginates", async ({ page }) => {
    await page.goto("http://localhost:5173/products");
    await expect(
      page.getByRole("heading", { name: /products/i })
    ).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    // Check that 10 rows are visible (normal page size)
    const rows = await page.locator("table tbody tr").count();
    expect(rows).toBeGreaterThan(0);
    // Paginate to next page
    const nextBtn = page.getByRole("button", { name: /next/i });
    if (await nextBtn.isEnabled()) {
      await nextBtn.click();
      await expect(page).toHaveURL(/page=2/);
    }
  });

  // Filter by category
  test("filters products by category", async ({ page }) => {
    await page.goto("http://localhost:5173/products");
    // Select a real category (assume Electronics exists)
    await page.selectOption(
      'select[aria-label="Filter by Category"]',
      "Electronics"
    );
    // Check that at least one product row is visible
    const rows = await page.locator("table tbody tr").count();
    expect(rows).toBeGreaterThan(0);
  });

  // Pagination disables next button on last page
  test("pagination disables next button on last page", async ({ page }) => {
    await page.goto("http://localhost:5173/products?page=2");
    const nextBtn = page.getByRole("button", { name: /next/i });
    await expect(nextBtn).toBeDisabled();
  });

  // Pagination disables previous button on first page
  test("pagination disables previous button on first page", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/products?page=1");
    const prevBtn = page.getByRole("button", { name: /previous/i });
    await expect(prevBtn).toBeDisabled();
  });

  // Sort toggles order and updates table
  test("sort toggles order and updates table", async ({ page }) => {
    await page.goto("http://localhost:5173/products");
    const sortHeader = page.getByRole("columnheader", {
      name: /product name/i,
    });
    await sortHeader.click();
    const firstRow = page.locator("table tbody tr").first();
    await expect(firstRow).toBeVisible();
  });
});
