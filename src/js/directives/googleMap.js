angular.module('finalProject')
.directive('googleMap', googleMap);

googleMap.$inject = ['$window'];

function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">Google Map Here</div>',
    scope: {
      places: '='
    },
    link: function ($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        center: {
          lat: 51.5087903,
          lng: -0.1137814
        },
        zoom: 14
      });

      $scope.$watch('places.length', () => {
        if($scope.places.length > 0) {
          $scope.places.forEach((place) => {
            new $window.google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              map: map,
              animation: $window.google.maps.Animation.DROP
            });

          });
        }
      });

      // Try HTML5 geolocation else put the user in central London.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          map.setZoom(18);
        });
      }

    }
  };
}
