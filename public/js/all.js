// Define the 'pokeList' module
angular.module('pokeList', []);
// Register the 'pokeList' component on the 'pokeList' module,
angular.
	module('pokeList').
		component('pokeList', {
			templateUrl: 'js/angular/poke-list/poke-list.template.html',
			controller: ['$http', 
				function PokeListController($http) {
					var self = this;
					self.orderProp = "id";
					self.types = [
						'bug',
						'dragon',
						'electric',
						'fairy',
						'fire',
						'flying',
						'grass',
						'ground',
						'normal',
						'poison',
						'water'
					];
					$http.get('js/angular/pokemons.json').then(function(response) {
						self.pokemons = response.data;
					})
				}
			]
		});
// Define module 
angular.module('pokeApp', [
	// ... which depends on the 'pokeList' module
	'pokeList'
	]);