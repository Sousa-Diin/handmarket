import Papa from "papaparse";
import URL from "../src/api/googleScriptClient";

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
