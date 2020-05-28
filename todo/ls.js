// Local storage helpers
/*
read a value from local storage and parse it as JSON 
@param {string} key The key under which the value is stored under in LS
@return {array} The value as an array of objects */
function readFromLS(key) { 
    const data = localStorage.getItem(key);
    return JSON.parse(data) || [];
}
/*
 write an array of objects to local storage under the provided key
 @param {string} key The key under which the value is stored under in LS
 @param {array} data The information to be stored as an array of objects. Must be serialized.
*/
function writeToLS(key, data) { 
    const dataSerialized = JSON.stringify(data);
    localStorage.setItem(key, dataSerialized);
}

export {writeToLS, readFromLS}