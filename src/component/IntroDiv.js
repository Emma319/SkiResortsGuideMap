import React from 'react';
import PropTypes from 'prop-types';


function IntroDiv (props) {
    const { introduction, handleIntroToggle } = props;

    return (
        <div className="intro-section">
            <h2 className="intro-title" aria-labelledby="aria-intro-section" tabIndex="0">
                <span>{ introduction.name }</span>
            </h2>
            <label id="aria-intro-section" className="aria-label">Lake Tahoe Introduction</label>

            <a className="intro-close"
                onClick={ handleIntroToggle }
                onKeyPress={ handleIntroToggle }>
                Close Introduction Info
            </a>

            <div className="intro-synopsis">
                <p>{ introduction.synopsis }</p>
            </div>

            <a className="intro-detail"
                href={ introduction.url }>
                More on Wikipedia »
            </a>
        </div>
    );
}

IntroDiv.propTypes = {
    introduction: PropTypes.object.isRequired,
    handleIntroToggle: PropTypes.func.isRequired
};

export default IntroDiv
