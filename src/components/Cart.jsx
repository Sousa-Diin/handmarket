import React from "react";
import { useBuyList } from "../hooks/useBuyList";

const Cart = () => {
  const { selectedList, addToCart, decrementCart } = useBuyList();
  const buyList = selectedList?.buyList ?? [];

  const handleAddProduct = (product) => {
    addToCart(product);
  };

  const handleDecrementProduct = (product) => {
    decrementCart(product);
  };

  return (
    <div style={{ marginTop: "5rem" }} className="flex flex-col w-full h-[45dvh] p-2 text-[#c8e9e5]">
      <div className="w-[100%] h-[100dvh] flex flex-wrap gap-1 justify-center items-center overflow-y-auto">
        {buyList.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          buyList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-1 rounded shadow justify-between w-[30%] h-40 p-2 lg:h-35 bg-[#63BDB5] text-white hover:bg-[#E59E07]"
            >
              <h7>{item.descricao}</h7>
              <p>R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</p>
              <div className="flex flex-row border-2 h-6 p-2 rounded-md justify-around items-center gap-1">
                <button onClick={() => handleDecrementProduct(item)}>-</button>
                <span>{item.quantidade}</span>
                <button onClick={() => handleAddProduct(item)}>+</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;



