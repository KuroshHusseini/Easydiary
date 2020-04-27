// Logout
const logOut = document.querySelector('#logout-anchor')
logOut.addEventListener('click', () => {
  localStorage.removeItem('token')
})
