import React, { useEffect } from "react";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
import { useBuyList } from "../hooks/useBuyList";

const Cart = () => {
  const { addToCart, decrementCart } = useBuyList();
  const currentCart = getLocalStorage("selectedList") ?? [];
  const { buyList } = currentCart;
  const handleAddProduct = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    const cart = getLocalStorage("selectedList") ?? [];
    if (cart) {
      const updatedCart = cart.buyList.map((item) => {
        return { ...item, quantidade: 1 };
      });
      setLocalStorage("selectedList", { ...cart, buyList: updatedCart });
    }
  }, currentCart);

  return (
    <div style={{marginTop: "5rem"}} className="flex flex-col w-full h-[45dvh] p-2 text-[#c8e9e5]">
      
      <div className="w-[100%] h-[100dvh] flex flex-wrap gap-1 justify-center items-center overflow-y-auto">
        {buyList.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          buyList.map((item) => (
            <div
              className=" flex flex-col items-center gap-1 rounded shadow justify-between  w-[30%] h-40 p-2  lg:h-35 bg-[#63BDB5] text-white hover:bg-[#E59E07]"
              key={item.id}
              
            >
              <h7 className="">{item.descricao}</h7>
              <p>R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</p>
              <div className="flex flex-row border-2 h-6 p-2 rounded-md justify-around items-center gap-1">
                <button onClick={() => decrementCart(item)}>-</button>                
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
