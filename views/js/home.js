const url = 'http://localhost:3000' // change url when uploading to server

// Logout
const logOut = document.querySelector('#logout-anchor')
logOut.addEventListener('click', () => {
  localStorage.removeItem('token')
})
