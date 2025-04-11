import React from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./index.css"; // Importa o Tailwind
import { useProduct } from "./context/ProductContextProvider";
import HandMarket from "./pages/HandMarket";
import DropdownMenu from "./components/DropdownMenu";

function App() {
  const { cart } = useProduct(); // Usa apenas o carrinho, pois produtos já estão no contexto

  return (
    <div className=" flex flex-col items-center w-[100%] h-[100dvh] bg-[#303f47] gap-1 text-[#c8e9e5]">
      <h1 className="text-md font-bold text-center mb-5">
        HandMarket
      </h1>
      <span className="ml-4"> Total de itens na lista [{cart.length}]</span>
      <div className="main-section  w-[100%] flex flex-col bg-[#303f47]  text-[#c8e9e5]" >
         <ProductForm />
        <ProductList />
      </div>
      <Cart cart={cart} />
      <HandMarket/>
      <DropdownMenu/>
    </div>
  );
}

export default App;
