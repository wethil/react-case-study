import React, { Suspense, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "@components/Sidebar.tsx";
import Products from "@pages/ProductsPage.tsx";
import About from "@pages/AboutPage.tsx";
import Header from "@components/Header.tsx";
import Footer from "@components/Footer.tsx";
import ProducPageSkeleton from "@pages/skeletons/ProductsPageSkeleton.tsx";
import { ProductDataProviderContext } from "@/contexts/ProductDataProviderContext.tsx";
import MockProductDataService from "@services/MockProductDataService";
import ErrorPage from "@pages/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

type AppProps = object;

const App: React.FC<AppProps> = () => {
  // Sidebar open state for mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((open) => !open);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <ProductDataProviderContext service={MockProductDataService}>
      <BrowserRouter>
        <div className="flex h-screen bg-gray-100">
          <Sidebar
            currentPage="products"
            onNavigate={handleCloseSidebar}
            isOpen={isSidebarOpen}
            onToggle={handleToggleSidebar}
          />

          {/* Overlay for mobile when sidebar is open */}
          {isSidebarOpen && (
            <button
              type="button"
              className="fixed inset-0 bg-black opacity-25 z-40 md:hidden transition-opacity duration-300"
              onClick={handleCloseSidebar}
              aria-label="Close sidebar overlay"
              tabIndex={0}
              style={{ minHeight: 44, minWidth: 44 }}
            />
          )}

          <div
            className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? "md:ml-64" : "ml-0"
            }`}
          >
            <Header onToggleSidebar={handleToggleSidebar} />

            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/products?page=1" replace />}
                />
                <Route
                  path="/products"
                  element={
                    <ErrorBoundary FallbackComponent={ErrorPage}>
                      <Suspense fallback={<ProducPageSkeleton />}>
                        <Products />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center min-h-[200px]">
                          <div
                            className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
                            aria-label="Loading about page"
                          />
                        </div>
                      }
                    >
                      <About />
                    </Suspense>
                  }
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ProductDataProviderContext>
  );
};

App.displayName = "App";

export default App;
