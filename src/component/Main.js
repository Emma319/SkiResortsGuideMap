import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';


function Main (props) {
    const { listOpen, markers, locations, showMarkerInfo } = props;

    return (
        <main>
            <section id="map-container" aria-labelledby="aria-map" role="application">
                <div id="map" aria-labelledby="aria-map"></div>
                <label id="aria-map" className="aria-label">Interactive Map</label>
            </section>

            { listOpen && (
                <section id="nav-container">
                    <NavBar
                        markers={ markers }
                        locations={ locations }
                        showMarkerInfo={ showMarkerInfo }
                    />
                </section>
            )}
        </main>
    );
}

Main.propTypes = {
    listOpen: PropTypes.bool.isRequired,
    markers: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    showMarkerInfo: PropTypes.func.isRequired
};

export default Main
