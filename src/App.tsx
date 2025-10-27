import React, { Suspense, useState, useCallback } from "react";
import Providers from "@/Providers";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Sidebar from "@components/Sidebar.tsx";
import Header from "@components/Header.tsx";
import Footer from "@components/Footer.tsx";
import ProductsPageSkeleton from "@pages/skeletons/ProductsPageSkeleton.tsx";
import ErrorPage from "@pages/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import { getRouteMeta } from "@/utils/getRoute.ts";
import { routes } from "@/routes.ts";
import ErrorLogger from "@utils/ErrorLogger";
import ConsoleLogger from "@utils/ConsoleLogger";

const errorLogger = new ErrorLogger(new ConsoleLogger());

// Lazy load pages for code-splitting
const ProductsPage = React.lazy(() => import("@pages/ProductsPage"));
const AboutPage = React.lazy(() => import("@pages/AboutPage"));

type AppProps = object;

const AppContent: React.FC<{
  isSidebarOpen: boolean;
  handleToggleSidebar: () => void;
  handleCloseSidebar: () => void;
}> = ({ isSidebarOpen, handleToggleSidebar, handleCloseSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = getRouteMeta(location.pathname);

  // Use route object keys directly as paths
  const handleSidebarNavigate = useCallback(
    (routePath: string) => {
      navigate(routePath);
      handleCloseSidebar();
    },
    [navigate, handleCloseSidebar]
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        currentPage={location.pathname}
        onNavigate={handleSidebarNavigate}
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
        routes={routes}
      />

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
        <Header onToggleSidebar={handleToggleSidebar} title={title} />

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path={routes.home.path}
              element={<Navigate to="/products?page=1" replace />}
            />
            <Route
              path={routes.products.path}
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorPage}
                  onError={(error, info) => errorLogger.log(error, info)}
                >
                  <Suspense fallback={<ProductsPageSkeleton />}>
                    <ProductsPage />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path={routes.about.path}
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
                  <AboutPage />
                </Suspense>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const App: React.FC<AppProps> = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((open) => !open);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <Providers>
      <AppContent
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
        handleCloseSidebar={handleCloseSidebar}
      />
    </Providers>
  );
};

App.displayName = "App";

export default App;
