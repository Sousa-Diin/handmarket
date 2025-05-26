import React, { createContext, useState, useEffect, useContext } from "react";
import { ListProducts } from "../../backend/ListProducts";
import { googleScriptClient } from "../api/googleScriptClient.js";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
import { dark, light } from "../utils/colors.js";

export const ProductContext = createContext();


export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pageColor, setPageColor] = useState(dark);
  const [setor, setSetor] = useState([
    {sector: "GraosCereais", describe: "Grãos e Cereais"},
    {sector: "Acougue", describe: "Açougue"},
    {sector: "Frios", describe: "Frios"},
    {sector: "Higiene", describe: "Higiene"},
    {sector: "Limpeza", describe: "Produtos de Limpeza"},
    {sector: "Laticinios", describe: "Laticínios"},
    {sector: "Hortifruti", describe: "Frutas e Verduras"},
    {sector: "Padaria", describe: "Padaria"},
    {sector: "Adega", describe: "Adega"},
    {sector: "Bebidas", describe: "Bebidas"},
    {sector: "Enlatados", describe: "Enlatados"},
    {sector: "Fitness", describe: "Fitness"},
    {sector: "Outros", describe: "Outros"},
    {sector: "Bazar", describe: "Bazar"},
    {sector: "Pets", describe: "Pets"},
    {sector: "Bebes", describe: "Bebês"},
    {sector: "Doces", describe: "Doces e Chocolates"},
    {sector: "Perfumaria", describe: "Perfumaria"},
    {sector: "Utilidades", describe: "Utilidades"},
    {sector: "Biscoitos", describe: "Biscoitos e Bolachas"}
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
      const apiData = await googleScriptClient("products", "GET"); //,{'cod': "417852369"}
      const {status, message, ...body} = apiData; //apiData.finderProductByCod
      setProducts(body.allProducts);
      setLocalStorage("products", body.allProducts);
      //console.log('Products.:', body.allProducts);
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
