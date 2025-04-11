import React, { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./index.css"; // Tailwind
import { useProduct } from "./context/ProductContextProvider";
import HandMarket from "./pages/HandMarket";
import DropdownMenu from "./components/DropdownMenu";

function App() {
  const { cart } = useProduct(); // Carrinho vindo do contexto
  const [openPage, setOpenPage] = useState("list");

  return (
    <div className="flex flex-col items-center w-full h-[100dvh] bg-[#303f47] gap-1 text-[#c8e9e5]">
      <h2 className="text-md font-bold text-center mb-5">HandMarket</h2>

      {openPage === "list" ? (
        <>
          <span className="ml-4">
            Total de itens na lista [{cart.length}]
          </span>
          <div className="main-section w-full flex flex-col bg-[#303f47] text-[#c8e9e5]">
            <ProductList />
          </div>
        </>
      ) : openPage === "addProduct" ? (
        <ProductForm />
      ) : openPage === "cart" ? (
        <Cart cart={cart} />
      ) : (
        <HandMarket />
      )}

      <DropdownMenu setOpenPage={setOpenPage} />
    </div>
  );
}

export default App;

