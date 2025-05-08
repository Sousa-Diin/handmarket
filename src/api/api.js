import { Toggle } from "./bdSheets";

const URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2e17cTffuAOwKJb54C34wougjMWAENk00icF7HLNSpanUYPXz8bj0gcYhv-P-vI-CUX7nTe-CF2_8/pub?gid=${Toggle.Produtos}&single=true&output=csv`;

export default URL;


function doGet(e) {
  const cod = e.parameter.cod;
  Logger.log('Cod.: ' + cod);

  const spreadsheetId = getDatabaseId();
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName('Products');

  const data = sheet.getDataRange().getValues();
  const saida = [];

  for (let i = 1; i < data.length; i++) {
    saida.push({
      id: data[i][0],
      cod: data[i][1],
      description: data[i][2],
      descriptionNfce: data[i][3],
      sector: data[i][4],
      count: data[i][5],
      un: data[i][6],
      price: data[i][7],
      createdAt: data[i][8],
    });
  }

  if (cod) {
    const result = saida.find(item => item.cod == cod);

    if (!result) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 404,
          message: 'Código não encontrado.'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 200,
        message: 'Produto encontrado com sucesso.',
        result
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  }
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 200,
      message: 'Produto encontrado com sucesso.',
      saida
    }))
    .setMimeType(ContentService.MimeType.JSON);

}


/**
 * Função que recebe o obj body na req e adiciona na planilha 'Products'
 * @param {Object} e - Evento do tipo POST (contém e.parameter)
 * @returns {ContentService.TextOutput}
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  const data = e.parameter;

  try {
    lock.waitLock(10000); // Aguarda até 10s para obter o lock

    // Validação básica
    const requiredFields = ['cod', 'description', 'descriptionNfce', 'sector', 'count', 'un', 'price'];
    const missing = requiredFields.filter(key => !data[key]);

    if (missing.length > 0) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 400,
          message: `Campos obrigatórios faltando: ${missing.join(', ')}`
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = createSheetIfNotExists('Products');
    const lastRow = sheet.getLastRow();
    const newId = generateUUID();

    // Verifica e converte a data
    let createdDate = new Date();
    if (data.createdAt) {
      const parsed = new Date(data.createdAt);
      if (!isNaN(parsed.getTime())) {
        createdDate = parsed;
      }
    }

    // Append na planilha
    sheet.appendRow([
      newId,
      data.cod,
      data.description,
      data.descriptionNfce,
      data.sector,
      data.count,
      data.un,
      data.price,
      createdDate
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 200,
        message: "Produto adicionado com sucesso.",
        data: { id: newId, ...data }
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 500,
        message: "Erro interno: " + err.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}