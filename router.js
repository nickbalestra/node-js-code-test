var url = require('url');
var utils = require('./utils');


// The routes hash, maps registered endpoint URLs
// with their relative handler modules.
var routes = {
  '/robotwars' : require('./endPoints/robotwars/robotwars-handler')
};

// The router module check the url of the request
// against the routes hash and route the request to its
// relative handler. If the requested endpoint
// isn't a valid registered route a 404
// reponse will be sent back instead.
module.exports = function(request, response) {
  var routeHandler = routes[url.parse(request.url).pathname];

  if (routeHandler){
    routeHandler.requestHandler(request, response);
  } else {
    utils.respond(response, 'Oups', 404);
  }
};
