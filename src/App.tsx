import React, { useState } from "react";
import Sidebar from "@components/Sidebar.tsx";
import Products from "@pages/ProductsPage.tsx";
import About from "@pages/AboutPage.tsx";
import Header from "@components/Header.tsx";
import Footer from "@components/Footer.tsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState("products");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          {currentPage === "products" && <Products />}
          {currentPage === "about" && <About />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
