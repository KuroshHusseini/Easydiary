'use strict'

const url = 'https://localhost:8000'

/* DOM elements */
const homeNameForm = document.querySelector('#home-name-form')

const changePasswdForm = document.querySelector('#change-password-form')

/* END */

console.log('homeNameForm', homeNameForm)

const initializeFormValues = (userSettings) => {
  console.log('User settings', userSettings)
  console.log('Street address', homeNameForm.querySelector('.street-address'))

  homeNameForm.querySelector('.street-address').value = userSettings.strAddress
  homeNameForm.querySelector('.city').value = userSettings.city
  homeNameForm.querySelector('.post-code').value = userSettings.postCode

  homeNameForm.querySelector('.first-name').value = userSettings.firstName
  homeNameForm.querySelector('.last-name').value = userSettings.lastName
}

const fetchUserSettings = async () => {
  console.log('Get token:', localStorage.getItem('token'))

  try {
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
    const response = await fetch(url + '/user/settings', options)
    const userSettings = await response.json()

    console.log('userSettings', userSettings)

    initializeFormValues(userSettings)
    //createDiaryListItem(userSettings)
  } catch (err) {
    console.log(err.message)
  }
}

// Logout
const logOut = document.querySelector('#logout-anchor')
logOut.addEventListener('click', () => {
  localStorage.removeItem('token')
})

homeNameForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()
  const data = serializeJson(homeNameForm)

  console.log('json', data)

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  }

  try {
    console.log(options)
    const response = await fetch(url + '/user/settings', options)
    const json = await response.json()

    console.log('updated settings', json)
  } catch (err) {
    throw err
  }
})

changePasswdForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()

  const data = serializeJson(changePasswdForm)

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  }

  try {
    console.log('options', options)

    const response = await fetch(url + '/user/settings/password', options)
    const json = await response.json()

    console.log('updated password', json)
    window.location.href = url + '/settings'
  } catch (error) {
    console.log('error.message', error.message)
  }
})

fetchUserSettings()
