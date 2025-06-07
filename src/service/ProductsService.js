import { googleScriptClient } from "../api/googleScriptClient";

export const getAllProducts = () => googleScriptClient('products', 'GET');

export const getProductByCod = (cod) => googleScriptClient('products', 'GET', { cod });

export const createProduct = (dados) => googleScriptClient('products', 'POST', {
  method: 'CREATE',
  ...dados
});


export const updateProduct = (dados) => googleScriptClient('products', 'POST', {
  method: 'UPDATE',
  ...dados
});

export const deleteProduct = (cod) => googleScriptClient('products', 'POST', {
  method: 'DELETE',
  cod
});