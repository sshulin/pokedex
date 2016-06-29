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