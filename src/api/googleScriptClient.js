import { DEPLOYMENTCODE, Toggle } from "./bdSheets";

const URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2e17cTffuAOwKJb54C34wougjMWAENk00icF7HLNSpanUYPXz8bj0gcYhv-P-vI-CUX7nTe-CF2_8/pub?gid=${Toggle.Produtos}&single=true&output=csv`;

export default URL;


const BASE_URL = `https://script.google.com/macros/s/${DEPLOYMENTCODE}/exec`;

/**
 * Envia uma requisição para a API do Google Apps Script
 * @param {string} rota - Ex: 'products', 'orders'
 * @param {string} metodo - 'GET' | 'POST'
 * @param {object} dados - Parâmetros a serem enviados
 * @returns {Promise<object>} - Resposta da API
 */
export const googleScriptClient = async (rota, metodo = 'GET', dados = {}) => {
  try {
    const methodUpper = metodo.toUpperCase();

    if (methodUpper === 'GET') {
      const params = new URLSearchParams({ route: rota, ...dados });
      const url = `${BASE_URL}?${params.toString()}`;

      const response = await fetch(url, { method: 'GET' });
      const result = await response.json();
      console.log(`[${rota.toUpperCase()} - GET] Resposta:`, result);
      return result;
    }

    // POST (CREATE, UPDATE, DELETE)
    const bodyParams = new URLSearchParams({ route: rota, ...dados });

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(Object.entries(bodyParams.toString()))
    });

    const result = await response.json();
    console.log(`[${rota.toUpperCase()} - POST] Resposta:`, result);
    return result;

  } catch (error) {
    console.error(`Erro na chamada [${rota.toUpperCase()} - ${metodo}]:`, error);
    return { success: false, error };
  }
};

// Método para enviar dados para a planilha

/* //Method: POST
export const enviarParaPlanilha = async (evento) => {
  try {
   
    fetch(` https://script.google.com/macros/s/${SPREADSHEET_ID}/dev`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(Object.entries(evento))
    })
    .then(res => res.json())
    .then(data => console.log("Resposta:", data))
    .catch(err => console.error("Erro:", err));
    
    
    
  } catch (error) {
    console.error("Erro de conexão com a API:", error);
  }
}; */