
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

/* API URL */
const url = 'https://api.nookipedia.com/villagers'

/* Fetch method */
async function fetchRandomVillager () {
  const response = await fetch(url, {})
  const data = await response.json()

  console.log(data)
}

/* Render method */
function render(data) {

  // Gender
  dataCard.setAttribute('data-gender', data.gender)

  // Photo
  photo.setAttribute('src', data.nh_details.icon_url ?? data.image_url)
  photo.setAttribute('alt', `${data.name}'s photo`)

  // Profile
  nameTag.innerHTML = data.name
  nameTag.style.color = `#${data.text_color}`
  nameTag.style.backgroundColor = `#${data.title_color}`
  quote.innerHTML = `${data.quote} <em>"${data.phrase}"</em>`

  // Characteristics
  hobbyIcon.setAttribute('data-type', data.nh_details.hobby)
  infoSpecies.innerHTML = data.species
  infoPersonality.innerHTML = data.personality
  infoHobby.innerHTML = data.nh_details.hobby
  infoBirthday.innerHTML = `${data.birthday_month} ${data.birthday_day}`

  // Hide loading
  loading.style.display = 'none';
  // Show content rendered
  content.style.display = 'block';
}

// Sample data - from https://api.nookipedia.com/doc (Villagers section)
const responseSample = [
  {
    "url": "https://nookipedia.com/wiki/Ribbot",
    "name": "Ribbot",
    "alt_name": "",
    "title_color": "bfbfbf",
    "text_color": "5e5e5e",
    "id": "flg01",
    "image_url": "https://dodo.ac/np/images/9/94/Ribbot_NH.png",
    "species": "Frog",
    "personality": "Jock",
    "gender": "Male",
    "birthday_month": "February",
    "birthday_day": "13",
    "sign": "Aquarius",
    "quote": "Never rest, never rust.",
    "phrase": "zzrrbbit",
    "prev_phrases": [
      "toady"
    ],
    "clothing": "Simple Parka",
    "islander": false,
    "debut": "DNM",
    "appearances": [
      "DNM",
      "AC",
      "E_PLUS",
      "WW",
      "CF",
      "NL",
      "WA",
      "NH",
      "HHD",
      "PC"
    ],
    "nh_details": {
      "image_url": "https://dodo.ac/np/images/9/94/Ribbot_NH.png",
      "photo_url": "https://dodo.ac/np/images/0/03/RibbotPicACNH.png",
      "icon_url": "https://dodo.ac/np/images/8/87/Ribbot_NH_Villager_Icon.png",
      "quote": "Never rest, never rust.",
      "sub-personality": "B",
      "catchphrase": "zzrrbbit",
      "clothing": "Simple Parka",
      "clothing_variation": "Light Blue",
      "fav_styles": [
        "Simple",
        "Active"
      ],
      "fav_colors": [
        "Blue",
        "Aqua"
      ],
      "hobby": "Fitness",
      "house_interior_url": "https://dodo.ac/np/images/8/86/House_of_Ribbot_NH.png",
      "house_exterior_url": "https://dodo.ac/np/images/4/42/House_of_Ribbot_NH_Model.png",
      "house_wallpaper": "Circuit-Board Wall",
      "house_flooring": "Future-Tech Flooring",
      "house_music": "K.K. Technopop",
      "house_music_note": ""
      }
  }
]

render(responseSample[0])