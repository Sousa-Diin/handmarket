import React from "react";
import { useProduct } from "../context/ProductContextProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocalStorage } from "../utils/localStorage";
import { useBuyList } from "../hooks/useBuyList";

const Product = ({products, img, selectedSector}) => {

  const { addToCart } = useBuyList();
  // Filtra os produtos com base no setor selecionado
  const list = products.filter((item) => item.setores === selectedSector);
  const currentCart = getLocalStorage("selectedList") ?? [];
  const { buyList } = currentCart;

  const handleAddProduct = (product) => {
    addToCart(product);
  };
  return(
    <>
     
      <section style={{display: "flex", flexWrap: "wrap"}}

              className="w-full h-auto justify-between mb-5 p-1 rounded-md shadow-md
               overflow-x-auto gap-2">
        {list.map((product) => {
            const isSelected = buyList.some((item) => item.id === product.id);
            const icone = img[product.setores] || "mdi:cart";
            return (
              <button
                key={product.id}
                onClick={() => handleAddProduct(product)}
                className={` flex-shrink-0 flex flex-col items-center justify-center gap-1 p-2 rounded  shadow-md transition-colors w-28  h-29 ${
                  isSelected
                    ? "bg-red-400 text-white "
                    : "bg-[#c8e9e5] text-white hover:bg-[#E59E07]"
                }`}
              
              >
                <Icon icon={icone} width="32" height="32" />
                <span className="text-sm font-medium text-center">
                  {product.descricao}
                </span>
                <span className="text-sm text-center">{product.preco}</span>
              </button>
            );
          })}
      </section>
    </>
  );

}

export default Product;