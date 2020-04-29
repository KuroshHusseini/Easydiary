'use strict'

const url = 'http://localhost:3000'

/* DOM elements */
const statsList = document.querySelector('#stats-list')

/* END */

// Fetch user day entries
const fetchDayEntries = async () => {
  {
    console.log('Get token:', localStorage.getItem('token'))

    try {
      const options = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
      const response = await fetch(url + '/diary/user', options)
      const diaryEntries = await response.json()

      console.log('diaryEntries', diaryEntries)
      createStatistics(diaryEntries)
      //createDiaryListItem(diaryEntries)
    } catch (err) {
      console.log(err.message)
    }
  }
}

const createStatistics = (diaryEntries) => {
  const SUM_MOOD = diaryEntries.reduce((a, b) => ({ mood: a.mood + b.mood }))
    .mood
  const COUNT_MOOD = diaryEntries.length
  const AVERAGE_MOOD = Number(SUM_MOOD / COUNT_MOOD).toFixed(2)

  console.log(SUM_MOOD, COUNT_MOOD)
  console.log('AVERAGE_MOOD', AVERAGE_MOOD)

  // Min
  const MIN_MOOD = diaryEntries.reduce(
    (min, p) => (p.mood < min ? p.mood : min),
    diaryEntries[0].mood
  )
  console.log('MIN MOOD', MIN_MOOD)

  // Max
  const MAX_MOOD = diaryEntries.reduce(
    (min, p) => (p.mood > min ? p.mood : min),
    diaryEntries[0].mood
  )

  statsList.innerHTML += `
  <li>Avg. ${AVERAGE_MOOD} / 5.0</li>
  <li>Min. ${MIN_MOOD}</li>
  <li>Max. ${MAX_MOOD}</li>
  `
  console.log('MAX MOOD', MAX_MOOD)

  // GOOGLE CHARTS
  /* 
  google.load('visualization', '1')
  // char libraries!
  google.setOnLoadCallback(drawVisualization)

  function drawVisualization() {
    var wrapper = new google.visualization.ChartWrapper({
      chartType: 'BarChart',
      dataTable: [
        ['Country', 'Value'],
        ['Germany', 700],
        ['USA', 300],
      ],
      options: { title: 'Countries' },
      containerId: 'vis_div',
    })
    wrapper.draw()
  } */
  google.charts.load('current', { packages: ['corechart', 'line'] })
  google.charts.setOnLoadCallback(drawBackgroundColor)

  function drawBackgroundColor() {
    var data = new google.visualization.DataTable()
    data.addColumn('number', 'X')
    data.addColumn('number', 'Mood')

    const moodStats = diaryEntries.map((entry, index) => {
      console.log('entry.mood', entry.mood)

      return [index, entry.mood]
    })

    console.log('moodStats', moodStats)

    data.addRows(moodStats)

    var options = {
      hAxis: {
        title: 'Days',
      },
      vAxis: {
        title: 'Mood ratio',
      },
      colors: ['#1976d2'],
      backgroundColor: '#f1f8e9',
    }

    var chart = new google.visualization.LineChart(
      document.getElementById('chart_div')
    )
    chart.draw(data, options)
  }
}

fetchDayEntries()
