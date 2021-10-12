import Cookies from 'js-cookie'
const TokenKey = 'example-token'

export function getToken () {
  const token = Cookies.getJSON(TokenKey)
  return token
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, { expires: 60 })
}

export function setTokenTest () {
  return Cookies.set(TokenKey, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvYXV0aC9zaWduaW4iLCJpYXQiOjE1OTg3MjA0NDUsImV4cCI6MTU5ODcyNDA0NSwibmJmIjoxNTk4NzIwNDQ1LCJqdGkiOiIzYTJqVXZmMmtqRmhxYlp0In0.eM50tVX0QQMxohuZz-OnptWJP-AmBkkd4gnbHR_yF9k')
}

export function removeToken (token) {
  Cookies.remove(TokenKey)
}
