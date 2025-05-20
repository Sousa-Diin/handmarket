import React, { createContext, useState, useEffect, useContext } from "react";
import { ListProducts } from "../../backend/ListProducts";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
import { dark, light } from "../utils/colors.js";

export const ProductContext = createContext();


export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pageColor, setPageColor] = useState(dark);
  const [setor, setSetor] = useState([
    {setor: "GraosCereais", describe: "Grãos e Cereais"},
    {setor: "Acougue", describe: "Açougue"},
    {setor: "Frios", describe: "Frios"},
    {setor: "Higiene", describe: "Higiene"},
    {setor: "Limpeza", describe: "Produtos de Limpeza"},
    {setor: "Laticinios", describe: "Laticínios"},
    {setor: "Hortifruti", describe: "Frutas e Verduras"},
    {setor: "Padaria", describe: "Padaria"},
    {setor: "Adega", describe: "Adega"},
    {setor: "Bebidas", describe: "Bebidas"},
    {setor: "Enlatados", describe: "Enlatados"},
    {setor: "Fitness", describe: "Fitness"},
    {setor: "Outros", describe: "Outros"},
    {setor: "Bazar", describe: "Bazar"},
    {setor: "Pets", describe: "Pets"},
    {setor: "Bebes", describe: "Bebês"},
    {setor: "Doces", describe: "Doces e Chocolates"},
    {setor: "Perfumaria", describe: "Perfumaria"},
    {setor: "Utilidades", describe: "Utilidades"},
    {setor: "Biscoitos", describe: "Biscoitos e Bolachas"}
  ]);

  const handleChangeColor = () => {
    setPageColor(prevColor => (prevColor === dark ? light : dark));
  }

  const listImgProduct = {
    GraosCereais: "mdi:sack" ,
    Acougue: "mdi:food-steak" ,
    Frios: "mdi:fridge-outline",
    Higiene: "mdi:shower",
    Limpeza: "mdi:bucket",
    Laticinios: "mdi:cheese",
    Hortifruti:"mdi:food-apple" ,
    Padaria: "mdi:bread-slice" ,
  };

  
  

  useEffect(() => {
    const loadData = async () => {
      const apiData = await ListProducts();
      setProducts(apiData);
      setLocalStorage("products", apiData);
    
    };
  
    loadData();
  }, []);
  

  return (
    <ProductContext.Provider
      value={{ products, setProducts, setor, setSetor, listImgProduct, pageColor,handleChangeColor }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthContextProvider");
  }
  return context;
};
