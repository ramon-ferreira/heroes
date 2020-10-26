module.exports = function (request, response, next) {
  const md5 = require("crypto-js/md5");
  const fetch = require("node-fetch");
  const apiPath = "https://gateway.marvel.com:443/v1/public";

  /** Encode Marvel authentication string */
  function getAuthString() {
    const timeStamp = Date.now();
    const apiKeyPriv = "-";
    const apiKeyPub = "-";
    const apiHash = md5(timeStamp + apiKeyPriv + apiKeyPub);

    return `ts=${timeStamp}&apikey=${apiKeyPub}&hash=${apiHash}`;
  }

  /** API routes */
  const getHeroes = async () => {
    const marvelResult = await fetch(
      `${apiPath}/characters?${getAuthString()}`
    ).then((result) => result.json());

    return response.json(marvelResult);
  };

  /** Mini API middleware */
  const { method, url: requestUrl } = request;
  const apiRoutes = {
    "/heroes": {
      get: getHeroes,
    },
  };

  if (apiRoutes.hasOwnProperty(requestUrl)) {
    const logApiRequest = `[API Request][${method}] ${requestUrl}`;
    console.log(logApiRequest);

    return apiRoutes[requestUrl][method.toLowerCase()]();
  }

  return next();
};
