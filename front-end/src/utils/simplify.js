export default (str) => {
  return str.toLowerCase()
    .replace(/ /g, ' ')
    .replace(/(„|”|“)/g, '"')
    .replace(/‒|–|—|―|⸺|⸻/g, '-')
    .replace(/ʼ|՚|’|ߴ/g, '\'')
    .replace(/(,|…|\.|\?|!)/g, '')
    .trim();
}
