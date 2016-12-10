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
    listingsEdit.listing.$update(() => {
      $state.go('listingsShow', $state.params);
    });
  }

  listingsEdit.update = update;

}

ListingsNewController.$inject = ['Listing', '$state'];
function ListingsNewController($listing, $state) {
  const listingsNew = this;

  listingsNew.listing = {};

  function submit() {
    $listing.create($state.params)
      .then(() => {
        $state.go('listingsIndex');
      });
  }

  listingsNew.submit = submit;
}
