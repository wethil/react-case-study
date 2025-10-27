import { test, expect } from "@playwright/test";

// E2E: Home redirects to products
// Assumes dev server runs at http://localhost:5173

test.describe("Navigation and Products Page", () => {
  test("Home redirects to products page", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await expect(page).toHaveURL(/\/products/);
    await expect(
      page.getByRole("heading", { name: /products/i })
    ).toBeVisible();
  });

  test("Sidebar navigation works", async ({ page }) => {
    await page.goto("http://localhost:5173/products");
    await page.getByRole("button", { name: /about page/i }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
  });

  test("Pagination updates URL and content", async ({ page }) => {
    await page.goto("http://localhost:5173/products?page=1");
    const nextButton = page.getByRole("button", { name: /next/i });
    await nextButton.click();
    await expect(page).toHaveURL(/page=2/);
  });

  test("Footer is accessible and visible", async ({ page }) => {
    await page.goto("http://localhost:5173/products");
    const footer = page.getByRole("contentinfo", { name: /footer/i });
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/all rights reserved/i)).toBeVisible();
  });
});
