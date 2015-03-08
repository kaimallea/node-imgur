## Command-line Usage

### Installation

```bash
npm install imgur -g
```

### Usage

Pass binary image files, urls, and/or [base64-encoded](http://en.wikipedia.org/wiki/Base64) image strings as arguments. Globbing is supported.

Upload a single image:

```bash
imgur cat.png
```

Upload multiple images ([globbing](http://en.wikipedia.org/wiki/Glob_(programming)) supported):

```bash
imgur cat.png cats.gif cats23.jpg

imgur ~/*.(jpg|png|gif)

imgur ~/Pictures/kittens/*.jpg ~/gifs/sfw/*.gif
```

Upload an image from another place on the web. Be sure to include http(s):

```bash
imgur --url https://octodex.github.com/images/topguntocat.png
```

Upload a Base-64 encoded image:

```bash
imgur --base64 iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVQ4je2TsQ3CMBBFnxMa08WR2IQKJskIUNwMZAcYwWIQMs65JCUpEEIYW4pJy6v+6e6+/hVnnGsAzsCBMi7AsbbW/rIMsAU2xrnmkeruuzW7zgIw+JGbv6fGQpWzfy3HOsJlDQY/AlCv3jpF9oS5ZBOICKoB1YCIlCdQDR9127qyBHP5Gyw3CBXPr/qi709JHXE1S995AsqoJu8x78GsAAAAAElFTkSuQmCC
```

Saving a client id for subsequent use:

```bash
imgur --save f9ae01148b53261
```

Display saved client id:

```bash
imgur --show
```

Remove previously saved client id:

```bash
imgur --clear
```

Use a specific client id one time only (overrides saved id):

```bash
imgur --client-id f9ae01148b53261 --file ~/me.jpg

# Short-hand
imgur -c f9ae01148b53261 -f ~/me.jpg
```

Add images to an existing album by specifying an album ID:

```bash
imgur --album-id F8KTV --file ~/me.jpg

# Short-hand
imgur -a F8KTV ~/me.jpg
```

You must own the album. If it's an anonymous album you need to use the `deletehash` in place of the album ID.

## Module Usage

### Installation

```bash
npm install imgur
```

### Usage

#### Requiring the module:

```javascript
var imgur = require('imgur');
```

#### Dealing with client IDs:

```javascript
// Setting
imgur.setClientId('aCs53GSs4tga0ikp');

// Getting
imgur.getClientId();

// Saving to disk. Returns a promise.
// NOTE: path is optional. Defaults to ~/.imgur
imgur.saveClientId(path)
    .then(function () {
        console.log('Saved.');
    })
    .catch(function (err) {
        console.log(err.message);
    });


// Loading from disk
// NOTE: path is optional. Defaults to ~/.imgur
imgur.loadClientId(path)
    .then(imgur.setClientId);
```

#### Uploading files; globbing supported:

```javascript
// A single image
imgur.uploadFile('/home/kai/kittens.png')
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });

// All jpegs in a specific folder
// to an album you own
var albumId = 'F8KTV';
imgur.uploadFile('/home/kai/*.jpg', albumId)
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });

// Multiple image types from home folder
imgur.uploadFile('~/*.(jpg|png|gif)')
    .then(function(json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });
```

#### Fetching image data:

```javascript
var kittenPic = 'mbgq7nd';
imgur.getInfo(kittenPic)
    .then(function(json) {
        console.log(json);
    })
    .catch(function (err) {
        console.error(err.message);
    });

```

#### Fetching album data:

```javascript
var kittenAlbum = 'mbgq7nd';
imgur.getAlbumInfo(kittenAlbum)
    .then(function(json) {
        console.log(json);
    })
    .catch(function (err) {
        console.error(err.message);
    });

```

#### Creating an album:

```javascript
imgur.createAlbum()
    .then(function(json) {
        console.log(json);
    })
    .catch(function (err) {
        console.error(err.message);
    });

```

#### Uploading URLs of images hosted elsewhere:

```javascript
// Include http(s) when specifying URLs
imgur.uploadUrl('https://octodex.github.com/images/topguntocat.png')
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });
```

#### Uploading Base-64 encoded images:

```javsacript
var imgurFavicon = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVQ4je2TsQ3CMBBFnxMa08WR2IQKJskIUNwMZAcYwWIQMs65JCUpEEIYW4pJy6v+6e6+/hVnnGsAzsCBMi7AsbbW/rIMsAU2xrnmkeruuzW7zgIw+JGbv6fGQpWzfy3HOsJlDQY/AlCv3jpF9oS5ZBOICKoB1YCIlCdQDR9127qyBHP5Gyw3CBXPr/qi709JHXE1S995AsqoJu8x78GsAAAAAElFTkSuQmCC';

imgur.uploadBase64(imgurFavicon)
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });
```

## License

#### MIT
