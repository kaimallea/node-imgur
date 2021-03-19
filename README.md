### Installation

```shell
npm install imgur
```

### Usage

Require and instantiate with credentials:

```ts
import { ImgurClient } from 'imgur';

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
