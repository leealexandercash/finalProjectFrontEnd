angular.module('finalProject')
  .directive('imageUpload', imageUpload);

imageUpload.$inject = ['$window'];
function imageUpload ($window) {

  const reader = new FileReader();

  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/templates/imageUpload.html',
    scope: {
      base64: '='
    },
    link($scope, element) {
      $scope.isMobile = (('ontouchstart' in $window)||($window.navigator.maxTouchPoints > 0)||($window.navigator.msMaxTouchPoints > 0));

      function parseFile(e) {
        const file = (e.target.files || e.dataTransfer.files)[0];
        reader.readAsDataURL(file);
      }

      $scope.base64 = null;
      $scope.active = false;

      reader.onload = () => {
        $scope.base64 = reader.result;
        $scope.$apply();
      };

      element
        .on('dragover', () => {
          $scope.active = true;
          $scope.$apply();
        })
        .on('dragover', (e) => {
          e.preventDefault();
        })
        .on('dragleave', () => {
          $scope.active = false;
          $scope.$apply();
        })
        .on('drop', (e) => {
          e.preventDefault();

          parseFile(e);
        });

      angular.element(document).ready(function() {
        const fileInput = angular.element(element[0].querySelector('input[type="file"]'));

        if(fileInput) {
          fileInput.on('change', (e) => {
            parseFile(e);
          });
        }
      });
    }
  };
}
