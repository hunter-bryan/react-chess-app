import React from "react";
import { View, Image, Animated } from "react-native";

interface IPieceProps {

}


export const Piece:  React.FC<IPieceProps> = () => {
    return (
        <View style={{position: 'absolute', width: 100, height: 100}}>
            <Image source={require('../../../assets/favicon.png')}></Image>
        </View>
    )
}