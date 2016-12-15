angular.module('finalProject')
.directive('googleMap', googleMap);

googleMap.$inject = ['$window'];

function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">Google Map Here</div>',
    scope: {
      places: '=',
      place: '='
    },
    link: function ($scope, element) {

      const map = new $window.google.maps.Map(element[0], {
        center: {
          lat: 51.51522,
          lng: -0.07214
        },
        zoom: 17
      });

      $scope.$watch('place.$resolved', () => {
        if($scope.place.lat && $scope.place.lng) {
          const pos = {
            lat: $scope.place.lat,
            lng: $scope.place.lng
          };

          map.setCenter(pos);
          map.setZoom(18);

          new $window.google.maps.Marker({
            position: pos,
            map: map,
            animation: $window.google.maps.Animation.DROP
          });
        }
      });

      $scope.$watch('places.length', () => {

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
            map.setZoom(17);
          });
        }

        if($scope.places.length > 0) {

          $scope.places.forEach((place) => {

            if(place.listings.length > 0) {
              const marker = new $window.google.maps.Marker({
                position: { lat: place.lat, lng: place.lng },
                map: map,
                animation: $window.google.maps.Animation.DROP
              });

              const infowindow = new $window.google.maps.InfoWindow({
                content: `<div>${ place.name }</div>
                <a href="../#/places/${ place.id }">Click To View Listings For <br> ${ place.name }</a>`
              });
              map.setZoom(17);
              marker.addListener('click', function() {
                infowindow.open(map,marker);
              });
            }
          });
        }
      });
    }
  };
}
