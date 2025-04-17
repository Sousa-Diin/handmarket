import { Icon } from "@iconify/react/dist/iconify.js";

const Hander = ({title, children}) => {
  return (
    <div className="fixed w-full h-[10dvh]  p-2 shadow-md bg-[#303f47] flex items-center justify-between">
      <span>{title}</span>
      {children}
    </div>
  );
}

export default Hander;