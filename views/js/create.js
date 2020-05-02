const url = 'https://localhost:8000' // change url when uploading to server

const addDiaryEntryForm = document.querySelector('#add-diary-entry-form')

// Logout
const logOut = document.querySelector('#logout-anchor')
logOut.addEventListener('click', () => {
  localStorage.removeItem('token')
})

addDiaryEntryForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()

  const fd = new FormData(addDiaryEntryForm)

  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: fd,
  }

  try {
    console.log(options)
    const response = await fetch(url + '/diary/user', options)
    const json = await response.json()

    console.log('create response', json)

    if (json.errors) {
      const errorMessage = json.errors.map((error) => `${error.msg}.`).join(' ')
      console.log(errorMessage)
      alert(errorMessage)
    } else {
      const successMessage = 'Diary entry created.'
      console.log('response', successMessage)
      alert(successMessage)

      window.location.href = url + '/diary'
    }

    console.log('updated response', json)
  } catch (err) {
    throw err
  }
})

console.log('addDiaryNEtyafgosa', addDiaryEntryForm)
