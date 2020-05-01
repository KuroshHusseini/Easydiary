'use strict'

const url = 'http://localhost:3000' // change url when uploading to server

const alertNotification = (message, status = 'danger') => {
  const newAlert = document.createElement('div')
  newAlert.className = `alert ${status}`
  newAlert.innerHTML = `
    <span class="closebtn">&times;</span>
    <strong>${status}</strong> ${message}
    `
  topDiv.insertBefore(newAlert, topDiv.childNodes[0])

  const closeBtn = newAlert.querySelector('.closebtn')

  console.log('closeButton', closeBtn)
  closeBtn.onclick = function () {
    const div = closeBtn.parentElement

    div.style.opacity = '0'
    setTimeout(() => {
      div.style.display = 'none'
    }, 600)
  }
}

// select existsing html elements
const topDiv = document.querySelector('#top')
const registerUserForm = document.querySelector('#register-user-form')
const loginForm = document.querySelector('#login-form')

console.log('loginForm', loginForm)
// submit register form
registerUserForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()

  const gender = document.querySelector(
    '#register-user-form input[name = "gender"]:checked'
  ).value

  console.log('gender:', gender)

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

  const response = await fetch(url + '/register', fetchOptions)
  const json = await response.json()

  console.log('login response', json)

  if (!json.user) {
    const errorMessage = json.map((error) => `${error.msg}.`).join(' ')
    console.log(errorMessage)
    alertNotification(errorMessage, 'danger')
  } else {
    const successMessage = `${json.message} Welcome aboard ${json.user.username}!`
    console.log('response', successMessage)
    console.log(successMessage)

    alertNotification(successMessage, 'success')
  }
})

// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()
  const data = serializeJson(loginForm)

  console.log('daaata', data)
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  try {
    const response = await fetch(url + '/login', fetchOptions)

    const json = await response.json()
    console.log('jsonwebtoken', json)
    if (json) {
      localStorage.setItem('token', json.token)
    } else {
      alert('No jsonwebtoken.')
    }

    if (response) {
      window.location.href = '/home'
    }
  } catch (err) {
    console.log('err message', err.message)
    alert('No response. Incorrect credentials, perhaps?')

    throw err
  }
})
