import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

interface ISquareProps {
	lightSquare: boolean; // TODO Figure out what style needs to be
	row: number;
	column: number;
}

export const Square: React.FC<ISquareProps> = ({
	lightSquare,
	row,
	column,
	children,
}) => {
	const [style, setStyle] = useState<any>({
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: lightSquare ? "white" : "#ab6829",
		padding: 3,
	});

	return (
		<View
			style={style}
			// onTouchStart={() => {
			// 	setStyle({ ...style, backgroundColor: "green" });
			// }}
		>
			<Text
				style={{
					opacity: column === 0 ? 100 : 0,
					alignSelf: "flex-start",
					color: lightSquare ? "#ab6829" : "white",
                    fontSize: 10
				}}
			>
				{8 - row}
			</Text>
			<Text
				style={{
					opacity: row === 7 ? 100 : 0,
					alignSelf: "flex-end",
					color: !lightSquare ? "white" : "#ab6829",
                    fontSize: 10
				}}
			>
				{String.fromCharCode(column + 65).toLowerCase()}
			</Text>
		</View>
	);
};
