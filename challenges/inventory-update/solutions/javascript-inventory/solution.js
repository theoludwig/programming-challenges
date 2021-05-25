function solution(array1, array2) {
  const result = [...array1]

  array2.forEach((delivery2) => {
    const foundResultIndex = result.findIndex(
      (deliveryResult) => deliveryResult.item === delivery2.item
    )
    if (foundResultIndex === -1) return result.push(delivery2)
    return (result[foundResultIndex].quantity =
      result[foundResultIndex].quantity + delivery2.quantity)
  })

  return result.sort((a, b) => a.item.localeCompare(b.item))
}

module.exports = solution
