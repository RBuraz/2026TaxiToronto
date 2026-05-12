export const formatAreaName = (str: string) => {
  const words = str.split('-');
  return words.map((word, index) => 
    index === 0 
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()  // Prva riječ: prvo slovo veliko
      : word.toLowerCase()  // Ostale riječi: sva slova mala
  ).join(' ');
};