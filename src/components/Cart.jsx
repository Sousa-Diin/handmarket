import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContextProvider";

const Cart = () => {
  const { cart, addToCart, decrementCart } = useContext(ProductContext);

  return (
    <div className="w-full bg-[#303f47] p-2 text-[#c8e9e5]">
      <h2>Lista de Compras</h2>
      <div className="w-[100%] h-[85dvh] mb-5 flex flex-wrap gap-1 justify-center items-center overflow-y-auto">
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div
              className=" flex flex-col items-center gap-1 rounded shadow justify-between  w-[40%] h-40 p-2  lg:h-35 bg-[#63BDB5] text-white hover:bg-[#E59E07]"
              key={item.id}
              
            >
              <h6>{item.descricao}</h6>
              <p>R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</p>
              <div className="flex flex-row border-2 h-6 p-2 rounded-md justify-around items-center gap-1">
                <button onClick={() => decrementCart(item)}>-</button>                
                <span>{item.quantidade}</span>
                <button onClick={() => addToCart(item)}>+</button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
