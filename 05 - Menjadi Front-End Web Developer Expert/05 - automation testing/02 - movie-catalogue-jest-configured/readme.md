- npm install codeceptjs playwright --save-dev
- npx codeceptjs init
```
Do you plan to write tests in TypeScript? → No
Where are your tests located? → e2e/**/*.test.js
What helpers do you want to use? → Playwright
Where should logs, screenshots, and reports to be stored? → e2e/output
Do you want to enable localization for tests? http://bit.ly/3GNUBbh → English (no localization)
[Playwright] Browser in which testing will be performed. Possible options: chromium, firefox, webkit or electron → chromium
[Playwright] Base url of site to be tested → http://localhost:9000
[Playwright] Show browser window → Yes
Setelah menjawab pertanyaan-pertanyaan di atas, codecept membuat beberapa folder dan berkas. Sebelum melihat hal yang telah dibuat olehnya, codecept masih meminta kita menjawab dua pertanyaan berikutnya.

Feature which is being tested (ex: account, login, etc) → Liking Movies
Filename of a test → Liking_Movies.test.js
```
- npx codeceptjs run --steps