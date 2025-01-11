```bash
npm install @lit/localize
npm install @lit/localize-tools --save-dev

lit-localize extract
```

lit-localize.json
```json
{
  "$schema": "https://raw.githubusercontent.com/lit/lit/main/packages/localize-tools/config.schema.json",
  "sourceLocale": "id",
  "targetLocales": ["en"],
  "inputFiles": [
    "./src/js/**/*.js"
  ],
  "output": {
    "mode": "runtime",
    "outputDir": "./src/generated/locales",
    "localeCodesModule": "./src/generated/locale-codes.js"
  },
  "interchange": {
    "format": "xliff",
    "xliffDir": "./src/xliff/"
  }
}
```

```javascript
mport { html, LitElement } from 'lit';
import { msg, str, updateWhenLocaleChanges } from '@lit/localize';
 
class MyElement extends LitElement {
  static properties = {
    name: {},
  };
 
  constructor() {
    super();
    updateWhenLocaleChanges(this);
 
    this.name = 'John Doe';
  }
 
  render() {
    return html`
      <h1>${msg(str`Welcome, ${this.name}!`)}</h1>
      <p>${msg(`I hope you are in good condition`)}</p>
      <p>${msg(html`Please visit <a href="#">this link</a> to be professional programmer`)}</p>
    `;
  }
}
 
customElements.define('my-element', MyElement);
```

```bash
lit-localize build
```

```
lit-localization-playground
├── generated
│ ├── locale-codes.js
│ └── locales
│ ├── es.js
│ ├── fr.js
│ └── id.js

├── xliff
│ ├── es.xlf
│ ├── fr.xlf
│ └── id.xlf
└── lit-localize.json
```

```json
{
  "sourceLocale": "en",
  "targetLocales": ["id", "es", "fr"],
  "output": {
    "localeCodesModule": "./src/js/generated/locale-codes.js"
  }
}
```

- mode runtime 
- mode transform

