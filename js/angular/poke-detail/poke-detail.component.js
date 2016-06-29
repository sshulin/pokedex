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