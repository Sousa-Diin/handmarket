import React from "react";
import { useProduct } from "../context/ProductContextProvider";
import { IoIosArrowForward } from "react-icons/io";

const ShoppingList = ({ item, onClick }) => {
  const { setLocalStorage, getLocalStorage, sumCartValues } = useProduct();
  // Captura e salva a lista selecionada no localStorage
  const handleChange = () => {
    setLocalStorage("selectedList", item);
    onClick('list');
  }

  const currentCart = getLocalStorage("buiesList");  
  const currentList = currentCart.find((list) => list.listID === item.listID);
  const currentBuyList = currentList ? currentList.buyList : [];

  return (
    <h5 key={item.id} className="flex justify-between items-center  h-[45dvh] w-full bg-[#67918f] rounded-md p-2">
      <aside style={{display:"flex"}} className="h-[70%] flex flex-col justify-around ">
        <span className="text[1.5rem] ">{item.listName}</span>
        <div className="flex min-w-15 w-15 h-7 p-1 gap-2 text-[1rem] rounded-2xl bg-blue-950 text-center font-bold">
          <span>{currentBuyList.length}</span>
          <p>itens</p>
        </div>
        <span className=" text-[1.5rem]">R${sumCartValues(currentBuyList).toFixed(2)}</span>
      </aside>
      <IoIosArrowForward onClick={handleChange} className="w-[32px] h-[32px] bg-[#3b473e] rounded-2xl" />
    </h5>
  );
}

export default ShoppingList;