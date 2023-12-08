const Store = require('./index')

const store = new Store()

const mockMenu = [
  { id: 1, title: 'Red set', price: 50, unit: 'set' },
  { id: 2, title: 'Green set', price: 40, unit: 'set' },
  { id: 3, title: 'Blue set', price: 30, unit: 'set' },
  { id: 4, title: 'Yellow set', price: 50, unit: 'set' },
  { id: 5, title: 'Pink set', price: 80, unit: 'set' },
  { id: 6, title: 'Purple set', price: 90, unit: 'set' },
  { id: 7, title: 'Orange set', price: 120, unit: 'set' },
]

describe('calc menu', () => {
  test('get menu by id', () => {
    expect(store.getMenu(1)).toEqual(mockMenu[0])
  })

  test('get all menu', () => {
    expect(store.getMenuList()).toEqual(mockMenu)
  })

  test('get double orange w/o member card', () => {
    const mock = {
      member: false,
      list: [
        { id: 1, title: 'Red set', price: 50, unit: 'set', qty: 0 },
        { id: 2, title: 'Green set', price: 40, unit: 'set', qty: 0 },
        { id: 3, title: 'Blue set', price: 30, unit: 'set', qty: 0 },
        { id: 4, title: 'Yellow set', price: 50, unit: 'set', qty: 0 },
        { id: 5, title: 'Pink set', price: 80, unit: 'set', qty: 0 },
        { id: 6, title: 'Purple set', price: 90, unit: 'set', qty: 0 },
        { id: 7, title: 'Orange set', price: 120, unit: 'set', qty: 2 },
      ],
    }
    expect(store.calcMenu(mock)).toBe(228)
  })

  test('get double orange w/ member card', () => {
    const mock = {
      member: true,
      list: [
        { id: 1, title: 'Red set', price: 50, unit: 'set', qty: 0 },
        { id: 2, title: 'Green set', price: 40, unit: 'set', qty: 0 },
        { id: 3, title: 'Blue set', price: 30, unit: 'set', qty: 0 },
        { id: 4, title: 'Yellow set', price: 50, unit: 'set', qty: 0 },
        { id: 5, title: 'Pink set', price: 80, unit: 'set', qty: 0 },
        { id: 6, title: 'Purple set', price: 90, unit: 'set', qty: 0 },
        { id: 7, title: 'Orange set', price: 120, unit: 'set', qty: 2 },
      ],
    }
    expect(store.calcMenu(mock)).toBe(205.2)
  })

  test('get double pink w/o member card', () => {
    const mock = {
      member: false,
      list: [
        { id: 1, title: 'Red set', price: 50, unit: 'set', qty: 0 },
        { id: 2, title: 'Green set', price: 40, unit: 'set', qty: 0 },
        { id: 3, title: 'Blue set', price: 30, unit: 'set', qty: 0 },
        { id: 4, title: 'Yellow set', price: 50, unit: 'set', qty: 0 },
        { id: 5, title: 'Pink set', price: 80, unit: 'set', qty: 2 },
        { id: 6, title: 'Purple set', price: 90, unit: 'set', qty: 0 },
        { id: 7, title: 'Orange set', price: 120, unit: 'set', qty: 0 },
      ],
    }
    expect(store.calcMenu(mock)).toBe(152)
  })

  test('get double pink w/ member card', () => {
    const mock = {
      member: true,
      list: [
        { id: 1, title: 'Red set', price: 50, unit: 'set', qty: 0 },
        { id: 2, title: 'Green set', price: 40, unit: 'set', qty: 0 },
        { id: 3, title: 'Blue set', price: 30, unit: 'set', qty: 0 },
        { id: 4, title: 'Yellow set', price: 50, unit: 'set', qty: 0 },
        { id: 5, title: 'Pink set', price: 80, unit: 'set', qty: 2 },
        { id: 6, title: 'Purple set', price: 90, unit: 'set', qty: 0 },
        { id: 7, title: 'Orange set', price: 120, unit: 'set', qty: 0 },
      ],
    }
    expect(store.calcMenu(mock)).toBe(136.8)
  })

  test('get double green w/o member card', () => {
    const mock = {
      member: false,
      list: [
        { id: 1, title: 'Red set', price: 50, unit: 'set', qty: 0 },
        { id: 2, title: 'Green set', price: 40, unit: 'set', qty: 2 },
        { id: 3, title: 'Blue set', price: 30, unit: 'set', qty: 0 },
        { id: 4, title: 'Yellow set', price: 50, unit: 'set', qty: 0 },
        { id: 5, title: 'Pink set', price: 80, unit: 'set', qty: 0 },
        { id: 6, title: 'Purple set', price: 90, unit: 'set', qty: 0 },
        { id: 7, title: 'Orange set', price: 120, unit: 'set', qty: 0 },
      ],
    }
    expect(store.calcMenu(mock)).toBe(76)
  })

  test('get double green w/ member card', () => {
    const mock = {
      member: true,
      list: [
        { id: 1, title: 'Red set', price: 50, unit: 'set', qty: 0 },
        { id: 2, title: 'Green set', price: 40, unit: 'set', qty: 2 },
        { id: 3, title: 'Blue set', price: 30, unit: 'set', qty: 0 },
        { id: 4, title: 'Yellow set', price: 50, unit: 'set', qty: 0 },
        { id: 5, title: 'Pink set', price: 80, unit: 'set', qty: 0 },
        { id: 6, title: 'Purple set', price: 90, unit: 'set', qty: 0 },
        { id: 7, title: 'Orange set', price: 120, unit: 'set', qty: 0 },
      ],
    }
    expect(store.calcMenu(mock)).toBe(68.4)
  })

  test('get 1 red set w/o member card', () => {
    const mock = {
      member: false,
      list: [
        { id: 1, title: 'Red set', price: 50, unit: 'set', qty: 1 },
        { id: 2, title: 'Green set', price: 40, unit: 'set', qty: 0 },
        { id: 3, title: 'Blue set', price: 30, unit: 'set', qty: 0 },
        { id: 4, title: 'Yellow set', price: 50, unit: 'set', qty: 0 },
        { id: 5, title: 'Pink set', price: 80, unit: 'set', qty: 0 },
        { id: 6, title: 'Purple set', price: 90, unit: 'set', qty: 0 },
        { id: 7, title: 'Orange set', price: 120, unit: 'set', qty: 0 },
      ],
    }
    expect(store.calcMenu(mock)).toBe(50)
  })

  test('get 1 red set w/ member card', () => {
    const mock = {
      member: true,
      list: [
        { id: 1, title: 'Red set', price: 50, unit: 'set', qty: 1 },
        { id: 2, title: 'Green set', price: 40, unit: 'set', qty: 0 },
        { id: 3, title: 'Blue set', price: 30, unit: 'set', qty: 0 },
        { id: 4, title: 'Yellow set', price: 50, unit: 'set', qty: 0 },
        { id: 5, title: 'Pink set', price: 80, unit: 'set', qty: 0 },
        { id: 6, title: 'Purple set', price: 90, unit: 'set', qty: 0 },
        { id: 7, title: 'Orange set', price: 120, unit: 'set', qty: 0 },
      ],
    }
    expect(store.calcMenu(mock)).toBe(45)
  })
})
