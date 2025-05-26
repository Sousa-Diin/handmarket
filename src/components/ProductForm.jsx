import React, { useState } from "react";
import { useProduct } from "../context/ProductContextProvider";
import Notie from "../service/notieService";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";

const ProductForm = () => {
  const { setProducts, setor } = useProduct();
  const [product, setProduct] = useState({ description: "", price: "",sector: "" });
  const oldProducts = getLocalStorage("products") || []; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.description || !product.price || !product.sector) { 
      Notie.error("Preencha todos os campos");
      return;
    }

    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: prevProducts.length + 1,
        description: product.description,
        price: parseFloat(product.price), 
        sector: product.sector,
      },
    ]);

    setLocalStorage("products", [
      ...oldProducts,
      {
        id: oldProducts.length + 1,
        description: product.description,
        price: parseFloat(product.price),
        sector: product.sector,
      },
    ]);
    Notie.success("Produto adicionado com sucesso");
    setProduct({ description: "", price: "", sector: "" }); // Reset the form fields
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full h-[100%] bg-[#c8e9e5]  text-[#303f47] p-4  rounded-lg">
        <input
          type="text"
          placeholder="Nome do Produto"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: (e.target.value).toUpperCase() })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Preço"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className=" border p-2 rounded w-full mb-2"
        />
        <select
          value={product.sector}
          onChange={(e) => setProduct({ ...product, sector: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Selecione o Setor</option>
          {setor.map((item) => (
            <option key={item.sector} value={item.sector}>
              {item.description}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-teal-500  text-white px-2 py-2 rounded h-[10%] w-full"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
    
  );
};

export default ProductForm;
