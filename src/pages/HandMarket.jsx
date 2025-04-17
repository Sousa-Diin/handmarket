import React, { useContext } from "react";
import Hander from "../components/Hader";
import ButtonAndTitle from "../components/ButtonAndTitle";
import ShoppingList from "../components/ShoppingList";
import { ProductContext } from "../context/ProductContextProvider";
import ListRecommendations from "../components/ListRecommendations";
import Container  from "../components/Container";

const HandMarket = ({onClick}) => {
  const { list, addList } = useContext(ProductContext);
  
  return (
    <div className="flex flex-col items-center w-full h-full bg-[#303f47] gap-1 text-[#c8e9e5]">
      <Hander title="Minhas listas" children={null} />
     
      <div className="mt-5 w-[100%] h-full  p-3 shadow-md flex flex-col items-center justify-between gap-2 ">
        
        {list.map((item => (
          <ShoppingList  item={item}  onClick={onClick}/>
        )))}

        <ButtonAndTitle title={'Criar lista'} addList={addList}/>
        
        <Container>
          <p className="text-[.9rem] top-[2rem]">Recomendações de lista</p>
          <ListRecommendations recommendations={[{title: "Lista 1"}, {title: "Lista 2"}, {title: "Lista 3"}, {title: "Lista 4"}]} />
        </Container>
      </div>
    </div>
  );
};

export default HandMarket;
