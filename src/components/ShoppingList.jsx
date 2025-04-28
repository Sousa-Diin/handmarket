import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useBuyList } from "../hooks/useBuyList";
import { MdDeleteForever } from "react-icons/md";
import { useProduct } from "../context/ProductContextProvider";

const ShoppingList = ({ item, onClick }) => {
  // Captura e salva a lista selecionada no localStorage
  const { selectList, getCartTotal, removeList } = useBuyList();
  const handleChange = () => {
    selectList(item.listID);
    onClick('list');
  }
  const { pageColor } = useProduct();


  return (
    <h5 key={item.id} 
      style={{
        backgroundColor: pageColor.cardExDark,
        color:pageColor.light,
      }} 
      className={`flex justify-between items-center  h-[45dvh] w-full  rounded-md p-2`}>
      <aside style={{display:"flex", flexDirection: "row"}} className="h-[70%] flex  justify-center gap-2">
        <div className="flex flex-col gap-2 items-start justify-center ">
          <span className="text-[1.3rem] ">{item.listName}</span>
          <div 
            style={{backgroundColor: pageColor.primary}}
            className={`flex w-20 h-7 p-1 gap-2 text-[1rem] rounded-2xl text-center font-bold`}>
            <span>{item.buyList.length}</span>
            <p>itens</p>
          </div>
          <span className=" text-[1.5rem]">R${Number(getCartTotal(item.listID)).toFixed(2)}</span>
        </div>
        <MdDeleteForever onClick={() => removeList(item.listID)} className='w-5 my-2' style={{color:pageColor.danger}}/>
      </aside>
      <IoIosArrowForward onClick={handleChange} className='w-[32px] h-[32px] rounded-2xl' style={{backgroundColor: pageColor.secondary}}/>
    </h5>
  );
}

export default ShoppingList;