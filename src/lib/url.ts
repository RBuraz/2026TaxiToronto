export function urlSlugify(text:string) {
  if (!text) return '';
  
  const charMap: { [key: string]: string } = {
    'č': 'c', 'ć': 'c', 'đ': 'dj', 'š': 's', 'ž': 'z',
    'Č': 'c', 'Ć': 'c', 'Đ': 'dj', 'Š': 's', 'Ž': 'z'
  };
  
  return text
    .toString()
    .toLowerCase()
    .replace(/[čćđšž]/g, char => charMap[char])
    .replace(/[ČĆĐŠŽ]/g, char => charMap[char])
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}