import React, { useState } from "react";
import Hander from "../components/Hader";
import ButtonAndTitle from "../components/ButtonAndTitle";
import { Icon } from "@iconify/react/dist/iconify.js";

const HandMarket = ({onClick}) => {
  const [list, setList] = useState([]);
  
  

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#303f47] gap-1 text-[#c8e9e5]">
      <Hander title="Minhas listas" children={null} />
      <section className="w-[100dvw] h-full overflow-y-auto flex flex-col gap-2 ">
        <div className="w-[100%] h-full  p-2 shadow-md flex flex-col items-center justify-between gap-2 ">
          <h5 className="flex justify-between items-center h-[30dvh] w-full bg-[#72b8ad] rounded-md p-2">
            <p>Lista de compras 1</p>
            <Icon icon={"mdi:arrow-right"} width="32" height="32" />
          </h5>
        </div>
      </section>
      <ButtonAndTitle title={'Criar lista'} onClick={onClick}/>
    </div>
  );
};

export default HandMarket;
