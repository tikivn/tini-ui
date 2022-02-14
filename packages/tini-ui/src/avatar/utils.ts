const colors = ['#FFB800', '#DD6C41', '#F64683', '#B962FF', '#3F50E3', '#2DC275'];

export const getShortname = (name: string): string => {
  try {
    if (!name || !`${name}`.trim().length) {
      return '';
    }

    const split = name.trim().split(' ');
    const rs = (split[split.length - 2] || '').charAt(0) + split[split.length - 1].charAt(0);
    return rs.toUpperCase();
  } catch {
    return '';
  }
};

export const getColorName = (name: string): string => {
  try {
    if (!name || `${name}`.trim().length === 0) {
      return colors[0];
    }

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    hash = ((hash % colors.length) + colors.length) % colors.length;
    return colors[hash];
  } catch {
    return colors[0];
  }
};
