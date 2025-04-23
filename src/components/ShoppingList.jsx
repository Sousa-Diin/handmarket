import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useBuyList } from "../hooks/useBuyList";

const ShoppingList = ({ item, onClick }) => {
  // Captura e salva a lista selecionada no localStorage
  const { selectList, getCartTotal } = useBuyList();
  const handleChange = () => {
    selectList(item.listID);
    onClick('list');
  }


  return (
    <h5 key={item.id} className="flex justify-between items-center  h-[45dvh] w-full bg-[#67918f] rounded-md p-2">
      <aside style={{display:"flex"}} className="h-[70%] flex flex-col justify-around ">
        <span className="text[1.5rem] ">{item.listName}</span>
        <div className="flex min-w-15 w-15 h-7 p-1 gap-2 text-[1rem] rounded-2xl bg-blue-950 text-center font-bold">
          <span>{item.buyList.length}</span>
          <p>itens</p>
        </div>
        <span className=" text-[1.5rem]">R${Number(getCartTotal(item.listID)).toFixed(2)}</span>
      </aside>
      <IoIosArrowForward onClick={handleChange} className="w-[32px] h-[32px] bg-[#3b473e] rounded-2xl" />
    </h5>
  );
}

export default ShoppingList;