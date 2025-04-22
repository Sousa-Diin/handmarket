import {useState} from "react";
import { useProduct } from "../context/ProductContextProvider";
import Product from "./Product";
import SelectSetor from "./SelectSetor";
import Cart from "./Cart";
import Hander from "./Hader";

const ProductList = () => {
  const { products, cart, setor, listImgProduct, getLocalStorage} = useProduct();

  const [page, setPage] = useState(true); //seta a pagina atual do componente ProductList
  const [selectedSector, setSelectedSector] = useState("GraosCereais"); //captura o setor selecionado
  const currentCart = getLocalStorage("selectedList") ?? []; //captura o carrinho atual

  return (
    <>
      <Hander title={getLocalStorage('selectedList').listName || undefined} />
      <Cart cart={currentCart.buyList}/>
      <div style={{marginTop: "5rem"}} className="bg-[#303f47] flex flex-col felx-nowrap justify-around items-center w-[100%] h-full px-2">               
        {/* Renderiza a pagina-componente selecionada */}
        <SelectSetor setor={setor} selectedSector={selectedSector} setSelectedSector={setSelectedSector} page={page} setPage={setPage} />
        
      </div>
    </>
  );
};

export default ProductList;

