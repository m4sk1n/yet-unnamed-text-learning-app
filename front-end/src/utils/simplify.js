const simplify = (str) => {
  return str.toLowerCase()
    .replace(/(„|”|“)/g, '"')
    .replace(/‘/g, '\'')
    .replace(/–/g, '-')
    .replace(/(,|…|\.|\?|!)/g, '')
    .trim();
}

export default simplify;