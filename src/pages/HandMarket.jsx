import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const HandMarket = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addProduct = (name, price) => {
    const newProduct = { id: products.length + 1, descricao, preco };
    setProducts([...products, newProduct]);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  

  return (
    <div className="p-4 bg-[#EEF2F0] min-h-screen">
      <h1 className="text-2xl font-bold text-[#15696F]">HandMarket</h1>
      <button
        onClick={() => addProduct("Arroz", 10.99)}
        className="bg-[#63BDB5] p-2 mt-2 rounded text-white"
      >
        Adicionar Produto
      </button>
      <div className="mt-4">
        <h2 className="text-lg text-[#858585]">Produtos Disponíveis:</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="flex justify-between p-2 border-b">
              {product.descricao} - R${product.preco.toFixed(2)}
              <button
                onClick={() => addToCart(product)}
                className="bg-[#15696F] text-white px-2 py-1 rounded"
              >
                Adicionar ao Carrinho
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 bg-[#282828] p-4 text-white rounded">
        <h2 className="text-lg flex items-center">
          <FaShoppingCart className="mr-2" /> Carrinho
        </h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.descricao} - R${item.preco.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HandMarket;
