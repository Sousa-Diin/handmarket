class BaseRepository {
  constructor(sheetTableName, tableHeaderArray){
    this.sheetTableName = sheetTableName;
    this.sheetTable = this.__createSheetIfNotExists(sheetTableName,tableHeaderArray);
    this.createdDate = new Date();//.toString();
    this.headers = this.getHeader();
  }

  __createSheetIfNotExists(sheetTableName,tableHeaderArray){
    const sheetTableId = getDatabaseId(); //recupera o id do DataBase(SpreadSheet)
    const dataBaseSpreadSheet  = SpreadsheetApp.openById(sheetTableId); // Abre o DataBase apatir do id

    let sheetTable = dataBaseSpreadSheet.getSheetByName(sheetTableName); //Recupera a tabele(sheet) a partir do nome

    if (!sheetTable){
      sheetTable = dataBaseSpreadSheet.insertSheet(sheetTableName); // Cria a tabela(sheet)
      Logger.log('success, ' + sheetTable + 'created.');
      sheetTable.appendRow(tableHeaderArray); // Cria o cabeçalho da tabela
    }
    
    Logger.log('Exists, ' + sheetTable);
    return sheetTable;
  }

  getSheetTableId(){
    return this.sheetTable.getSheetId(); 
  }

  getSheetTableName(){
    return this.sheetTable.getSheetName();
  }

  getSheetTableCreatedAt(){
    return this.createdDate;
  }

  getHeader(){
    const lastCol = this.sheetTable.getLastColumn();

    if(lastCol === 0){
      Logger.log('Error: a planilha não contém coluna.');
      return [];
    }

    const allHeaders = this.sheetTable.getRange(1,1,1, this.sheetTable.getLastColumn()).getValues()[0];

    if(allHeaders.every(cell => !cell || cell.toString().trim() === '')){
      Logger.log('Error: cabeçalho vazio ou não definido' + JSON.stringify(allHeaders))
    }

    return allHeaders;
  }
  
  // Retorna uma linha com os valores do data ordenados conforme os nomes dos cabeçalhos.
  formatObjToRow(data){
    const headers = this.getHeader();
    
    // Garante que estamos pegando corretamente mesmo se as chaves estiverem com letras diferentes
    const newObjRow = headers.map(columnsName => {
      const key = Object.keys(data).find(k => k.toLowerCase() === columnsName.toLowerCase());
      return key ? data[key] : '';
    });

    return newObjRow;
  }

  create(data){
    const reqData = this.formatObjToRow(data);
    this.sheetTable.appendRow(reqData);
    
    Logger.log('[CREATE_ROW] ' + `[${this.sheetTableName}]: `+ JSON.stringify(reqData));
  }
}
