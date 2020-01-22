const path = require('path');
const express = require('express');
const app = express();
app.set('etag', false)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  next()
})
app.use(express.static(__dirname + '/public', {
  index: false, 
  immutable: true, 
  cacheControl: false,
  maxAge: "30d"
}))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
app.listen(8080, () => console.log('listening on port 8080'));
