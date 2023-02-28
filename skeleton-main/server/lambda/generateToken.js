const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  console.log('event: ', JSON.stringify(event));

  let statusCode;
  let body;

  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const PRIVATE_KEY = 'lambda';

    const payload = event.queryStringParameters;

    const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: '1h' });

    statusCode = 200;
    body = JSON.stringify({ token });
  } catch (e) {
    console.error(e);

    statusCode = 400;
    body = JSON.stringify({ message: 'invalid value' });
  } finally {
    return {
      statusCode,
      body,
      headers,
    };
  }
};
