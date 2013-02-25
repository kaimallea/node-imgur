## Installation

    npm install -g imgur

## Command-line Usage

**You must set an API key before CLI use; get one at http://imgur.com/register/api_anon**


Set your API key once and forget it (saved to ~/.imgurkey)

    imgur -k aCs53GSs4tga0ikp

Upload a single image

    imgur GooglePlus.png

Upload an entire directory (**not recursive yet**; automatically chooses pics)

    imgur ~/Pictures/

Upload all .png files in the current directory

    imgur *.png
    

## Module Usage

```javascript
var imgur = require('imgur');

imgur.setKey('aCs53GSs4tga0ikp');

imgur.upload('/Users/kmallea/Pictures/Manga_Kai.jpg', function (response) {
    
    if (response.error) {
        console.log(response.error);
        return;
    }
    
    console.log('Direct link: ' + response.links.original);
    console.log('Imgur page: ' + response.links.imgur_page);
});
```
## Contributors

Helge S. Holm (https://github.com/deestan)

