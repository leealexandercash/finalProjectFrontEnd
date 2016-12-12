angular.module('finalProject')
.controller('PlacesIndexController', PlacesIndexController)
.controller('PlacesShowController', PlacesShowController)
.controller('PlacesNewController', PlacesNewController);

PlacesIndexController.$inject = ['Place'];
function PlacesIndexController(Place) {
  const placesIndex = this;

  placesIndex.all = Place.query();
}

PlacesShowController.$inject = ['Place', '$state', 'Listing'];
function PlacesShowController(Place, $state, Listing) {
  const placesShow = this;

  placesShow.place = Place.get($state.params);

  function deletePlace() {
    placesShow.place.$remove(() => {
      $state.go('placesIndex');
    });
  }

  function deleteListing(listing) {
    console.log(listing);
    Listing.listing.remove(() => {
      $state.go('listingsIndex');
    });
  }

  placesShow.deleteListing = deleteListing;
  placesShow.delete = deletePlace;
}

PlacesEditController.$inject = ['Place', '$state'];
function PlacesEditController(Place, $state) {
  const placesEdit = this;

  placesEdit.place = Place.get($state.params);

  function update() {
    placesEdit.place.$update(() => {
      $state.go('placesShow', $state.params);
    });
  }
  placesEdit.update = update;
}

PlacesNewController.$inject = ['Place', '$state'];
function PlacesNewController(Place, $state) {
  const placesNew = this;

  placesNew.place = {};

  function submit() {
    Place.save(placesNew.place, (place) => {
      console.log('gets here!');
      $state.go('listingsNew', { placeId: place.id });
    });
  }
  placesNew.submit = submit;
}
