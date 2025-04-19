import { IoIosArrowForward } from "react-icons/io";

const ShoppingList = ({ item, onClick }) => {
  const handleChange = () => {
    onClick('list');
  }
  return (
    <h5 key={item.id} className="flex justify-between items-center  h-[45dvh] w-full bg-[#67918f] rounded-md p-2">
      <aside style={{display:"flex"}} className="h-[70%] flex flex-col items-center justify-around ">
        <span className="text[1.5rem] ">{item.name}</span>
        <div className="flex min-w-15 h-7 p-1 gap-2 text-[1rem] rounded-2xl bg-blue-950 text-center font-bold">
          <span>{item.products.length}</span>
          <p>itens</p>
        </div>
      </aside>
      <IoIosArrowForward onClick={handleChange} className="w-[32px] h-[32px] bg-[#3b473e] rounded-2xl" />
    </h5>
  );
}

export default ShoppingList;