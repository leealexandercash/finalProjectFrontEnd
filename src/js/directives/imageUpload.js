angular.module('finalProject')
  .directive('imageUpload', imageUpload);

function imageUpload () {

  const reader = new FileReader();

  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/templates/imageUpload.html',
    link($scope, element) {

      $scope.base64String = null;
      $scope.active = false;

      reader.onload = () => {
        $scope.base64String = reader.result;
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

          const file = (e.target.files || e.dataTransfer.files)[0];

          reader.readAsDataURL(file);
        });
    }
  };
}
