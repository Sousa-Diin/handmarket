import React, { useState } from "react";
import { useProduct } from "../context/ProductContextProvider";

const ProductForm = () => {
  const { setProducts } = useProduct();
  const [product, setProduct] = useState({ descricao: "", preco: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.descricao || !product.preco) return;

    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: prevProducts.length + 1,
        descricao: product.descricao,
        preco: parseFloat(product.preco),
      },
    ]);

    setProduct({ descricao: "", preco: "" });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-[80%] h-[95%] bg-[#c8e9e5]  text-[#303f47] p-4  rounded-lg">
        <input
          type="text"
          placeholder="Nome do Produto"
          value={product.descricao}
          onChange={(e) => setProduct({ ...product, descricao: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Preço"
          value={product.preco}
          onChange={(e) => setProduct({ ...product, preco: e.target.value })}
          className=" border p-2 rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-teal-500  text-white px-2 py-2 rounded h-[30%] w-full"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
    
  );
};

export default ProductForm;
