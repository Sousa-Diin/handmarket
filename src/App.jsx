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
  const [openPage, setOpenPage] = useState("main"); // Estado para controlar a página aberta
  const [page, setPage] = useState({
    product: <ProductList />, 
    cart: <Cart cart={cart} />,
    list: <ProductList />,
    addProduct: <ProductForm />,
    main: <HandMarket onClick={setOpenPage} />,
  });

  return (
    <div className="flex flex-col items-center  w-full h-[100dvh] bg-[#303f47] gap-1 text-[#c8e9e5]">
      
      <div className=" w-full  flex flex-col items-center bg-[#303f47] text-[#c8e9e5]">
       {page[openPage]}
      </div>
      {openPage === 'main' ? '' : (<DropdownMenu setOpenPage={setOpenPage} />)}
    </div>
  );
}

export default App;

