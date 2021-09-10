# Notion Forge

> Customizable react Notion renderer built from react-notion-x

## Install

```bash
yarn add notion-forge
```

## Usage

First you'll want to fetch the content for a Notion page:

```ts
import { NotionAPI } from 'notion-client'

const api = new NotionAPI()

// fetch the page's content, including all async blocks, collection queries, and signed urls
const recordMap = await api.getPage('067dd719a912471ea9a3ac10710e7fdf')
```

Once you have the data for a Notion page, you can render it:

```tsx
import React from 'react'
import { NotionRenderer } from 'notion-forge'

export default ExampleNotionPage({ recordMap }) => (
  <NotionRenderer
    recordMap={recordMap}
    fullPage={true}
    darkMode={false}
  />
)
```

## Styles

You'll need to import some CSS styles as well. If you're using Next.js, we recommend you put these in `pages/_app.js`:

```ts
// core styles shared by all of notion-forge (required)
import 'notion-forge/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
```

## License

MIT © [Nolan Tait](https://taitventures.ca)
