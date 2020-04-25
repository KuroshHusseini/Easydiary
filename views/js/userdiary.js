'use strict'

const url = 'http://localhost:3000' // change url when uploading to server

const diaryList = document.querySelector('#diary-list ul')

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

const editDiary = (id) => {}

const publishDiary = () => {}

const createDiaryListItem = (diaryEntries) => {
  diaryEntries.forEach((diaryEntry) => {
    diaryList.innerHTML += `
  <li>
    <h1>${diaryEntry.title}</h1>
    <p>${diaryEntry.dateTime}</p>
    <p>${diaryEntry.mood}</p>
    <button onclick${editDiary(diaryEntry.diaryEntryId)}>Edit</button>
    <button onclick=${publishDiary(diaryEntry.diaryEntryId)}>Publish</button>
    
  </li>
    `
  })
}
