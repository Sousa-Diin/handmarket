import { MdOutlineAddCircle } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { LuListTodo } from "react-icons/lu";
import { MdPlaylistAddCheck } from "react-icons/md";

const DropdownMenu = () => {
  return(
    <section className="fixed bottom-0 rounded p-2 w-[50%] h-[10dvh] 
     bg-[#4a5b63] flex  text-[#c8e9e5] mb-3 shadow-lg
      justify-center items-center text-center text-sm font-bold
     gap-3 " 
     style={{ display: "flex", flexDirection: "row" }}>
      <LuListTodo onClick={()=> alert('Lista de compra')} className="w-8 h-5 hover:text-[#39ff14] transition-all duration-300 ease-in-out" />
      <MdOutlineAddCircle onClick={()=> alert('Adicionar produto')} className="text-[#39ff14] w-25 h-10 shadow hover:text-[#72b8ad] transition-all duration-300 ease-in-out" />
      <BsCartCheckFill onClick={()=> alert('Compra concluidas')} className=" w-8 h-5 hover:text-[#39ff14] transition-all duration-300 ease-in-out" />
    </section>
  );
}

export default DropdownMenu;