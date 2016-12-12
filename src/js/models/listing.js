angular.module('finalProject')
  .factory('Listing', Listing);

Listing.$inject = ['$resource', 'API_URL'];
function Listing($resource, API_URL) {
  return new $resource(`${API_URL}/listings/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
