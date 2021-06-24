/* eslint-disable */
interface Event {
  currentTarget: { dataset: any };
  target: { dataset: any; targetDataset: any };
}

export default function fmtEvent(props: any, e: any): Event {
  const dataset = {};
  for (const key in props) {
    if (/data-/gi.test(key)) {
      dataset[key.replace(/data-/gi, '')] = props[key];
    }
  }
  return Object.assign({}, e, {
    currentTarget: { dataset },
    target: { dataset, targetDataset: dataset },
  });
}
