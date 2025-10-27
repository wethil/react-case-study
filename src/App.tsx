import React, { useState, Suspense } from "react";
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
  const [currentPage, setCurrentPage] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <ProductDataProviderContext service={MockProductDataService}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-25 z-40 md:hidden transition-opacity duration-300"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        <div
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
            sidebarOpen ? "md:ml-64" : "ml-0"
          }`}
        >
          <Header onToggleSidebar={toggleSidebar} />

          <main className="flex-1 overflow-y-auto">
            {currentPage === "products" && (
              <ErrorBoundary FallbackComponent={ErrorPage}>
                <Suspense fallback={<ProducPageSkeleton />}>
                  <Products />
                </Suspense>
              </ErrorBoundary>
            )}
            {currentPage === "about" && <About />}
          </main>

          <Footer />
        </div>
      </div>
    </ProductDataProviderContext>
  );
};

export default App;
