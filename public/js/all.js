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
// Define the 'pokeList' module
angular.module('pokeDetail', [
	'ngRoute'
	]);
// Register the 'pokeList' component on the 'pokeList' module,
angular.
	module('pokeDetail').
		component('pokeDetail', {
			templateUrl: 'js/angular/poke-detail/poke-detail.template.html',
			controller: ['$http', '$routeParams', 
				function PokeDetailController($http, $routeParams) {
					var self = this;
					this.pokeName = $routeParams.pokeName;

					$http.get('pokemons/' + $routeParams.pokeName + '.json').then(function(response){
						self.pokemon = response.data;
					})
				}
			]
		});
// Define module 
angular.module('pokeApp', [
	// ... which depends on the 'pokeList' module
	'ngRoute',
	'pokeList',
	'pokeDetail'
	]);
angular.
	module('pokeApp').
		config(['$locationProvider', '$routeProvider', 
			function config($locationProvider, $routeProvider) {
				$locationProvider.hashPrefix('!');

				$routeProvider.
					when('/pokemons', {
						template: '<poke:list></poke:list>'
					}).
					when('/pokemons/:pokeName', {
						template: '<poke:detail></poke:detail>'
					}).
					otherwise('/pokemons');
			}
			]);