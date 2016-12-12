angular.module('finalProject')
.controller('ListingsIndexController', ListingsIndexController)
.controller('ListingsShowController', ListingsShowController)
.controller('ListingsNewController', ListingsNewController)
.controller('ListingsEditController', ListingsEditController);

ListingsIndexController.$inject = ['Listing'];

function ListingsIndexController(Listing) {
  const listingsIndex = this;

  listingsIndex.all = Listing.query();
}

ListingsShowController.$inject = ['Listing', '$state'];
function ListingsShowController(Listing, $state) {
  const listingsShow = this;

  listingsShow.listing = Listing.get($state.params);

  function deleteListing() {
    listingsShow.listing.$remove(() => {
      $state.go('listingsIndex');
    });
  }
  listingsShow.delete = deleteListing;
}

ListingsEditController.$inject = ['Listing', '$state'];
function ListingsEditController(Listing, $state) {
  const listingsEdit = this;
  listingsEdit.listing = Listing.get($state.params);

  function update() {
    listingsEdit.listing.$update((listing) => {
      $state.go('placesShow', { id: listing.place.id });
    });
  }
  listingsEdit.update = update;
}

ListingsNewController.$inject = ['Listing', '$state'];
function ListingsNewController(Listing, $state) {
  const listingsNew = this;

  listingsNew.listing = {
    place_id: $state.params.placeId
  };

  function submit() {
    Listing.save(listingsNew.listing, (listing) => {
      $state.go('placesShow', { id: listing.place.id });
    });
  }
  listingsNew.submit = submit;
}
