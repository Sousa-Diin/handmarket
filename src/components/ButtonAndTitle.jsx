import { Icon } from '@iconify/react';
import Notie from '../service/notieService';
const ButtonAndTitle = ({ title, addList }) => {

  const handleClick = () => {
    Notie.input('Digite o nome da nova lista:', (input) => {
      if (input) {
        addList(input);
        Notie.success(`Lista "${input}" criada com sucesso!`);
      } else {
        Notie.error('Nome da lista não pode ser vazio!');
      }
    });
  }
 
  return (
    <button
      className="w-full h-[10dvh] p-2 shadow rounded bg-[#6a8893] gap-3 flex flex-row items-center justify-center"
      onClick={handleClick}
    >
      <Icon icon="mdi:add" width={"40px"} className='rounded-2xl bg-[#303f47]' />
      <span>{title}</span>
    </button>
  );
}

export default ButtonAndTitle;