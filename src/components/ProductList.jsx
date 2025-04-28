import {useState} from "react";
import { getLocalStorage } from "../utils/localStorage";
import SelectSetor from "./SelectSetor";
import Cart from "./Cart";
import Hander from "./Hader";

const ProductList = () => {
  const currentCart = getLocalStorage("selectedList") ?? [];

  return (
    <>
      <Hander title={currentCart.listName || undefined} />
      <Cart /> {/* NÃO PASSA mais o cart via prop */}
      <div style={{marginTop: "1rem"}} className="bg-[#303f47] flex flex-col justify-around items-center w-[100%] h-full px-1">               
        <SelectSetor />
      </div>
    </>
  );
};

export default ProductList;


