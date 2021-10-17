import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Board } from "./src/components/Board/Board";

export default function App() {
    console.log("App executed");
    
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
            <Board/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "blue",
		alignItems: "center",
		justifyContent: "center",
	},
});