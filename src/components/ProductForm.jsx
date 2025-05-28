import React, { useState } from "react";
import { useProduct } from "../context/ProductContextProvider";
import Notie from "../service/notieService";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
import { createProduct } from "../service/ProductsService.js"; // Adjust the import path as necessary

const ProductForm = () => {
  const { setProducts, setor } = useProduct();
  const [product, setProduct] = useState({cod:"", description: "",descriptionnfce:"",
    sector: "", count: 1, un: "", price: "" });
  const oldProducts = getLocalStorage("products") || []; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !product.description || !product.sector || !product.un || !product.price) { 
      Notie.error("Preencha todos os campos");
      return;
    }

    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: prevProducts.length + 1,
        cod: (111+prevProducts.length), // Generate a unique code
        description: product.description,
        descriptionNfce: product.description,
        sector: product.sector,
        count: 1,
        un: product.un,
        price: parseFloat(product.price) 
      },
    ]);

    /* setLocalStorage("products", [
      ...oldProducts,
      {
        id: oldProducts.length + 1,
        cod: product.cod,
        description: product.description,
        descriptionnfce: product.description,
        sector: product.sector,
        count: product.count,
        un: product.un,
        price: parseFloat(product.price) 
      },
    ]); */

    const generatedCod = "111" + oldProducts.length.toString();// exemplo simples
    const fullProduct = {
      cod: generatedCod,
      description: product.description,
      descriptionNfce: product.description, // repete por simplicidade
      sector: product.sector,
      count: 1,
      un: product.un,
      price: parseFloat(product.price)
    };

    createProduct(fullProduct);

    Notie.success("Produto adicionado com sucesso");
    setProduct({description: "", sector: "",  un: "", price: "" }); // Reset the form fields
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
        <select 
          value={product.un}
          onChange={(e) => setProduct({ ...product, un: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Selecione a Unidade</option>
          <option value="UN">UN</option>
          <option value="KG">KG</option>
        </select>

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
              {item.describe}
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
