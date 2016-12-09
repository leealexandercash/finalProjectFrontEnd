angular.module('finalProject')
.controller('PlacesIndexController', PlacesIndexController);

PlacesIndexController.$inject = ['Place'];
function PlacesIndexController(Place) {
  const placesIndex = this;

  placesIndex.all = Place.query();

}

PlacesShowController.$inject = ['Place', '$state'];
function PlacesShowController(Place, $state) {
  const placesShow = this;

  placesShow.user = Place.get($state.params);

  function deletePlace() {
    placesShow.user.$remove(() => {
      $state.go('placesIndex');
    });
  }

  placesShow.delete = deletePlace;

  function isCurrentPlace() {
    return placesShow.user.id === placesShow.currentPlaceId;
  }

  placesShow.isCurrentPlace = isCurrentPlace();

}

PlacesEditController.$inject = ['Place', '$state'];
function PlacesEditController(Place, $state) {
  const placesEdit = this;

  placesEdit.user = Place.get($state.params);

  function update() {
    placesEdit.user.$update(() => {
      $state.go('placesShow', $state.params);
    });
  }

  this.update = update;

  function logout() {
    localStorage.removeItem('token');
    $state.go('login');
  }
  placesEdit.logout = logout;

}
