# Freeze - New Tab Page [![Version](https://img.shields.io/chrome-web-store/v/kacdbklgelcjnoejpbafhdelhlnkgpnd.svg)](https://chrome.google.com/webstore/detail/kacdbklgelcjnoejpbafhdelhlnkgpnd)
Get a Curated Cinemagraph Each Time You Open a New Tab

![Screen Shot](https://media.giphy.com/media/xULW8o7cDuFP75Jnm8/giphy.gif)


## Running Dev Environement
### Installation
1. Clone the repository `git clone https://github.com/Hemmingsson/downtime-extension`
2. Run `npm install`
3. Run `npm run build`

##### Load the extension in Chrome
1. Open Chrome browser and navigate to chrome://extensions
2. Select "Developer Mode" and then click "Load unpacked extension..."
3. From the file browser, choose to `extension-boilerplate/build/chrome`

##### Load the extension in Firefox
1. Open Firefox browser and navigate to about:debugging
2. Click "Load Temporary Add-on" and from the file browser, choose `extension-boilerplate/build/firefox`


### Developing
The following tasks can be used when you want to start developing the extension and want to enable live reload - 

- `npm run chrome-watch`
- `npm run firefox-watch`

### Packaging
Run `npm run dist` to create a zipped, production-ready extension for each browser. You can then upload that to the appstore.


## Credits

### Downtime was made with :

- [Extension Boilerplate](https://github.com/EmailThis/extension-boilerplate)
- [instagram.css](https://github.com/picturepan2/instagram.css)
- Cinemagraphs sourced from [imgur.com](https://imgur.com) and [r/Cinemagraphs](https://www.reddit.com/r/Cinemagraphs/)
