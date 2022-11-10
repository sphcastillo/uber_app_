import { StyleSheet, Text, View } from 'react-native';
import React, { useRef,  useEffect } from 'react';
import MapView, { Marker } from "react-native-maps";
import tw from 'tailwind-react-native-classnames';
import { selectOrigin, selectDestination } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import { GOOGLE_MAPS_API_KEY } from "@env";
import MapViewDirections from 'react-native-maps-directions';

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    // want the map to zoom out & the have both origin & destination markers in view
    // useRef is a massive pointer
    const mapRef = useRef(null);

    useEffect(() =>  {

        if(!origin || !destination){
            return;
        }

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, 
    // rerun when it changes at any time 
    [origin, destination]
    )

    return (
        <MapView  
            ref={mapRef}
            mapType='mutedStandard'
            style={tw`flex-1`}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin  && destination && (
                <MapViewDirections 
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
            {origin?.location &&  (
                <Marker 
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker 
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}

        </MapView>
    )
}

export default Map;
