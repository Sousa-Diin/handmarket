import React from "react";
import Hander from "../components/Hader";
import ButtonAndTitle from "../components/ButtonAndTitle";
import ShoppingList from "../components/ShoppingList";
import ListRecommendations from "../components/ListRecommendations";
import Container from "../components/Container";
import { useBuyList } from "../hooks/useBuyList";
import { getLocalStorage } from "../utils/localStorage";
import { useProduct } from "../context/ProductContextProvider";

const HandMarket = ({ onClick }) => {
  const { lists, addList } = useBuyList();
  const allBuiesList = getLocalStorage("buiesList") ?? [];
  const { pageColor, handleChangeColor } = useProduct();

  return (
    <div
      style={{
        backgroundColor: pageColor.secondary,
        color: pageColor.light,
      }}
      className="flex flex-col items-center justify-between w-full h-full min-h-[100dvh] gap-3"
    >
      <Hander
        title="Minhas Listas de Compras"
        children={<button onClick={handleChangeColor} style={{ color: pageColor.accent, fontSize: "1.2rem" }}>Editar</button>}
      />

      <div
        style={{
          marginTop: "5rem",
          backgroundColor: pageColor.secondary,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        className="md:my-5 w-[100%] h-full min-h-[90dvh] p-2 flex flex-col items-center justify-between gap-2"
      >
        {allBuiesList.length === 0 ? (
          <p className="text-[1.5rem] mt-8">Nenhuma lista criada.</p>
        ) : (
          allBuiesList.map((item, index) => (
            <ShoppingList key={index} item={item} onClick={onClick} />
          ))
        )}

        <ButtonAndTitle title="Criar nova lista" addList={addList} list={lists} />

        <Container>
          <p className="text-[1.5rem]">Recomendações de lista</p>
          <ListRecommendations
            recommendations={[
              { title: "Compra do mês" },
              { title: "Churrasco" },
              { title: "Lasanha" },
              { title: "Guloseimas" },
            ]}
          />
        </Container>
      </div>
      <footer className="flex-row w-full h-12 bg-gray-800 text-white flex items-center justify-center">
        <p className="text-[1rem] text-justify text-xs"> &copy; 2023 HandMarket. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HandMarket;

