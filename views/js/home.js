const url = 'http://localhost:3000' // change url when uploading to server

/* DOM elements */
const diaryList = document.querySelector('#diary-list ul')
const searchForm = document.querySelector('#search-form')

// Backdrop
const backDrop = document.querySelector('.backdrop')

// View diary
const viewModal = document.querySelector('#view-diary-modal')
const closeViewModal = viewModal.querySelector('button[name = "close"')

console.log('closeViewModal', closeViewModal)

// Logout
const logOut = document.querySelector('#logout-anchor')
logOut.addEventListener('click', () => {
  localStorage.removeItem('token')
})

/* END */

/* FUNCTIONS AND LISTENERS */

searchForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()

  const data = serializeJson(searchForm)

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }

  console.log('searchForm data', data)
  console.log('searchForm data', data.search)
  try {
    //console.log(options)
    const response = await fetch(
      url + '/diary/all/search?bytitle=' + data.search,
      options
    )
    const diaryEntries = await response.json()

    console.log('search results', diaryEntries)
    createDiaryListItems(diaryEntries)
  } catch (error) {
    console.log('error.message', error.message)
  }

  console.log('Search button has been clicked')
})

closeViewModal.addEventListener('click', () => {
  closeAllModals()
})

// Close all modals
const closeAllModals = () => {
  backDrop.classList.add('hide')

  viewModal.classList.add('hide')
}

// View diary list item
const viewDiaryModal = (dayEntry) => {
  closeAllModals()

  viewModal.querySelector('.title').innerHTML = dayEntry.title
  viewModal.querySelector('.note-text').innerHTML = dayEntry.noteText

  dayEntry.filename
    ? (viewModal.querySelector('.image').src =
        url + '/thumbnails/' + dayEntry.filename)
    : (viewModal.querySelector('.image').src = '../images/no-image.jpg')

  viewModal.querySelector('.datetime').innerHTML = new Date(
    dayEntry.dateTime
  ).toLocaleDateString('de-FI')
  viewModal.querySelector('.mood').innerHTML = dayEntry.mood
  viewModal.querySelector('.things').innerHTML = dayEntry.things

  viewModal.classList.remove('hide')
  backDrop.classList.remove('hide')
}

// Create diary list item
const createDiaryListItems = (diaryEntries) => {
  diaryList.innerHTML = ''

  diaryEntries.forEach((diaryEntry) => {
    const li = document.createElement('li')
    li.className = 'day-entry-item'

    const div = document.createElement('div')

    const h1 = document.createElement('h1')
    h1.innerHTML = diaryEntry.title
    //h1.addEventListener('click', () => viewDiaryModal(diaryEntry))

    const h2 = document.createElement('h2')
    h2.innerHTML = diaryEntry.dateTime
      ? new Date(diaryEntry.dateTime).toLocaleDateString('de-FI')
      : '(Date not available)'

    const author = document.createElement('h2')
    author.innerHTML = 'Author ' + diaryEntry.username

    if (diaryEntry.filename) {
      const img = document.createElement('img')
      img.src = url + '/thumbnails/' + diaryEntry.filename
      img.alt = diaryEntry.title
    }
    const viewBtn = document.createElement('button')
    viewBtn.className = 'btn'
    viewBtn.innerHTML = 'View'

    viewBtn.addEventListener('click', () => {
      viewDiaryModal(diaryEntry)
    })

    div.appendChild(h1)
    div.appendChild(h2)
    div.appendChild(author)
    li.appendChild(div)

    li.appendChild(viewBtn)
    diaryList.appendChild(li)
  })
}

// Get all public diary entries
const getDiaryEntries = async () => {
  console.log('Get token:', localStorage.getItem('token'))

  try {
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
    const response = await fetch(url + '/diary/all', options)
    const diaryEntries = await response.json()
    createDiaryListItems(diaryEntries)
  } catch (err) {
    console.log('err.message', err.message)
  }
}

/* END */

getDiaryEntries()
