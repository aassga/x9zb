import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getCookie () {
  return Cookies.get(TokenKey)
}

export function setCookie (key, value) {
  return Cookies.set(key, value)
}

export function removeCookie (name) {
  return Cookies.remove(name)
}
