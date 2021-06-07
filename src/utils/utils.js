/** Transforma o padrão SNAKE_CASE para camelCase */
function objectKeysSnakeToCamelCase(str) {
  return str.toLowerCase().replace(/([-_]\w)/g, g => g[1].toUpperCase());
}

export function parseObjectToCamelCase(params) {
  const objectArray = [];
  const keys = Object.keys(params[0]);

  params.forEach(obj => {
    const object = Object.assign(
      ...keys.map(key => ({
        [objectKeysSnakeToCamelCase(key)]: obj[key],
      }))
    );
    objectArray.push(object);
  });
  if (objectArray.length === 1) {
    return objectArray[0];
  }
  return objectArray;
}
