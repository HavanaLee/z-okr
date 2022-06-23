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

export function generateUUID() {
  var d = new Date().getTime();

  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;

    d = Math.floor(d / 16);

    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);

  });

  return uuid;

};

