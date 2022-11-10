import { StyleSheet, Text, View, Keyboard } from 'react-native';
import React, { useRef,  useEffect } from 'react';
import MapView, { Marker } from "react-native-maps";
import tw from 'tailwind-react-native-classnames';
import { useSelector, useDispatch } from 'react-redux';
import { GOOGLE_MAPS_API_KEY } from "@env";
import MapViewDirections from 'react-native-maps-directions';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    // want the map to zoom out & the have both origin & destination markers in view
    // useRef is a massive pointer
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() =>  {

        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);
    // rerun when it changes at any time 

    useEffect(() => {


        const getTravelTime = async ()  => {

            if(!origin || !destination) return;

            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`
                ).then((response) => response.json())
                .then((data) => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
                })
        };

        getTravelTime();

    }, [origin, destination, GOOGLE_MAPS_API_KEY]);

    return (
        <MapView  
            ref={mapRef}
            onPress={Keyboard.dismiss}
            onPanDrag={Keyboard.dismiss}
            mapType='mutedStandard'
            style={tw`flex-1`}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections 
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
            {origin?.location && (
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
