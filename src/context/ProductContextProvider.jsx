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

  // Carregar dados ao iniciar
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

    loadData();
  }, []);

  // Adicionar produto ao carrinho e incrementar se já existir
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Se já existe, incrementa a quantidade
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      } else {
        // Se não existe, adiciona com quantidade 1
        return [...prevCart, { ...product, quantidade: 1 }];
      }
    });
  };

  const decrementCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct && existingProduct.quantidade > 1) {
        // Se já existe e quantidade maior que 1, decrementa
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item,
        );
      } else {
        // Se não existe ou quantidade é 1, remove do carrinho
        return prevCart.filter((item) => item.id !== product.id);
      }
    });
  };

  return (
    <ProductContext.Provider
      value={{ products, setProducts, cart, setCart, addToCart, decrementCart, removeLocalStorage }}
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
