/**
 * HANDMARKET - PROPERTIES SERVICE CONTROLLER
 */

// Nome padrão da chave de banco
const DATABASE_KEY = 'DATABASE_ID';

/**
 * Salva CHAVE e VALOR da planilha no PropertiesService
 * @param {string} KEY
 * @param {string} VALUE  
 */
const setPropertyData = (key, value) => {
  const properties = PropertiesService.getScriptProperties();
  properties.setProperty(key, value);
  Logger.log('Chave salva com sucesso: ' + key);
};

/**
 * Recupera CHAVE da planilha no PropertiesService
 * @param {string} KEY
 * @return {string} VALUE  
 */
const getPropertyData = (key) => {
  const pros = PropertiesService.getScriptProperties();
  const dbId = pros.getProperty(key);
  if (dbId) {
    Logger.log('DATABASE_ID encontrado: ' + dbId);
    return dbId;
  } else {
    Logger.log('DATABASE_ID não encontrado.');
    return null;
  }
};

/**
 * Deleta CHAVE da planilha no PropertiesService
 * @param {string} KEY  
 */
const deletePropertyData = (key) => {
  const props = PropertiesService.getScriptProperties();
  props.deleteProperty(key);
  Logger.log('chave [' + key + '] removida com sucesso.')
}

/**
 * Salva o ID da planilha principal no PropertiesService
 * @param {string} spreadsheetId 
 */

function saveDatabaseId(spreadsheetId) {
  setPropertyData(DATABASE_KEY, spreadsheetId);
  Logger.log('DATABASE_ID salvo com sucesso: ' + spreadsheetId);
}