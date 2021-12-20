export const deepClone = (source: any) => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments');
  }
  const targetObj = source.constructor === Array ? [] : {} as any;
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
};

