
/* Elements */
const dataCard  = document.getElementById('villager-data')
const loading   = document.getElementById('loading')
const content   = document.getElementById('content')
const photo     = document.querySelector('#villager-data .photo img')
const nameTag   = document.querySelector('#villager-data .name')
const quote     = document.querySelector('#villager-data .quote')

const infoSpecies     = document.querySelector('#villager-data .item[data-type="species"] .response > span')
const infoPersonality = document.querySelector('#villager-data .item[data-type="personality"] .response > span')
const infoHobby       = document.querySelector('#villager-data .item[data-type="hobby"] .response > span')
const infoBirthday    = document.querySelector('#villager-data .item[data-type="birthday"] .response > span')

const hobbyIcon = document.querySelector('#villager-data .item[data-type="hobby"] .response > i')

let villagers = []

/* Fetch method */
function fetchAllVillagers () {

  /* API URL */
  const url = 'https://api.nookipedia.com/villagers'
  const apiKey = 'ENTER_KEY_HERE'
  const endpointParams = {
    nhdetails: true
  }

  return fetch(`${ url }?${ (new URLSearchParams( endpointParams )).toString() }`, {
    method: 'GET',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
      'Accept-Version': '1.0.0'
    }
  })
}

/* Render method */
function render(data) {

  // Gender
  dataCard.setAttribute('data-gender', data.gender)

  // Photo
  photo.setAttribute('alt', `${data.name}'s photo`)
  if (data.nh_details) {
    photo.setAttribute('src', data.nh_details.icon_url)
    photo.classList.remove('not-nh')
  } else { // For non-nh villagers
    photo.setAttribute('src', data.image_url)
    photo.classList.add('not-nh') /* Vilagers without NH details need some padding in image */
  }

  // Profile
  nameTag.innerHTML = data.name
  quote.innerHTML = `${data.quote} ${ data.phrase ? `<em>"${data.phrase}"</em>` : ''}`

  nameTag.style.color = data.text_color ? `#${data.text_color}` : 'var(--primary-text)'
  nameTag.style.backgroundColor = data.title_color ? `#${data.title_color}` : 'var(--primary-background)'

  // Characteristics
  hobbyIcon.setAttribute('data-type', (data.nh_details ? data.nh_details.hobby : 'unavailable'))
  infoSpecies.innerHTML = data.species
  infoPersonality.innerHTML = data.personality
  infoHobby.innerHTML = (data.nh_details ? data.nh_details.hobby : '<em class="unavailable">Not specified</em>')
  infoBirthday.innerHTML = (data.birthday_month && data.birthday_day ? `${data.birthday_month} ${data.birthday_day}` : '<em class="unavailable">Unknown</em>')

  // Hide loading
  loading.style.display = 'none';
  // Show content rendered
  content.style.display = 'block';
}

function renderRandomVillager() {

  // Pick one randomly
  const randomIndex = Math.floor(Math.random() * (villagers.length - 1))
  const villager = villagers[randomIndex]
  
  console.log(villager)
  render(villager)
}


/* Initialize */
fetchAllVillagers()
  .then(resp => resp.json())
  .then((data) => {

    villagers = data

    renderRandomVillager()
  })
