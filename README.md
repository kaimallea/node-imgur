## Installation

    npm install -g imgur

## Command-line Usage

*You must set your API key before command-line use (quickly get one at http://imgur.com/register/api_anon)*


Set your API key once and forget it (saved to ~/.imgurkey)

    imgur -k aCs53GSs4tga0ikp

Upload a single image

    imgur GooglePlus.png

Upload an entire directory (*not recursive yet*; automatically chooses pics)

    imgur ~/Pictures/

Upload all .png files in the current directory

    imgur *.png
    

## Module Usage

```javascript
var imgur = require('imgur');

// API key for 'anonymous API' is required
imgur.setKey('aCs53GSs4tga0ikp');

// Upload a picture of my cat
imgur.upload('/home/kai/cat.png', function (response) {
    console.log('Direct link: ' + response.links.original);
    console.log('Imgur page: ' + response.links.imgur_page);
});
```
