/* import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContextProvider";

const ProductList = () => {
  const { products, addToCart } = useContext(ProductContext);

  return (
    <div className="flex flex-col justify-between items-center   w-[98%] h-[100dvh]">
      <h2>Lista de Produtos</h2>
      <section className="flex flex-3/6 bg-amber-500  p-2 justify-between w-[100%] h-[100%]">
        {products.map((product) => (
          <div
            className="flex flex-col shadow p-2 rounded-sm justify-between w-[320px] h-[150px] gap-1"
            key={product.id}
          >
            <h3> Descrição: {product.descricao}</h3>
            <p>Preço:{product.preco}</p>
            <button
              className="border rounded-md bg-[#63BDB5] text-white hover:bg-[#E59E07]"
              onClick={() => addToCart(product)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductList; */

import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContextProvider";

const ProductList = () => {
  const { products, addToCart, cart } = useContext(ProductContext);

  return (
    <div className="flex flex-col felx-nowrap justify-around items-center w-full h-full px-2">
      <aside>
        <h2 className="text-xl font-semibold text-[#15696F] mb-4">Market</h2>
        <p className="text-sm text-gray-700">
          Clique nos produtos para adicioná-los ao carrinho.
        </p>
        <pre> Total de produtos {products.length}</pre>
      </aside>

      <section style={{display: "flex", flexWrap: "wrap"}}
      className="market-shop bg-amber-300 w-[100%] h-[85dvh] justify-between p-2 rounded-md shadow-md overflow-x-auto gap-2">
        {products.map((product) => {
          const isSelected = cart.some((item) => item.id === product.id);
        
          return (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className={`flex-shrink-0 flex flex-col items-center justify-center gap-1 p-2 rounded shadow-md transition-colors lg:w-23 w-26  h-28 ${
                isSelected
                  ? "bg-red-400 text-white"
                  : "bg-[#63BDB5] text-white hover:bg-[#E59E07]"
              }`}
            >
              <span className="text-2xl">🌸</span>
              <span className="text-sm font-medium text-center">
                {product.descricao}
              </span>
              <span className="text-sm text-center">{product.preco}</span>
            </button>
          );
        })}
      </section>

    </div>
  );
};

export default ProductList;

