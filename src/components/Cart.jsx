import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContextProvider";

const Cart = () => {
  const { cart, addToCart } = useContext(ProductContext);

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div
              className=" flex flex-col items-center gap-1 p-2 rounded shadow transition-colors lg:w-23 w-[23%] p-3  h-32 bg-[#63BDB5] text-white hover:bg-[#E59E07]"
              key={item.id}
              
            >
              <h5>{item.descricao}</h5>
              <p>Preço: {item.preco}</p>
              <p>Quantidade: {item.quantidade}</p>
              <button onClick={() => addToCart(item)}>+</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
