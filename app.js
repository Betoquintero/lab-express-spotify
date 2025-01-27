require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');

// require spotify-web-api-node package here:

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

    app.get('/', (req, res, next) => {
        res.render('index');
      })

    app.get('/artist-search', (req, res, next) => {
    const artist = req.query;
    //res.json(res.data)
    spotifyApi
    .searchArtists(`${artist}`)
    .then(data => {
    //console.log('The received data from the API: ', data.body.artists);
    res.render('artist-search-results', data.body.artists);  
  })
    .catch(err => console.log('The error while searching artists occurred: ', err));
  })

  app.get('/albums/:id', (req, res, next) => {    
    //res.json(res.data)
    spotifyApi
    .getArtistAlbums(req.params.id)
    .then(data => {
    //console.log('The received data from the API: ', data.body);
    res.render('albums', data.body);  
  })
    .catch(err => console.log('The error while searching artists occurred: ', err));
  })

  app.get('/tracks/:id', (req, res, next) => {    
    //res.json(res.data)
    spotifyApi
    .getAlbumTracks(req.params.id)
    .then(data => {
    //console.log('The received data from the API: ', data.body);
    res.render('tracks', data.body);  
  })
    .catch(err => console.log('The error while searching artists occurred: ', err));
  })


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
