export function deepClone<T>(source: T, uniqueList = new WeakMap()): T {
  // 如果是基本类型或 null，则直接返回
  if (source === null || typeof source !== 'object') {
    return source
  }

  // 如果已经拷贝过该对象，则直接返回拷贝后的对象
  if (uniqueList.has(source)) {
    return uniqueList.get(source) as T
  }

  // 处理日期对象
  if (source instanceof Date) {
    return new Date(source) as T
  }

  // 处理正则表达式对象
  if (source instanceof RegExp) {
    return new RegExp(source) as T
  }

  // 处理数组
  if (Array.isArray(source)) {
    const targetArray: any[] | T = []
    uniqueList.set(source, targetArray)

    for (const item of source) {
      targetArray.push(deepClone(item, uniqueList))
    }

    return targetArray as T
  }

  // 处理普通对象
  const targetObject: Record<string, unknown> = {}
  uniqueList.set(source, targetObject)

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      targetObject[key] = deepClone(source[key], uniqueList)
    }
  }

  return targetObject as T
}

export function generateUUID() {
  let d = new Date().getTime()

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0

    d = Math.floor(d / 16)

    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })

  return uuid
}
