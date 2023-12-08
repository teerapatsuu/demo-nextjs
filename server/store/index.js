const { forEach } = require('lodash')

module.exports = class Store {
  constructor() {
    this.menuList = [
      { id: 1, title: 'Red set', price: 50, unit: 'set' },
      { id: 2, title: 'Green set', price: 40, unit: 'set' },
      { id: 3, title: 'Blue set', price: 30, unit: 'set' },
      { id: 4, title: 'Yellow set', price: 50, unit: 'set' },
      { id: 5, title: 'Pink set', price: 80, unit: 'set' },
      { id: 6, title: 'Purple set', price: 90, unit: 'set' },
      { id: 7, title: 'Orange set', price: 120, unit: 'set' },
    ]
  }

  getMenu(id) {
    const entity = this.menuList.find((item) => item.id === parseInt(id))
    return entity
  }

  getMenuList() {
    return this.menuList
  }

  calcMenu(req) {
    let price = 0
    forEach(req.list, (i) => {
      switch (i.id) {
        case 2:
        case 5:
        case 7: {
          if (i.qty >= 2) {
            price += i.price * i.qty * 0.95
          } else {
            price += i.price * i.qty
          }
          break
        }
        default:
          price += i.price * i.qty
          break
      }
    })
    if (req.member) price = price * 0.9
    return Math.round(price * 100) / 100
  }
}

/**
 *
 * Red set                         	50 THB/set
 * Green set                    	  40 THB/set
 * Blue set                        	30 THB/set
 * Yellow set                		    50 THB/set
 * Pink set                        	80 THB/set
 * Purple set                   	  90 THB/set
 * Orange set                  	    120 THB/set
 *
 **/
