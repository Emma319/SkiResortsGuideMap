import React from 'react';
import PropTypes from 'prop-types';


function Header (props) {
    const { handleIntroToggle, handleListToggle } = props;

    return (
        <header className="App-header">
            <section aria-labelledby="aria-neighborhood-map-home">
                <h1 id="aria-neighborhood-map-home" className="header-title"><a href="/">Lake Tahoe Ski Resorts Map</a></h1>
            </section>
            <section id="toggle-btn" className="header-btn">
                <button className="intro-btn"
                    aria-labelledby="toggle-btn"
                    onClick={ handleIntroToggle }
                    onKeyPress={ handleIntroToggle }>
                    Introduction
                </button>
                <button className="list-btn"
                    aria-labelledby="toggle-btn"
                    onClick={ handleListToggle }
                    onKeyPress={ handleListToggle }>
                    List
                </button>
            </section>
        </header>
    );
}

Header.propTypes = {
    handleIntroToggle: PropTypes.func.isRequired,
    handleListToggle: PropTypes.func.isRequired
};

export default Header
