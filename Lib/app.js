var $ = window.jQuery
var MarvelApi = window.MarvelApi
var key = '6c1f0554796cc7bb3af7dedb9c17ef34'
var api = new MarvelApi(key)
api.findSeries('avengers')
.then((serie) => {
  let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`
  $('.Layout').css('background-image', serieImage)
var characters = serie.characters.items
var promises = []
for (let character of characters) {
  let promise = api.getResourceURI(character.resourceURI)
  promises.push(promise)
}
return Promise.all(promises)
})
.then((characters) =>{
  return characters.filter((character) => {
    return !!character.thumbnail 
  })
})

  .then((characters) => {

  characters = shuffle(characters)
  for (let i=0; i <5; i++) {
    let character = characters[i]
    let template = renderCharacter(character)
    let $Card = $(template)
    $('.Battle-player').append($Card)
    $Card.on('click', function (event){
        let $this = $(this)
        let attack = $this.find('.Card-attack')
        console.log(attack.data('attack'))
  })
  
  }

    
 })
  .catch((err) => {
  console.error(err)
  })

function renderCharacter (character) {
  let attackPoints = Math.ceil(Math.random() * 500) + 500
  return `
  <div class="Card"><h2 class="Card-name">${character.name}</h2><img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="Wolverine" class="Card-image"/>
  <div class="Card-description">${character.description}</div>
  <div class="Card-attack" data-attack="${attackPoints}">${attackPoints} puntos de ataque</div>
  </div>`

}

function shuffle (arr) {
  for (var i = 0; i < arr.length; i++) {
  let tmp = arr[i]
  let index = Math.floor(Math.random() * arr.length - 1) 
  arr[i] = arr[index]
  arr[index] = tmp
  }
  return arr
} 