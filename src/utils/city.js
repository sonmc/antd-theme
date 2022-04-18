let DICT = {
  110000: '北京',
  110100: '北京市',
  110101: '东城区',
  110102: '西城区',
  110105: '朝阳区',
  110106: '丰台区',
  110107: '石景山区',
  110108: '海淀区',
  110109: '门头沟区',
  110111: '房山区',
  110112: '通州区',
  110113: '顺义区',
  110114: '昌平区',
  110115: '大兴区',
  110116: '怀柔区',
  110117: '平谷区',
  110228: '密云县',
  110229: '延庆县',
  110230: '其它区',
  120000: '天津',
  120100: '天津市',
  120101: '和平区',
  120102: '河东区',
  120103: '河西区',
  120104: '南开区',
  120105: '河北区',
}

const tree = (list) => {
  let hashTable = Object.create(null)
  list.forEach((aData) => (hashTable[aData.id] = { ...aData, children: [] }))
  let dataTree = []
  list.forEach((aData) => {
    if (aData.pid) {
      if (hashTable[aData.pid])
        hashTable[aData.pid].children.push(hashTable[aData.id])
    } else dataTree.push(hashTable[aData.id])
  })
  return dataTree
}

let DICT_FIXED = (function () {
  let fixed = []
  for (let id in DICT) {
    if ({}.hasOwnProperty.call(DICT, id)) {
      let pid
      const tmpObj = { id, value: DICT[id], label: DICT[id] }
      if (id.slice(2, 6) !== '0000') {
        pid =
          id.slice(4, 6) === '00'
            ? `${id.slice(0, 2)}0000`
            : `${id.slice(0, 4)}00`
      }
      if (pid) tmpObj.pid = pid
      fixed.push(tmpObj)
    }
  }
  return tree(fixed)
})()

export default DICT_FIXED
