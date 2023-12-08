export function getMenuList() {
  return {
    url: `/api/menus`,
    options: {
      method: 'GET',
    },
  }
}

export function calcMenu(options = {}) {
  return {
    url: `/api/calc`,
    options: {
      method: 'POST',
      ...options,
    },
  }
}
