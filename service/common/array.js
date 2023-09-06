// 插入一条带序号的数据并排序
exports.insertByOrder = function (list, item) {
  let flag = false // 是否匹配到重复项
  for (let index in list) {
    if (!flag) {
      if (list[index].order == item.order) {
        flag = true
        list[index].order = Number(list[index].order) + 1
      } else if (list[index].order > item.order) {
        break
      }
    } else {
      if (list[index].order > list[index - 1].order) {
        break
      } else {
        list[index].order = Number(list[index].order) + 1
      }
    }
  }
  list.push(item)
  list.sort((a,b) => a.order - b.order)
  return list
}