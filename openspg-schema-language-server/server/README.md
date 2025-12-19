<div align="center"><a name="readme-top"></a>

<h1>OpenSPG Schema Language Server</h1>

[Language Server Protocol](https://microsoft.github.io/language-server-protocol/) implementation for [OpenSPG Schema](https://github.com/OpenSPG/KAG).

[![NPM version][npm-image]][npm-url]
[![NPM downloads][download-image]][download-url]
[![Apache License][license-shield]][license-url]

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![Stargazers][stars-shield]][stars-url]

[Change Log](./CHANGELOG.md) · [Report Bug](https://github.com/thundax-lyp/vscode-extension-openspg-schema/issues/new) · [Pull Request](https://github.com/thundax-lyp/vscode-extension-openspg-schema/compare)

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

[npm-image]: https://img.shields.io/npm/v/openspg-schema-language-server?style=for-the-badge

[npm-url]: http://npmjs.org/package/openspg-schema-language-server

[download-image]: https://img.shields.io/npm/dm/openspg-schema-language-server.svg?style=for-the-badge

[download-url]: https://npmjs.org/package/openspg-schema-language-server

[license-shield]: https://img.shields.io/github/license/thundax-lyp/vscode-extension-openspg-schema.svg?style=for-the-badge

[license-url]: https://github.com/thundax-lyp/vscode-extension-openspg-schema/blob/main/LICENSE

[contributors-shield]: https://img.shields.io/github/contributors/thundax-lyp/vscode-extension-openspg-schema.svg?style=for-the-badge

[contributors-url]: https://github.com/thundax-lyp/vscode-extension-openspg-schema/graphs/contributors

[stars-shield]: https://img.shields.io/github/stars/thundax-lyp/vscode-extension-openspg-schema.svg?style=for-the-badge

[stars-url]: https://github.com/thundax-lyp/vscode-extension-openspg-schema/stargazers

[issues-shield]: https://img.shields.io/github/issues/thundax-lyp/vscode-extension-openspg-schema.svg?style=for-the-badge

[issues-url]: https://github.com/thundax-lyp/vscode-extension-openspg-schema/issues

</div>

## Features

* Syntax highlighting
* Document symbols
* Definition and references
* Hover
* Formatting
* Embedded concept rule scripts

## Installation

```bash
npm install openspg-schema-language-server
```

> It will be `pnpm/yarn add openspg-schema-language-server` if you use pnpm or yarn.

## Usage

### Language Server in Node

```typescript
// server.ts

import {
    ProposedFeatures,
    createConnection
} from 'vscode-languageserver/node';
import {listen} from 'openspg-schema-language-server';

const connection = createConnection(ProposedFeatures.all);
listen(connection);
```

### Language Server in Web

```js
// server.ts

import {
    BrowserMessageReader,
    BrowserMessageWriter,
    createConnection,
} from 'vscode-languageserver/browser';
import {listen} from 'openspg-schema-language-server';

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);
listen(connection);
```

## License

[Apache License 2.0](./LICENSE)
