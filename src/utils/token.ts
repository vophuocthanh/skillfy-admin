export const getToken = () => {
  const accessTokenFromQuery = new URLSearchParams(window.location.search).get(
    'access_token'
  )
  if (accessTokenFromQuery) {
    localStorage.setItem('access_token', accessTokenFromQuery)
    window.history.replaceState({}, document.title, window.location.pathname)
    return accessTokenFromQuery
  }
  return localStorage.getItem('access_token')
}
export const setToken = (token: string) =>
  localStorage.setItem('access_token', token)
export const removeToken = () => localStorage.removeItem('access_token')
