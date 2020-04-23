'use strict'

const url = 'http://localhost:3000'

const ul = document.querySelector('ul')

const getUsers = async (id) => {
  const response = await fetch(url + '/user')
  const users = await response.json()

  console.log(users)
  console.log(users[0].firstName)

  for (const user of users) {
    ul.innerHTML += `
    <li>
      <h2>${user.firstName} ${user.lastName}</h2>
      <h3>Tietoja</h3>
      <ul>
        <li>Sukupuoli: ${user.sex}</li>
        <li>Syntymäaika: ${new Date(user.birthDate).toLocaleString('fi')}</li>
        <li>Kaupunki: ${user.city}</li>
        <li>Katuosoite: ${user.streetAddress}</li>
        <li>Postiosoite: ${user.postCode}</li>
        <li>Maa: ${user.country}</li>
      </ul>
    </li>
    `
  }
  /*   const response = await fetch(url + '/user' + id)

  const user = await response.json()
  return use */
}

getUsers();
