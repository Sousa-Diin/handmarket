import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContextProvider";

const Cart = () => {
  const { cart, addToCart } = useContext(ProductContext);

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <div className="flex">
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div
              className=""
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
              }}
            >
              <h3>{item.descricao}</h3>
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
