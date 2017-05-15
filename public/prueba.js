var $ = window.jQuery
var key = 'apikey=6c1f0554796cc7bb3af7dedb9c17ef34'
var url = 'https://gateway.marvel.com/v1/public/series?title=avengers&apikey=6c1f0554796cc7bb3af7dedb9c17ef34'
Promise.resolve($.get(url))
.then(function (results){
var characters = results.data.results[0].characters.items
var promises = []
for (var i in characters) {
	var character = characters[i]
	var characterUrl = character.resourceURI + '?' + key
	promises.push(Promise.resolve($.get(characterUrl)))
}
	return Promise.all(promises)
})
.then(function (characters){
	debugger
})
.catch(function (err){
	debugger
	console.error(err)
})
