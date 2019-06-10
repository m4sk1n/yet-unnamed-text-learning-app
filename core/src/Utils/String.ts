export function simplify(str: string) {
  let simplifiedString: string;
  simplifiedString = str.replace(/ /g, ' ')
    .replace(/„|”|“/g, '"')
    .replace(/‒|–|—|―|⸺|⸻/g, '-')
    .replace(/ʼ|՚|’|ߴ/g, '\'')
    .replace(/…/g, '...').trim();
  return simplifiedString;
}
