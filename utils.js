var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

exports.respond = (response, data, statusCode) => {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

exports.actionDispatcher = (actionsHash) => {
  return function(request, response) {
    var action = actionsHash[request.method];
    if (action) {
      action(request, response);
    } else {
      exports.respond(response, '', 404);
    }
  }
};
