import React from "react";
import Hander from "../components/Hader";
import ButtonAndTitle from "../components/ButtonAndTitle";
import ShoppingList from "../components/ShoppingList";
import { useProduct } from "../context/ProductContextProvider";
import ListRecommendations from "../components/ListRecommendations";
import Container  from "../components/Container";

const HandMarket = ({onClick}) => {
  const { list, addList, getLocalStorage } = useProduct();
  const allBuiesList = getLocalStorage("buiesList") ?? [];
  
  return (
    <div className="flex flex-col items-center justify-between w-full h-full min-h-[100dvh] bg-[#303f47] gap-3 text-[#c8e9e5]">
      <Hander title="Minhas Listas de Compras" children={null} />
     
      <div style={{marginTop: "5rem"}} className=" md:my-5 w-[100%] h-full min-h-[90dvh] p-2 shadow-md flex flex-col items-center justify-between gap-2 ">
        {allBuiesList.length === 0 ? (
          <p className="text-[1.5rem] top-[2rem]">Nenhuma lista criada.</p>
        ) : (
          null
        )}
        <>
          {allBuiesList.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            allBuiesList.map((item => (
              <ShoppingList  item={item}  onClick={onClick}/>
            )))
          )}
        </>

        <ButtonAndTitle title="Criar nova lista" addList={addList} list={list} />

        
        <Container>
          <p className="text-[1.5rem] top-[2rem]">Recomendações de lista</p>
          <ListRecommendations recommendations={[{title: "Lista 1"}, {title: "Lista 2"}, {title: "Lista 3"}, {title: "Lista 4"}]} />
        </Container>
      </div>
    </div>
  );
};

export default HandMarket;
