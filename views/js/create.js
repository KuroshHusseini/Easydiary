const url = 'http://localhost:3000' // change url when uploading to server

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

    console.log('updated response', json)
  } catch (err) {
    throw err
  }
})

console.log('addDiaryNEtyafgosa', addDiaryEntryForm)
