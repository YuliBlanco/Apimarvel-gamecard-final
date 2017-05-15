var $ = window.jQuery
var MarvelApi = window.MarvelApi
var key = '6c1f0554796cc7bb3af7dedb9c17ef34'
var api = new MarvelApi(key)
api.findSeries('avengers')
.then((results) => {
	debugger
var characters = results.data.results[0].characters.items
var promises = []
for (var i in characters) {
	var character = characters[i]
	var characterUrl = `${character.resourceURI}?${key}`
	promises.push(Promise.resolve($.get(characterUrl)))
}
return Promise.all(promises)
.then((characters) => {
	console.log(characters)
})
.catch((err) => {
	debugger
	console.error(err)
})
})