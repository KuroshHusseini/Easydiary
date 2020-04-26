const url = 'http://localhost:3000' // change url when uploading to server

const addDiaryEntryForm = document.querySelector('#add-diary-entry-form')

addDiaryEntryForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()

  const fd = new FormData(addDiaryEntryForm)

  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  }

  console.log(options)
  const response = await fetch(url + '/user/diary', options)
  const json = await response.json()

  console.log('updated response', json)
})

console.log('addDiaryNEtyafgosa', addDiaryEntryForm)
