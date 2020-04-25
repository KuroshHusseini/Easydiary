'use strict'

const url = 'http://localhost:3000' // change url when uploading to server

const diaryList = document.querySelector('#diary-list ul')

// Edit diary
const editModal = document.querySelector('#edit-modal')
const editForm = document.querySelector('#edit-form')

// Remove diary
const removeModal = document.querySelector('#remove-diary-modal')
const removeSelectedDiary = removeModal.querySelector('button[name = "remove"')
const cancelSelectedDiary = removeModal.querySelector('button[name = "cancel"')

console.log('modal', editModal)
console.log('editForm', editForm)

const getDiaryEntries = async () => {
  console.log('Get token:', sessionStorage.getItem('token'))

  try {
    const options = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    }
    const response = await fetch(url + '/user/diary', options)
    const diaryEntries = await response.json()

    console.log('diaryEntries', diaryEntries)
    createDiaryListItem(diaryEntries)
  } catch (err) {
    console.log(e.message)
  }
}

getDiaryEntries()

editForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()

  let data = serializeJson(editForm)

  const mood = Number(
    editForm.querySelector('label input[name = "mood"]:checked').value
  )

  data = { ...data, mood, dayEntryId: Number(editForm.id) }

  console.log('What does data look like?', data)
  const options = {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }

  console.log(options)
  const response = await fetch(url + '/user/diary', options)
  const json = await response.json()
  console.log('updated response', json)
  getDiaryEntries()
})

const editDiary = (id) => {
  console.log('epic id', id)
  editForm.setAttribute('id', id)

  console.log("editfrom's id", editForm.id)
  editModal.classList.remove('hide')
}

removeSelectedDiary.addEventListener('click', async () => {
  const options = {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  }

  console.log(options)
  const response = await fetch(
    url + '/user/diary/' + removeSelectedDiary.id,
    options
  )
  const json = await response.json()
  console.log('updated response', json)
  getDiaryEntries()
})

const removeDiary = (id) => {
  console.log('removeSelectedDiary id', id)
  removeSelectedDiary.setAttribute('id', id)

  console.log("removeSelectedDiary's id", removeSelectedDiary.id)
  removeModal.classList.remove('hide')
}

const publishDiary = () => {}

const createDiaryListItem = (diaryEntries) => {
  diaryList.innerHTML = ''

  diaryEntries.forEach((diaryEntry) => {
    const li = document.createElement('li')
    li.className = 'day-entry-item'

    const h1 = document.createElement('h1')
    h1.innerHTML = diaryEntry.title
    h1.addEventListener('click', () => editDiary(diaryEntry.dayEntryId))

    const h2 = document.createElement('h2')
    h2.innerHTML = diaryEntry.dateTime
      ? new Date(diaryEntry.dateTime).toLocaleDateString()
      : '(Date not available)'

    const editBtn = document.createElement('button')
    editBtn.addEventListener('click', () => editDiary(diaryEntry.dayEntryId))
    editBtn.innerHTML = 'Edit'

    const removeBtn = document.createElement('button')
    removeBtn.addEventListener('click', () =>
      removeDiary(diaryEntry.dayEntryId)
    )

    li.appendChild(h1)
    li.appendChild(h2)
    li.appendChild(editBtn)
    li.appendChild(removeBtn)

    diaryList.appendChild(li)
  })
}
