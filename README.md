<h1 align="center">
  <br />
  <a href="https://github.com/KMCGamer/google-domain-filter">
    <img src="https://user-images.githubusercontent.com/6385983/71632282-b273ff00-2bdb-11ea-9a62-554cfce1c016.png" alt="Google Domain Filter" title="Google Domain Filter" />
  </a>
  <br />
  Google Domain Filter
  <br />
</h1>

<p align="center"> 
  Filter domains from your Google search results and bring results you prefer to the top!
</p>

<p align="center"> 
  <a href="https://addons.mozilla.org/en-US/firefox/addon/google-domain-filter" alt="Download for Firefox" title="Download for Firefox">
    <img src="https://user-images.githubusercontent.com/6385983/103181145-c6445680-486b-11eb-8a92-79aa271f5d79.png" />
  </a>
  <a href="https://chrome.google.com/webstore/detail/google-domain-filter/pfefijhgghjngiekipelcephlehhiedl" alt="Download for Chrome" title="Download for Chrome">
    <img src="https://user-images.githubusercontent.com/6385983/103181045-82048680-486a-11eb-97c6-c6ef6ab8a111.png" />
  </a>
</p>

## Description

Built with React and webextension APIs, the Google Domain Filter allows you to input a set of domains you would like to filter away from your google results. You may also use the preference list to highlight and prioritize certain domains. Domains in the preference list will be brought to the top of the page and accented in blue.

<p align="center">
  <img width="397" alt="Google Domain Filter Preview" src="https://user-images.githubusercontent.com/6385983/102741623-df577f80-4320-11eb-8582-b952d1df3458.png">
</p>

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

Start by running `npm start` in the root directory. This will kick off the webpack build watch, which will allow you to make changes while webpack re-compiles to the `build` folder. While webpack is watching for changes, open another terminal and start a firefox, chrome, or both instances by using one of the commands below:
- Firefox only: `npm run start:firefox`
- Chrome only: `npm run start:chrome`
- Both: `npm run start`

I have mine set to use firefox developer edition and chrome canary. You will either need to download these, or specify your own firefox and chrome instances in the npm scripts in package.json. Webpack will compile to the `build` folder, and `web-ext` will watch for changes to the `build` folder and refresh your browser automatically.

### Build for Production

Run `npm run build` to create a build for production. Webpack will compile the code into the `build` folder with production environment variables. Web-ext will then create a build from that and place the zipped extension into the `dist` folder.
