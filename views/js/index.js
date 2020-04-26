'use strict'

const url = 'http://localhost:3000' // change url when uploading to server

const closeBtnFunc = (message, status = 'danger') => {
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

    console.log('DIVIUS', div)
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
    closeBtnFunc(errorMessage, 'danger')
  } else {
    // save token

    const successMessage = `${json.message} Welcome aboard ${json.user.username}!`
    console.log('response', successMessage)
    console.log(successMessage)

    closeBtnFunc(successMessage, 'success')
    /*     console.log('json.token', json.token)
    localStorage.setItem('token', json.token) */
    //sessionStorage.setItem('token', json.token)
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

    console.log('login json response', json)
    if (!json) {
      alert('No response.')
    } else {
      // save token

      console.log('json token', json.token)
      localStorage.setItem('token', json.token)
      sessionStorage.setItem('token', json.token)

      console.log(
        'session storage.setItem(setToen',
        sessionStorage.getItem('token')
      )
      // show
      //      console.log(
      // 'session storage.setItem(setToen',
      //   sessionStorage.getItem('token')
      // )
    }
  } catch (err) {
    console.log('err message', err.message)
  }
})

const testButton = document.querySelector('#test-button')
testButton.addEventListener('click', async (evt) => {
  evt.preventDefault()
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  }
  try {
    const response = await fetch(url + '/testi', fetchOptions)

    if (!response) {
      alert('Error happened')
    }
    /*   const json = await response.json()
  
    console.log('login json response', json)
    if (!json) {
      alert('No response.')
    } else {
      // save token
  
    } */
  } catch (err) {
    console.log('err message', err.message)
  }
})

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
