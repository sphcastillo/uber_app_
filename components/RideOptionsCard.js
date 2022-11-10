import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { Icon } from "react-native-elements";
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from '../slices/navSlice';
import { useSelector } from 'react-redux';

const RideOptionsCard = () => {

    const navigation = useNavigation();

    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    const data = [
        {
            id: "Uber-X-123",
            title: "Uber X",
            multiplier: 1,
            image: "https://links.papareact.com/3pn",
        },
        {
            id: "Uber-XL-456",
            title: "Uber XL",
            multiplier: 1.2,
            image: "https://links.papareact.com/5w8",
        },
        {
            id: "Uber-LUX-789",
            title: "Uber LUX",
            multiplier: 1.75,
            image: "https://links.papareact.com/7pf",
        },
    ];

    // If we have SURGE pricing, this goes up
    const SURGE_CHARGE_RATE = 1.5;

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity 
                    style={[tw`absolute top-3 left-5 z-50 p-3 rounded-full`]}
                    onPress={() => navigation.navigate("NavigateCard")}
                >
                    <Icon name="chevron-left" type='fontawesome' />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a Ride - {travelTimeInformation?.distance.text}
                </Text>
            </View>
            <FlatList 
                data={data}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity 
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${ id === selected?.id && "bg-gray-200"}`}
                    >
                        <Image 
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: "contain",
                            }}
                            source={{ uri: image }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-lg font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration.text} Travel time</Text>
                        </View>
                        <Text style={tw`text-lg`}>
                            $99
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                    disabled={!selected}
                    style={tw`bg-black py-3 m-3 ${!selected  && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-lg`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard;

