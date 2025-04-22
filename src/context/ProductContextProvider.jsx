import React, { createContext, useState, useEffect, useContext } from "react";
import { ListProducts } from "../../backend/ListProducts";

export const ProductContext = createContext();

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error);
  }
};

const getLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Erro ao recuperar do localStorage:", error);
    return null;
  }
};

const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Erro ao remover do localStorage:", error);
  }
}

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Estado do carrinho
  const [list, setList] = useState([]); // Estado da lista de compras

  const [setor, setSetor] = React.useState([
    {
      setor: "GraosCereais",
      describe: "Grãos e Cereais",
    },
    {
      setor: "Acougue",
      describe: "Açougue",
    },
    {
      setor: "Frios",
      describe: "Frios",
    },
    {
      setor: "Higiene",
      describe: "Higiene",
    },
    {
      setor: "Limpeza",
      describe: "Produtos de Limpeza",
    },
    {
      setor: "Laticinios",
      describe: "Laticínios",
    },
    {
      setor: "Hortifruti",
      describe: "Frutas e Verduras",
    },
    {
      setor: "Padaria",
      describe: "Padaria",
    },
  ]);

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

  const generateUUID = () => {
    return typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : '_' + Math.random().toString(36).substr(2, 9);
  };
  

  useEffect(() => {
    const loadData = async () => {
      const stored = getLocalStorage("products");
  
      if (stored && stored.length > 0) {
        setProducts(stored);
      } else {
        const apiData = await ListProducts();
        setProducts(apiData);
        setLocalStorage("products", apiData);
      }
    };
  
    const selectedList = getLocalStorage("buiesList");
    if (selectedList && selectedList) {
      setCart(selectedList);
    }
  
    // 🔽 Aqui carregamos as listas de compras salvas
    const savedLists = getLocalStorage("buiesList") || [];
    setList(savedLists);
  
    loadData();
  }, []);
  

  const addList = (nameList) => {
    const newList = {
      listID: generateUUID(),
      listName: nameList,
      buyList: [],
    };
  
    setList((prevList) => {
      const updatedLists = [...prevList, newList];
      setLocalStorage("buiesList", updatedLists); // Agora usamos a lista atualizada
      return updatedLists;
    });
  };
  

  const addToCart = (product) => {
    const selectedList = getLocalStorage("selectedList");
  
    if (!selectedList || !selectedList.listID) {
      console.warn("Nenhuma lista selecionada.");
      return;
    }
  
    const allLists = getLocalStorage("buiesList") || [];
    const updatedLists = allLists.map((list) => {
      if (list.listID === selectedList.listID) {
        const existingProductIndex = list.buyList.findIndex(
          (item) => item.id === product.id
        );
  
        if (existingProductIndex !== -1) {
          // Produto já existe, incrementa a quantidade
          list.buyList[existingProductIndex].quantidade += 1;
        } else {
          // Produto novo, adiciona com quantidade 1
          list.buyList.push({ ...product, quantidade: 1 });
        }
  
        // Atualiza o selectedList também
        setLocalStorage("selectedList", list);
      }
      return list;
    });
  
    setLocalStorage("buiesList", updatedLists);
    setCart(updatedLists); // (se desejar atualizar o estado do carrinho)
  };

  const removeList = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  }

  const sumCartValues = (buyList) => {
    return buyList.reduce((total, item) => {
      const price = parseFloat(item.preco) || 0;
      const quantidade = parseInt(item.quantidade) || 0;
      return total + price * quantidade;
    }, 0);
  };
  

  const decrementCart = (product) => {
    const selectedList = getLocalStorage("selectedList");
  
    if (!selectedList || !selectedList.listID) {
      console.warn("Nenhuma lista selecionada.");
      return;
    }
  
    const allLists = getLocalStorage("buiesList") || [];
    const updatedLists = allLists.map((list) => {
      if (list.listID === selectedList.listID) {
        const existingProductIndex = list.buyList.findIndex(
          (item) => item.id === product.id
        );
  
        if (existingProductIndex !== -1) {
          if (list.buyList[existingProductIndex].quantidade > 1) {
            list.buyList[existingProductIndex].quantidade -= 1;
          } else {
            list.buyList.splice(existingProductIndex, 1); // Remove se for 1
          }
        }
  
        setLocalStorage("selectedList", list);
      }
      return list;
    });
  
    setLocalStorage("buiesList", updatedLists);
    setCart(updatedLists); // (se você estiver exibindo o carrinho diretamente, mantenha atualizado)
  };
  

  return (
    <ProductContext.Provider
      value={{ products, setProducts, 
               cart, setCart, addToCart, decrementCart, 
               removeLocalStorage, setLocalStorage, getLocalStorage,
               list, addList, sumCartValues, removeList ,
              setor, listImgProduct
            }}
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
