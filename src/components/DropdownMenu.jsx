import { IoMdAddCircle } from "react-icons/io";
import { BsCartCheckFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { useProduct } from "../context/ProductContextProvider";

const DropdownMenu = ({setOpenPage}) => {
  const { pageColor } = useProduct();
  return(
    <section className={`fixed bottom-0 rounded-3xl p-3 w-[55dvw] h-[10dvh] 
    flex  mb-4
      justify-between items-center text-center text-sm font-bold
     gap-3 `} 
     style={{ display: "flex", flexDirection: "row", backgroundColor: pageColor.tertiary, color: pageColor.light }}>
      <FaListUl onClick={()=> setOpenPage('main')} className=" w-15 h-5  hover:text-[#39ff14] transition-all duration-300 ease-in-out" />
      <IoMdAddCircle  onClick={()=> setOpenPage('addProduct')} style={{color: pageColor.accent}} className=' w-2xs h-10  hover:text-[#72b8ad] transition-all duration-300 ease-in-out' />
      <BsCartCheckFill onClick={()=> setOpenPage('allList')} className=" md:w-30px  w-20 h-5 hover:text-[#39ff14] transition-all duration-300 ease-in-out" />
    </section>
  );
}

export default DropdownMenu;

