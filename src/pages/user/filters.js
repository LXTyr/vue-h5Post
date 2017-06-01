export function getName (value) {
  let str = ''
  value.forEach(function (e, i) {
    str += e.Name + ((i === (value.length - 1)) ? '' : ',')
  })
  return str
}

let cls = {
  'ALL': '所有人',
  'CLASS': '班级',
  'PRIVATE': '仅自己',
  'WHITE': '白名单',
  'BLACK': '黑名单'
}

export function getTag (value) {
  if (value in cls) {
    return cls[value]
  } else {
    return ''
  }
}
