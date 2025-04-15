import { Icon } from '@iconify/react';
const ButtonAndTitle = ({ title, addList }) => {

  const handleClick = () => {
    addList('');
  }
 
  return (
    <button
      className="w-full h-[15dvh] p-2 shadow rounded bg-[#6a8893] gap-3 flex flex-row items-center justify-center"
      onClick={handleClick}
    >
      <Icon icon="mdi:add" width={"40px"} className='rounded-2xl bg-[#303f47]' />
      <span>{title}</span>
    </button>
  );
}

export default ButtonAndTitle;