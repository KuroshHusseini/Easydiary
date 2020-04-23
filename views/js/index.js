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

  const response = await fetch(url + '/auth/login', fetchOptions)

  const json = await response.json()

  console.log('login json response', json)
  if (!json.user) {
    alert(json.message)
  } else {
    // save token
    sessionStorage.setItem('token', json.token)

    // show

    console.log(
      'session storage.setItem(setToen',
      sessionStorage.getItem('token')
    ) */

/*     var sendHome = url + '/home'
    var form = document.createElement('form')
    console.log('form', form)
    document.body.appendChild(form)
    form.method = 'GET'
    form.action = sendHome
    console.log('form and stuff', form) */
//form.submit()

/*     const jotain = await fetch(url + '/hidden', {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })

    console.log('jotain', jotain) */

/*     let xhr = new XMLHttpRequest()
    xhr.open('POST', url + '/home', true)

    xhr.setRequestHeader('Content-Type', 'application/json')
    const accessToken = sessionStorage.getItem('token')

    if (accessToken) {
      console.log('I HAS ACCESS TOKEN!')
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
      xhr.send()
    } */
/*     var sendHome = url + '/home'
    var form = document.createElement('form')
    document.body.appendChild(form)
    form.method = 'GET'
    form.head = {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    }
    form.action = sendHome
    console.log('form and stuff', form)
    form.submit() */

/*     await fetch(url + '/home', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    }) */

/*     console.log('We are at home page.')
 */
