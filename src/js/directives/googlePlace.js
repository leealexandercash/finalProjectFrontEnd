angular.module('finalProject')
.directive('googlePlace', googlePlace);

googlePlace.$inject = ['$window'];

function googlePlace($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      location: '=',
      lat: '=',
      lng: '='
    },
    link: function(scope, element, attrs, model) {
      const options = {
        types: [],
        componentRestrictions: {}
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const latLng = place.geometry.location.toJSON();
        scope.lat = latLng.lat;
        scope.lng = latLng.lng;
        model.$setViewValue(element.val());
      });
    }
  };
}
