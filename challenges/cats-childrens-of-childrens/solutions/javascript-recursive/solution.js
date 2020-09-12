function solution (folders, result = []) {
  for (const folder of folders) {
    if (folder.type === 'image') {
      result.push(folder.name)
    } else if (folder.type === 'folder') {
      solution(folder.children, result)
    }
  }
  return result
}

module.exports = solution
