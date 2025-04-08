import React from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./index.css"; // Importa o Tailwind
import { useProduct } from "./context/ProductContextProvider";

function App() {
  const { cart } = useProduct(); // Usa apenas o carrinho, pois produtos já estão no contexto

  return (
    <div className=" flex flex-col  w-[100dvw] h-[100dvh] bg-[#EEF2F0] p-2">
      <h1 className="text-md font-bold text-[#15696F] text-center mb-5">
        HandMarket
      </h1>
      <button>{cart.length}</button>
      <div className="h-[100%] flex flex-col ">
        {/*  <ProductForm /> */}
        <ProductList />
      </div>
      <Cart cart={cart} />
    </div>
  );
}

export default App;
