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
  const { products, addToCart, cart, removeLocalStorage } = useContext(ProductContext);

  return (
    <div className="bg-[#303f47]  flex flex-col felx-nowrap justify-around items-center w-[100%] h-full px-2">
      <aside className="w-[100%] p-1">
        <h2 className="text-xl font-semibold  text-center mb-4">Produtos</h2>
        <p className="text-sm ">
          Clique nos produtos para adicioná-los ao carrinho.
        </p>
        <p > Total de produtos {products.length}</p> <button onClick={removeLocalStorage('products')}>Atualizar dados</button>
      </aside>

      <section style={{display: "flex", flexWrap: "wrap"}}
      className="h-[85dvh] justify-between p-1 rounded-md shadow-md overflow-x-auto gap-2">
        {products.map((product) => {
          const isSelected = cart.some((item) => item.id === product.id);
        
          return (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className={`flex-shrink-0 flex flex-col items-center justify-center gap-1 p-2 rounded shadow-md transition-colors lg:w-23 w-28  h-29 ${
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

