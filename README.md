## Installation

```shell
npm install imgur
```

## Usage

### Import and instantiate with credentials:

```ts
// ESModule
import { ImgurClient } from 'imgur';

// CommonJS
const { ImgurClient } = require('imgur');

let client;

// if you already have an access token acquired
client = new ImgurClient({ accessToken: process.env.ACCESS_TOKEN });

// or your client ID
client = new ImgurClient({ clientId: process.env.CLIENT_ID });

// or your username/password/client id to retrieve an access token automatically:
client = new ImgurClient({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  clientId: process.env.CLIENT_ID,
});
```

If you don't have any credentials, you'll need to:

1. [Create an Imgur account](https://imgur.com/register)
1. [Register an application](https://api.imgur.com/#registerapp)

### Upload one or more images and videos

You can upload one or more files by simply passing a path to a file or array of paths to multiple files.

```ts
// a single image via an absolute path
const response = await client.upload('/home/kai/dank-meme.jpg');
console.log(response.link);

// multiple images via an array of absolute paths
const responses = await client.upload([
  '/home/kai/dank-meme.jpg',
  '/home/kai/another-dank-meme',
]);
responses.forEach((r) => console.log(r.link));
```

If you want to provide metadata, such as a title, description, etc., then pass an object instead of a string:

```ts
// a single image via an absolute path
const response = await client.upload({
  image: '/home/kai/dank-meme.jpg',
  title: 'Meme',
  description: 'Dank Meme',
});
console.log(response.link);

// multiple images via an array of absolute paths
const responses = await client.upload([
  {
    image: '/home/kai/dank-meme.jpg',
    title: 'Meme',
    description: 'Dank Meme',
  },
  {
    image: '/home/kai/cat.mp4',
    title: 'A Cat Movie',
    description: 'Caturday',
  },
]);
responses.forEach((r) => console.log(r.link));
```

Acceptable key/values match what [the Imgur API expects](https://apidocs.imgur.com/#c85c9dfc-7487-4de2-9ecd-66f727cf3139):

| Key             | Description                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `image`         | A binary file, base64 data, or a URL for an image. (up to 10MB)                                                                     |
| `video`         | A binary file (up to 200MB)                                                                                                         |
| `album`         | The id of the album you want to add the image to. For anonymous albums, album should be the deletehash that is returned at creation |
| `type`          | The type of the file that's being sent; `file`, `base64` or `url`                                                                   |
| `name`          | The name of the file. This is automatically detected, but you can override                                                          |
| `title`         | The title of the image                                                                                                              |
| `description`   | The description of the image                                                                                                        |
| `disable_audio` | `1` will remove the audio track from a video file                                                                                   |

### Upload and track progress of uploads

Instances of `ImgurClient` emit `uploadProgress` events so that you can track progress

```ts
import { ImgurClient } from 'imgur';

const client = new ImgurClient({ accessToken: process.env.ACCESS_TOKEN });

client.on('uploadProgress', (progress) => console.log(progress));
```

The progress object looks like the following:

```ts
{
  percent: 1,
  transferred: 577,
  total: 577,
  id: '/home/user/trailer.mp4'
}
```

| Key           | Description                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------- |
| `percent`     | 0 to 1, measures the percentage of upload (e.g., 0, 0.5, 0.8, 1)                              |
| `transferred` | total number of bytes transferred thus far                                                    |
| `total`       | total number of bytes to be transferred                                                       |
| `id`          | unique id for the media being transferred; useful when uploading multiple things concurrently |
