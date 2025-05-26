import Papa from 'papaparse';
import fetch from 'node-fetch';
import { DEPLOYMENTCODE } from '../../src/api/bdSheets.js';

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2e17cTffuAOwKJb54C34wougjMWAENk00icF7HLNSpanUYPXz8bj0gcYhv-P-vI-CUX7nTe-CF2_8/pub?gid=1645537131&single=true&output=csv';
const targetUrl = `https://script.google.com/macros/s/${DEPLOYMENTCODE}/exec?route=products&method=create`;

async function seedProducts() {
  try {
    const response = await fetch(csvUrl);
    const csv = await response.text();

    const { data: produtos } = Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });

    for (const produto of produtos) {
      try {
        // Remove o ID antes de enviar
        delete produto.id;

        const res = await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(Object.entries(produto))
        });

        const result = await res.json();
        console.log(`✅ Produto "${produto.description || produto.descricao || 'sem nome'}" enviado com sucesso.`, result);
      } catch (err) {
        console.error(`❌ Erro ao enviar produto:`, err.message);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao buscar ou processar o CSV:', error.message);
  }
}

seedProducts();
