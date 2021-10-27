import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Game } from "./src/components/Game/Game";
import { GameState } from "./src/containers/GameState/GameState";

export default function App() {
    console.log("App executed");
    
	return (
        <GameState.Provider>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Game/>
            </View>
        </GameState.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
});