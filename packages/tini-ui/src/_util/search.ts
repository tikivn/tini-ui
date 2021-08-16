const isHasValue = (value?: string) => value !== null && value !== undefined;

function normalize(text: string) {
  return `${text}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export default function compareNormalize(a: string, b: string): boolean {
  if (!isHasValue(a) || !isHasValue(b)) {
    return true;
  }
  const normalizeA = normalize(a).toLowerCase();
  const normalizeB = normalize(b).toLowerCase();
  return normalizeA.includes(normalizeB);
}
