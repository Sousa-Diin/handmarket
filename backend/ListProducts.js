import Papa from "papaparse";
import URL from "../src/api/api";

export const ListProducts = async () => {
  try {
    const response = await fetch(URL);
    const csv = await response.text();
    const json = Papa.parse(csv, { header: true, dynamicTyping: true });

    return json.data;
  } catch (err) {
    console.error("Erro ao buscar os dados da API: ", err);
    return [];
  }
};

//Method: POST
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
};