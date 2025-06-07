import React, { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./index.css"; // Tailwind
import { useProduct } from "./context/ProductContextProvider";
import HandMarket from "./pages/HandMarket";
import DropdownMenu from "./components/DropdownMenu";
import AllListsViewer from "./pages/AllListViewer";

function App() {
  const { cart, pageColor } = useProduct(); // Carrinho vindo do contexto
  const [openPage, setOpenPage] = useState("main"); // Estado para controlar a página aberta
  const [page, setPage] = useState({
    product: <ProductList />, 
    allList: <AllListsViewer />,
    cart: <Cart cart={cart} />,
    list: <ProductList />,
    addProduct: <ProductForm />,
    main: <HandMarket onClick={setOpenPage} />,
  });

  return (
    <div style={{backgroundColor: pageColor.secondary}} className="flex flex-col items-center  w-full h-[auto] gap-1 text-[#c8e9e5]">
      
      <div className=" w-full  flex flex-col items-center text-[#c8e9e5]">
       {page[openPage]}
      </div>
      {openPage === 'main' ? '' : (<DropdownMenu setOpenPage={setOpenPage} />)}
    </div>
  );
}

export default App;

