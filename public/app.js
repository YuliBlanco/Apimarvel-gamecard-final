'use strict';

var $ = window.jQuery;
var MarvelApi = window.MarvelApi;
var key = '6c1f0554796cc7bb3af7dedb9c17ef34';
var api = new MarvelApi(key);
api.findSeries('avengers').then(function (serie) {
  var serieImage = 'url(' + serie.thumbnail.path + '.' + serie.thumbnail.extension + ')';
  $('.Layout').css('background-image', serieImage);
  var characters = serie.characters.items;
  var promises = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = characters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var character = _step.value;

      var promise = api.getResourceURI(character.resourceURI);
      promises.push(promise);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Promise.all(promises);
}).then(function (characters) {
  return characters.filter(function (character) {
    return !!character.thumbnail;
  });
}).then(function (characters) {

  characters = shuffle(characters);
  for (var i = 0; i < 5; i++) {
    var character = characters[i];
    var template = renderCharacter(character);
    var $Card = $(template);
    $('.Battle-player').append($Card);
    $Card.on('click', function (event) {
      var $this = $(this);
      var attack = $this.find('.Card-attack');
      console.log(attack.data('attack'));
    });
  }
}).catch(function (err) {
  console.error(err);
});

function renderCharacter(character) {
  var attackPoints = Math.ceil(Math.random() * 500) + 500;
  return '\n  <div class="Card"><h2 class="Card-name">' + character.name + '</h2><img src="' + character.thumbnail.path + '.' + character.thumbnail.extension + '" alt="Wolverine" class="Card-image"/>\n  <div class="Card-description">' + character.description + '</div>\n  <div class="Card-attack" data-attack="' + attackPoints + '">' + attackPoints + ' puntos de ataque</div>\n  </div>';
}

function shuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var tmp = arr[i];
    var index = Math.floor(Math.random() * arr.length - 1);
    arr[i] = arr[index];
    arr[index] = tmp;
  }
  return arr;
}