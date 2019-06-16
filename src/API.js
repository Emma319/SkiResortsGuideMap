import axios from 'axios';

export function getGoogleMap() {
    // If the promise is not defined yet, define it
    if(!this.googleMapPromise) {
        this.googleMapPromise = new Promise((resolve) => {
            // Add a global handler for when the API finishes loading
            window.resolveGoogleMapPromise = () => {
                resolve(window.google); // Resolve the promise
                delete window.resolveGoogleMapPromise; // Clean up
            };

            // Add a global handler for the API failure loading
            window.gm_authFailure = () => {
                alert("Error: Authentication failure to load Google Maps");
            };

            // Load the Google Map API
            const script = document.createElement("script");
            const API = 'APIKey';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapPromise`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        });
    }
    // Return a promise for the Google Map API
    return this.googleMapPromise;
}

export function getVenues() {
    return new Promise((resolve) => {
        // Foursquare API parameters
        const endPoint = "https://api.foursquare.com/v2/venues/search?";
        const parameters = {
            client_id: "FoursquareID",
            client_secret: "FoursquareSecret",
            query: "ski resort",
            ll: "39.0925, -120.0334",
            limit: 6,
            v: "20182507"
        };

        // Make a request for venues
        axios.get(endPoint + new URLSearchParams(parameters))
            .then(response => {
                return resolve(response.data.response.venues);
            })
            .catch(error => {
                console.log("Error getting venues!! " + error);
                alert('Something wrong when loading locations...');
            });
    });
}

export function getVenuePhoto(VenueID) {
    return new Promise((resolve) => {
        // Foursquare API parameters
        const endPoint = `https://api.foursquare.com/v2/venues/${VenueID}/photos?`;
        const parameters = {
            client_id: "FoursquareID",
            client_secret: "FoursquareSecret",
            VENUE_ID: VenueID,
            limit: 1,
            v: "20182507"
        };

        // Make a request for venue photo
        axios.get(endPoint + new URLSearchParams(parameters))
            .then(response => {
                let photoData = response.data.response.photos.items[0];
                return resolve(photoData.prefix + "300x300" + photoData.suffix);
            })
            .catch(error => {
                console.log("Error get venue photo!! " + error);
                // alert('Something wrong when loading location photos...');
            });
    });
}

export function getWiki(query) {
    return new Promise((resolve) => {
        // Wikipedida API parameters
        const wikiURL = "https://en.wikipedia.org/w/api.php?";
        const parameters = {
            origin: "*",
            format: "json",
            action: "query",
            titles: query,
            prop: "pageimages|description|extracts",
            piprop: "name|thumbnail",
            pithumbsize: 500,
            exsentences: 5,
            explaintext: 1
        };

        // Make a request for wiki data
        axios.get(wikiURL + new URLSearchParams(parameters))
            .then(response => {
                return resolve(response.data.query.pages[140899]);
            })
            .catch(error => {
                console.log("Error getting wiki!! " + error);
                alert('Something wrong when loading wikipedia...');
            });
    });
}

export function getWikiURL(query) {
    return new Promise((resolve) => {
        // Wikipedida API parameters
        const wikiURL = "https://en.wikipedia.org/w/api.php?";
        const parameters = {
            origin: "*",
            format: "json",
            action: "opensearch",
            limit: 1,
            search: query
        };

        // Make a request for wikiURL
        axios.get(wikiURL + new URLSearchParams(parameters))
            .then(response => {
                return resolve(response.data[3][0]);
            })
            .catch(error => {
                console.log("Error getting wikiURL!! " + error);
                alert('Something wrong when loading wikipedia URL...');
            });
    });
}
