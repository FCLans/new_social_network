export const filterArrayHelper = (items: Array<any>, nameProp: string, itemId: number) => {
  return items.filter((item) => item[nameProp] !== itemId)
}

export const mapArrayHelper = (items: Array<any>, nameProp: string, itemId: number, setObj: any) => {
  return items.map((item) => {
    if (item[nameProp] === itemId) {
      return { ...item, ...setObj }
    }

    return item
  })
}
