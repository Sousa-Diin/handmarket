import { Icon } from '@iconify/react';
const ButtonAndTitle = ({ title, onClick }) => {

  const handleChange = () => {
    onClick('list');
  }
  return (
    <button
      className="w-[96%] h-[10dvh] p-2 shadow rounded bg-[#6a8893] gap-3 flex items-center justify-center"
      onClick={handleChange}
    >
      <Icon icon="mdi:add" width={"30px"} className='rounded-2xl bg-[#303f47]' />
      <span>{title}</span>
    </button>
  );
}

export default ButtonAndTitle;