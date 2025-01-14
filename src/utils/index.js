export function _uuid() {
  var d = Date.now()
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = ((d + Math.random() * 16) % 16) | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function exportCsv(data, columns, title) {
  let csv = JSONtoCSV(data, columns)

  let createAndDownloadFile = (fileName, content) => {
    let aTag = document.createElement('a')
    let blob = new Blob(['\uFEFF', content])
    aTag.download = fileName
    aTag.href = URL.createObjectURL(blob)
    aTag.click()
    URL.revokeObjectURL(blob)
  }
  createAndDownloadFile(title, csv)
}

export function JSONtoCSV(arr, columns, delimiter = ',') {
  return [
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) =>
          `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    )
  ].join('\n')
}

export function deepCopy(obj) {
  let obj_cp = JSON.parse(JSON.stringify(obj))
  return obj_cp
}

export function debounce(fun, t = 0) {
  let st
  if (typeof fun !== 'function') {
    throw new TypeError('Not a function')
  }
  return function() {
    if (st) {
      clearTimeout(st)
    }
    st = setTimeout(() => {
      fun.apply(this, arguments)
    }, t)
  }
}

const get = (object, path) => {
  const keys = path.split('.');
  const currentKey = keys.shift();
  if (!keys.length) return object[currentKey];
  return get(object[currentKey], keys.join('.'));
};

export const sort = (array, prop, desc = true) => {
  if (!prop) throw new Error('Specify prop for objects to be sorted by');

  return array.sort((curr, next) => {
    curr = get(curr, prop);
    next = get(next, prop);
    if (typeof curr === 'string') curr = curr.toLowerCase();
    if (typeof next === 'string') next = next.toLowerCase();

    if (curr > next) return desc ? -1 : 1;
    if (curr < next) return desc ? 1 : -1;
    return 0;
  });
};
