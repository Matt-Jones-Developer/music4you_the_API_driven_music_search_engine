// Search English Wikipedia for 10 articles about Earth

let url = 'https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=earth&limit=10';
let response = await fetch(url,
  {
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      'Api-User-Agent': 'YOUR_APP_NAME (YOUR_EMAIL_OR_CONTACT_PAGE)'
    }
  }
);
response.json()
  .then(console.log).catch(console.error);

  // search term url endpoint
 // /core/v1/{project}/{language}/search/page?q=search terms

// //  Request an access token using a client ID and secret
// curl -X POST -F 'grant_type=client_credentials' \
// -F 'client_id=40736fd6fadb2d9f4563d29b105788eb' \
// -F 'client_secret=9753939a04553de256b898ae5bf07485e01acd94' \
// https://meta.wikimedia.org/w/rest.php/oauth2/access_token


// https://meta.wikimedia.org/w/rest.php/oauth2/authorize?client_id=40736fd6fadb2d9f4563d29b105788eb&response_type=code