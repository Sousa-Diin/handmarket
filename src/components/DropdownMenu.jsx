import { IoMdAddCircle } from "react-icons/io";
import { BsCartCheckFill } from "react-icons/bs";
import { LuListTodo } from "react-icons/lu";

const DropdownMenu = () => {
  return(
    <section className="fixed bottom-0 rounded-2xl p-3 w-[50dvw] h-[9dvh] 
    flex bg-[#67918f] text-[#c8e9e5] mb-3 shadow-lg
      justify-between items-center text-center text-sm font-bold
     gap-3 " 
     style={{ display: "flex", flexDirection: "row" }}>
      <LuListTodo onClick={()=> alert('Lista de compra')} className="w-15 h-5 hover:text-[#39ff14] transition-all duration-300 ease-in-out" />
      <IoMdAddCircle  onClick={()=> alert('Adicionar produto')} className="text-[#39ff14] w-30 h-10  hover:text-[#72b8ad] transition-all duration-300 ease-in-out" />
      <BsCartCheckFill onClick={()=> alert('Compra concluidas')} className=" w-15 h-5 hover:text-[#39ff14] transition-all duration-300 ease-in-out" />
    </section>
  );
}

export default DropdownMenu;