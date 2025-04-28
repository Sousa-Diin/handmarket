import { useProduct } from "../context/ProductContextProvider";

const Hander = ({title, children}) => {
  const { pageColor } = useProduct();
  return (
    <div 
      style={{ backgroundColor: pageColor.tertiary, color: pageColor.light }}
      className='text-[1.3rem] fixed w-full h-[10dvh]  p-2 shadow-sm flex items-center justify-between'>
      <span style={{color: pageColor.light}}> {title}</span>
      {children}
    </div>
  );
}

export default Hander;