import { Icon } from '@iconify/react';
import Notie from '../service/notieService';
import { useProduct } from '../context/ProductContextProvider';

const ButtonAndTitle = ({ title, addList, list }) => {
  const { pageColor } = useProduct();
  const handleClick = () => {
    Notie.input('Digite o nome da nova lista:', (input) => {
      const trimmedInput = input?.trim();

      if (!trimmedInput) {
        Notie.error("Nome da lista não pode ser vazio!");
        return;
      }

      const listExists = list.some((item) => item.listName.toLowerCase() === trimmedInput.toLowerCase());
      if (listExists) {
        Notie.error("Já existe uma lista com esse nome!");
        return;
      }

      addList(trimmedInput);
      Notie.success(`Lista "${trimmedInput}" criada com sucesso!`);
    });
  };

  return (
    <button
    style={{backgroundColor: pageColor.accent }}
      className="w-full h-[10dvh] p-2 rounded gap-3 flex flex-row items-center justify-center"
      onClick={handleClick}
    >
      <Icon icon="mdi:add" width={"40px"} style={{backgroundColor: pageColor.secondary}} className='rounded-2xl ' />
      <span className='text-[1.5rem]'>{title}</span>
    </button>
  );
};

export default ButtonAndTitle;
