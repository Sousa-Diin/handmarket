import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocalStorage } from "../utils/localStorage";
import { useBuyList } from "../hooks/useBuyList";

const Product = ({products, img, selectedSector}) => {

  const { selectedList, setSelectedList, addToCart } = useBuyList();
  // Filtra os produtos com base no setor selecionado
  const list = products.filter((item) => item.sector === selectedSector);
  const buyList = selectedList?.buyList ?? [];

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
            const icone = img[product.sector] || "mdi:cart";
            return (
              <button
                key={product.id}
                onClick={() => handleAddProduct(product)}
                className={` flex-shrink-0 flex flex-col items-center justify-between  gap-1 p-2 rounded  shadow-md transition-colors w-[31%] h-30 ${
                  isSelected
                    ? "bg-red-400 text-white "
                    : "bg-[#72b8ad] text-white hover:bg-[#E59E07]"
                }`}
              
              >
                <Icon icon={icone} width="32" height="32" />
                <span className="text-sm font-medium text-center">
                  {product.description}
                </span>
                <span className="text-sm text-center">R$ {product.price}</span>
              </button>
            );
          })}
      </section>
    </>
  );

}

export default Product;