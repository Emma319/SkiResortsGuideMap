import React, { Component } from 'react';
import sortBy from 'sort-by';

import Header from './component/Header';
import IntroDiv from './component/IntroDiv';
import Main from './component/Main';
import Footer from './component/Footer';

import * as API from './API';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: '',
            infowindow: '',
            infoBoxes: [],
            markers: [],
            locations: [],
            introduction: '',
            listOpen: false,
            introOpen: false
        }
        this.mapStyle = this.mapStyle.bind(this);
        this.handleListToggle = this.handleListToggle.bind(this);
        this.handleIntroToggle = this.handleIntroToggle.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.showMarkerInfo = this.showMarkerInfo.bind(this);
        this.markerAnimation = this.markerAnimation.bind(this);
    }

    componentWillMount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
        API.getGoogleMap();
    }

    componentDidMount() {
        this.renderMap();
    }

    renderMap = () => {
        Promise.all([ API.getGoogleMap(), API.getVenues(), API.getWiki("Lake Tahoe"), API.getWikiURL("Lake Tahoe") ])
        .then(([google, venues, wiki, wikiURL]) => {
            this.setState({ venues: venues });
            this.setState({ introduction: {id: wiki.pageid, name: wiki.title, description: wiki.description, synopsis: wiki.extract, url: wikiURL, thumbnail: wiki.thumbnail.source} });

            this.initMap();
            this.mapStyle();
        })
        .catch(error => {
            console.log("Error render map!! " + error);
            alert('Error loading page...');
        })
    }

    mapStyle() {
        if(window.innerWidth > 560) {
            if(!this.state.listOpen) {
                var mapContainer = document.getElementById('map-container')
                mapContainer.style.setProperty('--map_container-width', "100%")
            }
        }
    }

    handleListToggle() {
        this.setState( state => ({ listOpen: !state.listOpen }));
        this.mapStyle();
    }

    handleIntroToggle() {
        if (!this.state.introOpen) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState( state => ({ introOpen: !state.introOpen }));
    }

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }
        this.handleIntroToggle();
    }

    showMarkerInfo(venue) {
        const { map, infowindow, infoBoxes, markers } = this.state;
        let marker = markers.filter(marker => marker.id === venue.id)[0];
        let infoBox = infoBoxes.filter(infoBox => infoBox.id === venue.id)[0];

        if (marker && infoBox) {
            this.markerAnimation(marker);

            // Show infowindow
            infowindow.setContent(infoBox.content)
            infowindow.open(map, marker);
            map.setZoom(11);
            map.setCenter(marker.position);

            if(window.innerWidth < 560) {
                this.handleListToggle();
            }

            window.google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
            });
        }
    }

    markerAnimation(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
        setTimeout(() => { marker.setAnimation(null) }, 1800);
    }

    async getMarkerInfo(marker) {
        let url = await API.getVenuePhoto(marker.id);
        let googleUrl = 'https://www.google.com/search?q=' + marker.title.replace(/ /g, '+');

        let infoBox = '<div class="venueBlock">' +
            '<div class="venueIcon"><img src="' + url + '" alt="' + marker.title + '" width="200" height="200" /></div>' +
            '<div class="venueDetails">' +
            '<div class="venueName"><a href="' + googleUrl + '">' + marker.title + '</a></div>' +
            '<div class="venueAddress">' + marker.venue.location.formattedAddress[0] + '</div>' +
            '<div class="venueAddress">' + marker.venue.location.formattedAddress[1] + '</div></div></div>';

        this.state.infoBoxes.push({ id: marker.id, name: marker.title, content: infoBox });
    }

    initMap = () => {
        const { infoBoxes, markers, locations, introduction } = this.state;
        let myLatLng = {lat: 39.092507, lng: -120.033492};

        // Initialize a map
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 10,
            mapTypeId: 'terrain'
        });
        this.setState({ map: map });

        // Create an Infowindow
        var infowindow = new window.google.maps.InfoWindow();
        this.setState({ infowindow: infowindow });

        // Create a markerTahoe
        let markerTahoe = new window.google.maps.Marker({
            position: myLatLng,
            map:map,
            title:"Lake Tahoe",
            id: "Lake_Tahoe",
            animation: window.google.maps.Animation.DROP
        });

        // Create markerTahoe infobox HTML
        let TahoeInfoBox = '<div class="venueBlock">' +
            '<div class="venueIcon"><img src="' + introduction.thumbnail + '" alt="' + introduction.name + '" width="200" height="200" /></div>' +
            '<div class="venueDetails">' +
            '<div class="venueName"><a href="https://www.google.com/search?q=lake+tahoe">' + introduction.name + '</a></div>' +
            '<div class="venueDescription">' + introduction.description + '</div></div></div>';

        infoBoxes.push({ id: markerTahoe.id, name: markerTahoe.title, content: TahoeInfoBox });

        // Add "click" listener to markerTahoe
        markerTahoe.addListener('click', function() {
            infowindow.setContent(TahoeInfoBox);
            infowindow.open(map, markerTahoe);
            map.setZoom(11);
            map.setCenter(markerTahoe.position);
        });

        // Display dynamic markers
        this.state.venues.sort(sortBy('name'));
        this.state.venues.forEach(venue => {
            // Create  a marker
            let marker = new window.google.maps.Marker({
                position: { lat: venue.location.lat, lng: venue.location.lng },
                map: map,
                title: venue.name,
                venue: venue,
                id: venue.id,
                animation: window.google.maps.Animation.DROP
            });

            // Get location info to marker
            this.getMarkerInfo(marker);

            // Add "click" listener to marker
            window.google.maps.event.addListener(marker, 'click', () => {
                this.showMarkerInfo(venue);
            });

            markers.push(marker);
            locations.push(venue);
        })
    }


    render() {
        const { listOpen, introOpen, locations, markers, introduction } = this.state;

        return (
            <div className="App">
                <Header
                    handleListToggle={ this.handleListToggle }
                    handleIntroToggle={ this.handleIntroToggle }
                />

                { introOpen && (
                    <section id="intro-container" ref={node => { this.node = node; }}>
                        <IntroDiv
                            introduction = { introduction }
                            handleIntroToggle={ this.handleIntroToggle }
                        />
                    </section>
                )}

                <Main
                    listOpen={ listOpen }
                    markers={ markers }
                    locations={ locations }
                    showMarkerInfo={ this.showMarkerInfo }
                />

                <Footer />

            </div>
        );
    }
}

export default App;
