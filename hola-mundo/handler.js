'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hola ${event.pathParameters.name}`,
      input: event.name,
    }),
  };
};


module.exports.showUser = async (event, context) => {
  const body = URLSearchParams.parse(event['body']);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Petición POST`,
      input: `Hola ${body.name} ${body.lastname}`,
    }),
  };
};
