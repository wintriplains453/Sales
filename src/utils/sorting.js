class Sorting {
  data = []
  discountArr = []
  salesArr = []
  notSalesArr = []

  constructor(data) {
    this.data = data
  }

  process() {
    this.data.forEach(item => {
      if (item.isDiscount) {
        this.discountArr.push(item)
      }
      if (item.isPopular) {
        this.salesArr.push(item)
      } else {
        this.notSalesArr.push(item)
      }
    })
    return {
      discount: this.discountArr,
      sales: this.salesArr,
      notSales: this.notSalesArr
    }
  }
}

export default Sorting
