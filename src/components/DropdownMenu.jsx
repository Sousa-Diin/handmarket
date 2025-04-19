import { IoMdAddCircle } from "react-icons/io";
import { BsCartCheckFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";

const DropdownMenu = ({setOpenPage}) => {
  return(
    <section className="fixed bottom-0 rounded-3xl p-3 w-[50dvw] h-[10dvh] 
    flex bg-[#67918f] text-[#c8e9e5] mb-3 shadow-lg
      justify-between items-center text-center text-sm font-bold
     gap-3 " 
     style={{ display: "flex", flexDirection: "row" }}>
      <FaListUl onClick={()=> setOpenPage('main')} className="md:w-30px w-15 h-5  hover:text-[#39ff14] transition-all duration-300 ease-in-out" />
      <IoMdAddCircle  onClick={()=> setOpenPage('addProduct')} className="text-[#39ff14] w-30 h-10  hover:text-[#72b8ad] transition-all duration-300 ease-in-out" />
      <BsCartCheckFill onClick={()=> setOpenPage('cart')} className=" md:w-30px  w-20 h-5 hover:text-[#39ff14] transition-all duration-300 ease-in-out" />
    </section>
  );
}

export default DropdownMenu;

