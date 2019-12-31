<h1 align="center">
  <br>
  <a href="https://github.com/KMCGamer/google-domain-filter"><img src="https://user-images.githubusercontent.com/6385983/71632282-b273ff00-2bdb-11ea-9a62-554cfce1c016.png" alt="Google Domain Filter"></a>
  <br>
  Google Domain Filter
  <br>
</h1>

Blacklist domains from Google search results!

![Domains](https://user-images.githubusercontent.com/6385983/70561137-ebc6cb00-1b57-11ea-9f38-0c1a25a5879c.png)

## Description

Built with React and webextension APIs, the Google Domain Filter allows you to input a set of domains you would like to filter away from your google results.

### How it Works

The extension runs in the background listening to requests made to google that contain a query. The query is then modified to contain additional parameters to filter away google search results that contain any specified domains. The extension then sends the query to google and awaits a response. On response, the extension then modifies the results page to remove any obvious indications that domains were filtered out, making the entire process seamless.

### Tools/Frameworks/Libraries Used

- **React** for the popup.
- **Figma** for designing the popup.
- **Webpack** (custom configuration) to package each individual portion of the extension.

## Build Process

### Development

Make sure you run `npm install` first.

Start by running `npm start` in the root directory. This will kick off the webpack build watch, which will allow you to make changes while webpack re-compiles to the `./dist` folder. While that is running, open another terminal and run `npm run start:firefox`. This will start the `web-ext` helper which will open an contained instance of firefox and install the web extension. `web-ext` will watch for changes to the `./dist` folder and refresh automatically.

### Build for Production

Run `npm run build` to create a build for production. Then follow steps to properly sign the extension using `web-ext`.
