import {useState} from "react";
import { useProduct } from "../context/ProductContextProvider";
import { getLocalStorage } from "../utils/localStorage";
import SelectSetor from "./SelectSetor";
import Cart from "./Cart";
import Hander from "./Hader";

const ProductList = () => {

  const currentCart = getLocalStorage("selectedList") ?? []; //captura o carrinho atual

  return (
    <>
      <Hander title={getLocalStorage('selectedList').listName || undefined} />
      <Cart cart={currentCart.buyList}/>
      <div style={{marginTop: "1rem"}} className="bg-[#303f47] flex flex-col felx-nowrap justify-around items-center w-[100%] h-full px-1">               
        {/* Renderiza a pagina-componente selecionada */}
        <SelectSetor />
        
      </div>
    </>
  );
};

export default ProductList;

