'use strict'

const url = 'http://localhost:3000' // change url when uploading to server

// select existsing html elements
const registerUserForm = document.querySelector('#register-user-form')
const loginForm = document.querySelector('#login-form')

console.log('loginForm', loginForm)
// submit register form
registerUserForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()

  const gender = document.querySelector(
    '#register-user-form input[name = "sex"]:checked'
  ).value

  const data = serializeJson(registerUserForm)

  const newObject = { ...data, gender }

  console.log('DATA', newObject)

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const response = await fetch(url + '/auth/register', fetchOptions)
  const json = await response.json()

  console.log('login response', json)

  if (!json.user) {
    alert(json.message)
  } else {
    // save token
    sessionStorage.setItem('token', json.token)
  }
})

// login
/* loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()
  const data = serializeJson(loginForm)
  let fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const response = await fetch(url + '/login', fetchOptions)
  console.log('login response', response)
  if (!response.user) {
    alert(response.message)
  } else { */
// save token
/*     sessionStorage.setItem('token', response.token)
 */ // show/hide forms + cats
/* 
    console.log('LOGGED IN!') */

/*     fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    } */
/*     try {
      await fetch(url + '/WADAFAK')
    } catch (err) {
      console.log('err', err)
    } */

/*     loginWrapper.style.display = 'none'
    logOut.style.display = 'block'
    main.style.display = 'block'
    userInfo.innerHTML = `Hello ${json.user.name}`
    getCat()
    getUsers() */
/*   }
}) */
