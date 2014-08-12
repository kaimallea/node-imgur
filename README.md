## Command-line Usage

### Installation

```bash
npm install imgur -g
```

### Usage

Pass binary image files, urls, and/or base64-encoded image strings as arguments. Globbing is supported.

Upload a single image:

```bash
imgur cat.png
```

Upload all the jpegs in a particular folder:

```bash
imgur ~/Pictures/kittens/*.jpg
```

Upload an image from another place on the web:

```bash
imgur --url http://lolz.pics.com/troll.png
```

Upload a Base-64 encoded image:

```bash
imgur --base64 iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVQ4je2TsQ3CMBBFnxMa08WR2IQKJskIUNwMZAcYwWIQMs65JCUpEEIYW4pJy6v+6e6+/hVnnGsAzsCBMi7AsbbW/rIMsAU2xrnmkeruuzW7zgIw+JGbv6fGQpWzfy3HOsJlDQY/AlCv3jpF9oS5ZBOICKoB1YCIlCdQDR9127qyBHP5Gyw3CBXPr/qi709JHXE1S995AsqoJu8x78GsAAAAAElFTkSuQmCC
```

## Module Usage

### Installation

```bash
npm install imgur
```

### Usage

```javascript
var imgur = require('imgur');

// Set a Client ID for your app
imgur.setClientId('aCs53GSs4tga0ikp');

// Methods return promises
imgur.uploadFile('/home/kai/*.png')
    .then(function(json) {
        console.log(json.data.link);
    })
    .catch(function(err) {
        console.error(err.message);
    });
```