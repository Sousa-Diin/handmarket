import { IoIosArrowForward } from "react-icons/io";

const ShoppingList = ({ item, onClick }) => {
  const handleChange = () => {
    onClick('list');
  }
  return (
    <h5 key={item.id} className="flex justify-between items-center h-[45dvh] w-full bg-[#67918f] rounded-md p-2">
      <span>{item.name}</span>
      <IoIosArrowForward onClick={handleChange} className="w-[32px] h-[32px] bg-[#3b473e] rounded-2xl" />
    </h5>
  );
}

export default ShoppingList;