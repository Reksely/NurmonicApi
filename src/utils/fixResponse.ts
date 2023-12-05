export function fixResponse(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return jsonString; // JSON is valid, no need to fix
  } catch (error) {


    if(jsonString.startsWith('{')) {

      return JSON.parse(jsonString.substring(1))
    }

    
    try {
      let fixedJSON = jsonString
        .replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:/g, '"$2": ') // Wrap keys with double quotes
        .replace(/'/g, '"'); // Replace single quotes with double quotes

      fixedJSON = fixedJSON.replace(/"data":\s?{([^}]+)},?/g, '$1');

      fixedJSON = `{${fixedJSON}}`;
      console.log("thejson:")
console.log(fixedJSON)
      try {
      console.log(JSON.parse(fixedJSON));
      return JSON.parse(fixedJSON);
      }
      catch {
        const jsonFixed2 = fixedJSON.replace('{"data":', "")
        console.log(JSON.parse(jsonFixed2));
        return JSON.parse(jsonFixed2);
      }
    } catch (error) {
      console.error('Unable to fix the JSON:', error);
      return "nothing"; // Unable to fix the JSON
    }
  }
}