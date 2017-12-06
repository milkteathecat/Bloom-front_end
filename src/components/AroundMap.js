import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class AroundMap extends React.Component {
    state = {
        isOpen: false,
    }
    onToggleOpen = () => {
        this.setState((prevState) => {
            return { isOpen: !prevState.isOpen };
        });
    }
    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                <Marker
                    position={{ lat: -34.397, lng: 150.644 }}
                    onClick={this.onToggleOpen}
                >
                    {this.state.isOpen ? <InfoWindow onCloseClick={this.onToggleOpen}>
                        <div>abc</div>
                    </InfoWindow> : null}np
                </Marker>
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
