'use strict'

const url = 'http://localhost:3000' // change url when uploading to server

const diaryList = document.querySelector('#diary-list ul')

// Edit diary
const editModal = document.querySelector('#edit-modal')
const editForm = document.querySelector('#edit-form')
const cancelEditModal = editModal.querySelector('button[name = "cancel"')

// Remove diary
const removeModal = document.querySelector('#remove-diary-modal')
const removeSelectedDiary = removeModal.querySelector('button[name = "remove"')
const cancelRemoveModal = removeModal.querySelector('button[name = "cancel"')

// View diary
const viewModal = document.querySelector('#view-diary-modal')
const closeViewModal = viewModal.querySelector('button[name = "close"')

console.log('modal', editModal)
console.log('editForm', editForm)
console.log('cancelEditModal', cancelEditModal)
console.log('cancelRemoveModal', cancelRemoveModal)

const closeAllModals = () => {
  viewModal.classList.add('hide')
  editModal.classList.add('hide')
  removeModal.classList.add('hide')
}

// Cancel and view edit diary entry modal

const cancelEditFunc = () => {
  console.log('This is cancel edit func!')
  editForm.removeAttribute('id')

  editModal.classList.add('hide')
}

cancelEditModal.addEventListener('click', cancelEditFunc)

const showEditDiaryModal = (dayEntry) => {
  closeAllModals()

  console.log('dayEntry modal', dayEntry)
  console.log('epic id', dayEntry.dayEntryId)
  editForm.setAttribute('id', dayEntry.dayEntryId)

  editForm.querySelector('.title').value = dayEntry.title
  editForm.querySelector('.note-text').value = dayEntry.noteText

  dayEntry.filename
    ? (editForm.querySelector('.image').src = dayEntry.filename)
    : (editForm.querySelector('.image').src = '../images/no-image.jpg')

  editForm.querySelector('.date-time').value = new Date(
    dayEntry.dateTime
  ).toLocaleDateString()

  editForm.querySelectorAll('input[name="mood"]').forEach((mood) => {
    if (mood.value == dayEntry.mood) {
      mood.checked = true
    }
  })

  editForm.querySelector('.things').value = dayEntry.things

  console.log("editForm's id", editForm.id)
  editModal.classList.remove('hide')
}

// View diary entry
const viewDiaryModal = (dayEntry) => {
  closeAllModals()

  viewModal.querySelector('.title').innerHTML = dayEntry.title
  viewModal.querySelector('.note-text').innerHTML = dayEntry.noteText

  dayEntry.filename
    ? (viewModal.querySelector('.image').src = url + '/' + dayEntry.filename)
    : (viewModal.querySelector('.image').src = '../images/no-image.jpg')

  viewModal.querySelector('.datetime').innerHTML = dayEntry.dateTime
  viewModal.querySelector('.mood').innerHTML = dayEntry.mood
  viewModal.querySelector('.things').innerHTML = dayEntry.things

  viewModal.classList.remove('hide')
}

closeViewModal.addEventListener('click', () => {
  closeAllModals()
})

removeSelectedDiary.addEventListener('click', async () => {
  closeAllModals()

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

  removeSelectedDiary.removeAttribute('id')

  const json = await response.json()
  console.log('updated response', json)
  getDiaryEntries()
})

// Cancel remove diary entry modal
const cancelRemoveFunc = () => {
  removeSelectedDiary.removeAttribute('id')

  closeAllModals()
}

cancelRemoveModal.addEventListener('click', cancelRemoveFunc)

const showRemoveDiaryModal = (id) => {
  closeAllModals()

  console.log('removeSelectedDiary id', id)
  removeSelectedDiary.setAttribute('id', id)

  console.log("removeSelectedDiary's id", removeSelectedDiary.id)
  removeModal.classList.remove('hide')
}

const createDiaryListItem = (diaryEntries) => {
  diaryList.innerHTML = ''

  diaryEntries.forEach((diaryEntry) => {
    const li = document.createElement('li')
    li.className = 'day-entry-item'

    const h1 = document.createElement('h1')
    h1.innerHTML = diaryEntry.title

    h1.addEventListener('click', () => viewDiaryModal(diaryEntry))

    const h2 = document.createElement('h2')
    h2.innerHTML = diaryEntry.dateTime
      ? new Date(diaryEntry.dateTime).toLocaleDateString()
      : '(Date not available)'

    if (diaryEntry.filename) {
      const img = document.createElement('img')
      img.src = url + '/' + diaryEntry.filename
      img.alt = diaryEntry.title
    }

    const editBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'

    editBtn.addEventListener('click', () => showEditDiaryModal(diaryEntry))
    // BAKCUP
    /*     editBtn.addEventListener('click', () =>
      showEditDiaryModal(diaryEntry.dayEntryId)
    ) */

    const removeBtn = document.createElement('button')
    removeBtn.innerHTML = 'Remove'

    removeBtn.addEventListener('click', () =>
      showRemoveDiaryModal(diaryEntry.dayEntryId)
    )

    li.appendChild(h1)
    li.appendChild(h2)
    li.appendChild(editBtn)
    li.appendChild(removeBtn)

    diaryList.appendChild(li)
  })
}

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
    console.log(err.message)
  }
}

editForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()
  const fd = new FormData(editForm)

  /*   let data = serializeJson(editForm)

  const mood = Number(
    editForm.querySelector('label input[name = "mood"]:checked').value
  )

  data = { ...data, mood, dayEntryId: Number(editForm.id) } */

  // console.log('What does data look like?', data)
  const options = {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    /*     mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
 */ headers: {
      /*       'Content-Type': 'application/json',
       */ Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    /*     redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
 */ body: fd,

    /*     body: JSON.stringify(data), // body data type must match "Content-Type" header
     */
  }

  console.log(options)
  const response = await fetch(url + '/user/diary', options)
  const json = await response.json()

  editForm.removeAttribute('id')

  closeAllModals()

  console.log('updated response', json)
  getDiaryEntries()
})

getDiaryEntries()
