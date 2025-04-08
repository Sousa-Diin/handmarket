import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContextProvider";

const ProductList = () => {
  const { products, addToCart } = useContext(ProductContext);

  return (
    <div className="flex flex-col justify-between w-full h-[60dvh]">
      <h2>Lista de Produtos</h2>
      <section className="flex flex-wrap p-1 gap-2 justify-between h-[90dvh] overflow-y-auto">
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

export default ProductList;
