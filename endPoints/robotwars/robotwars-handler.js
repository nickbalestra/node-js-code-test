var utils = require('../../utils');
var queryString = require('query-string');
var robot = require('./robotwars-logic');


var actions = {
    'GET': (request, response) => {
      var input = queryString.parse(queryString.extract(request.url));
      var output = { results: robot(input.data) };
      utils.respond(response, output);
    }
};

exports.requestHandler = utils.actionDispatcher(actions);
