function handleCreate (e){

  const data = e.parameter;
 // Validação básica
  const requiredFields = ['cod', 'description', 'descriptionNfce', 'sector', 'count', 'un', 'price'];
  const missing = requiredFields.filter(key => !data[key]);

  if (missing.length > 0) {
    return response({
      status: 400,
      message: `Campos obrigatórios faltando: ${missing.join(', ')}`
    });
  }

  const sheet = createSheetIfNotExists('Products');
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

  return response({
    status: 200,
    message: "Produto adicionado com sucesso.",
    data: { id: newId, ...data }
  });
}



function handleDelete(e) {
  const sheetID = getDatabaseId();
  const deleteItemSheet = SpreadsheetApp.openById(sheetID);
  const sheet = deleteItemSheet.getSheetByName('Products');
  const data = sheet.getDataRange().getValues();
  
  try {
    const id = e.parameter.id;
    let found = false;
  
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toString() === id.toString()) {
        sheet.deleteRow(i + 1); // i+1 porque o índice do array começa em 0, mas planilha começa em 1
        found = true;
      
        return response({
          status: 200,
          message: 'Item deletado com sucesso.',
          id
        });
      }
    }
  
    if (!found) {
      return response({
        status: 404,
        message: 'ID não encontrado.',
        id
      });
    }
  
  } catch (error) {
    return response({
      status: 500,
      message: 'Erro interno: ' + error.message
    });
  }
}


