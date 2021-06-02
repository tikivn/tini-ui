export async function selectAsync(selector: string): Promise<unknown | string> {
  return new Promise((resolve, reject) => {
    my.createSelectorQuery()
      .select(selector)
      .boundingClientRect()
      .exec((ret) => {
        if (ret && ret[0]) {
          resolve(ret[0]);
        }
        reject('Cannot selector element');
      });
  });
}

export async function selectAllAsync(selector: string): Promise<unknown | string> {
  return new Promise((resolve, reject) => {
    my.createSelectorQuery()
      .selectAll(selector)
      .boundingClientRect()
      .exec((ret) => {
        if (ret && ret[0]) {
          resolve(ret[0]);
        }
        reject('Cannot selector element');
      });
  });
}
