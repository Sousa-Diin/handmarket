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


// atualiza o produto
function handleUpdate(e) {
  const sheetID = getDatabaseId();
  const sheet = SpreadsheetApp.openById(sheetID).getSheetByName('Products');
  const data = sheet.getDataRange().getValues();

  try {
    const headers = data[0].map(h => h.toString().toLowerCase());
    const id = e.parameter.id;

    if (!id) {
      return response({
        status: 400,
        message: 'Parâmetro "id" é obrigatório.'
      });
    }

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[headers.indexOf('id')].toString() === id.toString()) {
        // Atualiza todos os parâmetros que existem na planilha
        const updates = {};
        for (const key in e.parameter) {
          if (key !== 'id' && headers.includes(key.toLowerCase())) {
            const colIndex = headers.indexOf(key.toLowerCase()) + 1; // +1 porque getRange é 1-based
            sheet.getRange(i + 1, colIndex).setValue(e.parameter[key]);
            updates[key] = e.parameter[key];
          }
        }

        return response({
          status: 200,
          message: 'Item atualizado com sucesso.',
          id,
          updated: updates
        });
      }
    }

    return response({
      status: 404,
      message: 'ID não encontrado.',
      id
    });

  } catch (error) {
    return response({
      status: 500,
      message: 'Erro interno: ' + error.message
    });
  }
}


