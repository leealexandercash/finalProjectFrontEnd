angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })

    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })

    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })

    .state('placesIndex', {
      url: '/places',
      templateUrl: '/templates/placesIndex.html',
      controller: 'PlacesIndexController as placesIndex'
    })

    .state('placesNew', {
      url: '/places/new',
      templateUrl: '/templates/placesNew.html',
      controller: 'PlacesNewController as placesNew'
    })

    .state('listingsNew', {
      url: '/places/:placeId/listings/new',
      templateUrl: '/templates/listingsNew.html',
      controller: 'ListingsNewController as listingsNew'
    })

    .state('placesShow', {
      url: '/places/:id',
      templateUrl: '/templates/placesShow.html',
      controller: 'PlacesShowController as placesShow'
    })

    .state('listingsIndex', {
      url: '/listings',
      templateUrl: '/templates/listingsIndex.html',
      controller: 'ListingsIndexController as listingsIndex'
    })

    .state('listingsEdit', {
      url: '/listings/:id/edit',
      templateUrl: '/templates/listingsEdit.html',
      controller: 'ListingsEditController as listingsEdit'
    })

    .state('listingsShow', {
      url: '/listings/:id',
      templateUrl: '/templates/listingsShow.html',
      controller: 'ListingsShowController as listingsShow'
    });


  $urlRouterProvider.otherwise('/places');
}
