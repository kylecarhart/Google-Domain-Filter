<h1 align="center">
  <br />
  <a href="https://github.com/KMCGamer/google-domain-filter"><img src="https://user-images.githubusercontent.com/6385983/71632282-b273ff00-2bdb-11ea-9a62-554cfce1c016.png" alt="Google Domain Filter"></a>
  <br />
  Google Domain Filter
  <br />
</h1>

<p align="center"> 
  Filter domains from your Google search results and bring results you prefer to the top!
</p>

<p align="center">
  <img width="397" alt="Google Domain Filter Preview" src="https://user-images.githubusercontent.com/6385983/102741623-df577f80-4320-11eb-8582-b952d1df3458.png">
</p>

## Description

Built with React and webextension APIs, the Google Domain Filter allows you to input a set of domains you would like to filter away from your google results. You may also use the preference list to highlight and prioritize certain domains. Domains in the preference list will be brought to the top of the page and accented in blue.

### How it Works

The extension runs in the background listening to requests made to google that contain a query. The query is then modified to contain additional parameters to filter away google search results that contain any specified domains. The extension then sends the query to google and awaits a response. On response, the extension then modifies the results page to remove any obvious indications that domains were filtered out, making the entire process seamless.

### Caveats

Due to the nature of how the extension works, it may interfere with certain google search page features. Features such as Google Definitions (ex: "Define Ubiquitous"), Google Translate (ex: "Translate hola"), and other similar in-page apps may not appear when domains are in your filter. To bring back those functionalities, simply remove all domains from your blacklist or uninstall the web extension. **Workarounds are still being looked into.**

### Tools/Frameworks/Libraries Used

- **React** for the popup.
- **Figma** for designing the popup.
- **Webpack** (custom configuration) to package each individual portion of the extension.

## Build Process

### Development

Make sure you run `npm install` first.

Start by running `npm start` in the root directory. This will kick off the webpack build watch, which will allow you to make changes while webpack re-compiles to the `./dist` folder. While that is running, open another terminal and run `npm run start:firefox`. This will start the `web-ext` helper which will open an contained instance of firefox and install the web extension. `web-ext` will watch for changes to the `./dist` folder and refresh automatically.

### Build for Production

Run `npm run build` to create a build for production. Then run `web-ext build` in the `dist` folder to make a build.
