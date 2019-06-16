import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class NavBar extends Component {
    static propTypes = {
      markers: PropTypes.array.isRequired,
      locations: PropTypes.array.isRequired,
      showMarkerInfo: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (q) => {
        this.setState({ query: q });
    }

    clearQuery = () => {
        this.setState({ query: '' });
    }

    render() {
        const { markers, locations, showMarkerInfo } = this.props;
        const { query } = this.state;

        let  showingLocations;
        // Update searched locations and markers
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');

            showingLocations = locations.filter(location => match.test(location.name));
            markers.forEach(marker => {
                match.test(marker.title) ? marker.setVisible(true) : marker.setVisible(false);
            });
        } else {
            showingLocations = locations;
            markers.forEach(marker => marker.setVisible(true));
        }

        showingLocations.sort(sortBy('name'));

        return (
            <nav className='list-locations'>
                <div className='search-locations'>
                    <DebounceInput
                        minLength={1}
                        debounceTimeout={200}
                        autoFocus
                        className='search-locations-input'
                        aria-labelledby="filter"
                        type='text'
                        placeholder='Search Ski Resorts'
                        value={ query }
                        onChange={ e => this.updateQuery(e.target.value) }
                    />
                </div>

                { showingLocations.length !== locations.length && (
                    <div className='showing-locations'>
                        <span>Now showing { showingLocations.length } of { locations.length } total</span>
                        <button onClick={ this.clearQuery }>Show all</button>
                    </div>
                )}

                <ol className='location-list' aria-labelledby="aria-location-list">
                    { showingLocations.map(location => (
                        <li key={ location.id }
                            className='location-list-item'
                            aria-labelledby={ location.name }
                            tabIndex="0"
                            role="button"
                            onClick={ () => showMarkerInfo(location) }
                            onKeyPress={ () => showMarkerInfo(location) }
                        >
                            <p className='location-title'>{ location.name }</p>
                        </li>
                    ))}
                </ol>
                <label id="aria-location-list" className="aria-label">Locations List</label>
            </nav>
        )
    }
}

export default NavBar
