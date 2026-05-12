export function getOptimalTitle(
  titlesArray: string[],
  from?: string,
  to?: string,
) {
  const min = 36;
  const max = 52;
  const ideal = 44;

  // 1. Ako ima idealnih, vrati slučajni
  const perfectMatches = titlesArray.filter(
    (s) => s.length >= min && s.length <= max,
  );

  if (perfectMatches.length > 0) {
    const randomIndex = Math.floor(Math.random() * perfectMatches.length);
    return perfectMatches[randomIndex];
  }

  // 2. Ako nema idealnih, traži duže pa ih skraćuj
  const longerMatches = [...titlesArray]
    .filter((s) => s.length > ideal)
    .sort((a, b) => a.length - b.length);

  if (longerMatches.length > 0) {
    const selected = longerMatches[0];

    // Skrati na idealnu dužinu (do zadnjeg razmaka)
    let shortened = selected.substring(0, ideal);
    const lastSpace = shortened.lastIndexOf(" ");
    if (lastSpace > ideal * 0.8) {
      shortened = shortened.substring(0, lastSpace);
    }

    return shortened.length < ideal - 3 ? shortened + "..." : shortened;
  }

  // 3. Ako su svi kratki, uzmi 3 najduža pa vrati slučajni s "TAXI TORONTO"
  const threeLongest = [...titlesArray]
    .sort((a, b) => b.length - a.length)
    .slice(0, 3);

  const randomIndex = Math.floor(Math.random() * threeLongest.length);
  let selected = threeLongest[randomIndex];



  // Ponovno skrati ako je predugačak
  if (selected.length > max) {
    let shortened = selected.substring(0, ideal);
    const lastSpace = shortened.lastIndexOf(" ");
    if (lastSpace > ideal * 0.8) {
      shortened = shortened.substring(0, lastSpace);
    }
    return shortened.length < ideal - 3 ? shortened + "..." : shortened;
  }

  return selected;
}

export function getOptimalDescription(
  descriptionsArray: string[],
  from?: string,
  to?: string,
) {
  const min = 130;
  const max = 160;
  const ideal = 145;

  // 1. Ako ima idealnih, vrati slučajni
  const perfectMatches = descriptionsArray.filter(
    (s) => s.length >= min && s.length <= max,
  );

  if (perfectMatches.length > 0) {
    const randomIndex = Math.floor(Math.random() * perfectMatches.length);
    return perfectMatches[randomIndex];
  }

  // 2. Ako nema idealnih, traži duže pa ih skraćuj
  const longerMatches = [...descriptionsArray]
    .filter((s) => s.length > ideal)
    .sort((a, b) => a.length - b.length);

  if (longerMatches.length > 0) {
    const selected = longerMatches[0];

    // Skrati na idealnu dužinu (do zadnjeg razmaka)
    let shortened = selected.substring(0, ideal);
    const lastSpace = shortened.lastIndexOf(" ");
    if (lastSpace > ideal * 0.8) {
      shortened = shortened.substring(0, lastSpace);
    }

    if (shortened.length < ideal - 10)
      return shortened + "... Book online today!";
    if (shortened.length < ideal) return shortened + "...";
    return shortened;
  }

  // 3. Ako su svi kratki, uzmi 3 najduža
  const threeLongest = [...descriptionsArray]
    .sort((a, b) => b.length - a.length)
    .slice(0, 3);

  return threeLongest[Math.floor(Math.random() * threeLongest.length)];
}
