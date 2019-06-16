# Ski Resorts Guide Map

### For Users
This application shows some popular ski resorts in _**Lake Tahoe area**_.
* Click **Introduction** button on top-right corner to see the synopsis of Lake Tahoe.
* Open the full list of ski resorts by clicking the **List** button next to introduction button.
* Filter the list by typing the name in the search field.
* Click the name on the list to see the location on the map and open its information window.
* The content of information window shows a photo of the ski resort.

#### Live Version:
https://emma319.github.io/SkiResortsGuideMap/


### Get Start
1. Clone this repo with `git` or download and extract via zip
2. Open terminal and change directory into this project root
3. Install **node** and **npm**
    ###### _To get started in development mode will need all dependencies:_
    * Install all project dependencies with `npm install`
        * install [`prop-types`](https://www.npmjs.com/package/prop-types) with `npm install --save prop-types`
        * install [`react-debounce-input`](https://www.npmjs.com/package/react-debounce-input) with `npm install --save react-debounce-input`
        * install [`escape-string-regexp`](https://www.npmjs.com/package/escape-string-regexp) with `npm install --save escape-string-regexp`
        * install [`sort-by`](https://www.npmjs.com/package/sort-by) with `npm install --save sort-by`
        * install [`axios`](https://www.npmjs.com/package/axios) with `npm install --save axios`
4. Start the development server with `npm start`
5. Open http://localhost:3000 to view it in the browser.
    ###### _To get started in production mode by using the following commands:_
6. Builds the app for production to the build folder.
    `npm run build`
    `npm install -g serve`
    `serve -s build`
7. Open http://localhost:5000 to view it in the browser.
8. Have Fun!!

### Design
* This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
* Dependencies and API used in this project:
    * React
    * bootstrap
    * axios
    * prop-types
    * react-devounce-input
    * escape-string-regexp
    * sort-by
    * Google Maps API
    * FourSquare API
    * WikiPedia API

* The methods to get API from Google map, FourSquare and Wikipedia is provided in file [`API.js`](src/API.js).
* The component struction created as follows:
    ```
    <App/>
        <Header/>
        <IntroDiv/>
        <Main/>
            <MapDiv/>
            <NavBar/>
        <Footer/>
    ```
