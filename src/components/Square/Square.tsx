import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native";
import { GameState } from "../../containers/GameState/GameState";

interface ISquareProps {
	lightSquare: boolean; // TODO Figure out what style needs to be
	row: number;
	column: number;
}

export const Square: React.FC<ISquareProps> = ({
	lightSquare,
	row,
	column,
}) => {
    const {
		targetSquare,
		selectedSquare,
		setSelectedSquare,
		setTargetSquare,
	} = GameState.useContainer();

	const [color, setColor] = useState<any>(lightSquare ? "white" : "#ab6829");
	//const [isSelected, setIsSelected] = useState<boolean>(false);

    // This is how we highlight a square when we click on a piece
    useEffect(() => {
        if(selectedSquare && selectedSquare[0] === row && selectedSquare[1] === column) {
            alert("Touched me")
            setColor(
                    "yellow"
                );
        } else if (!selectedSquare && targetSquare) {
            alert("resetting")
            setColor(lightSquare ? "white" : "#ab6829");
        } else {
            return;
        }
    }, [selectedSquare]);

	const style = useMemo(() => {
		return {
			...SquareStyle.square,
			backgroundColor: color,
		};
	}, [color]);

	const handleTouch = useCallback(() => {
		if (!selectedSquare) { // Touching an empty square before a piece has been selected
            alert("Empty")
			return;
		} else if (!targetSquare) {
			setColor(
				"yellow"
			);
			//setIsSelected((prev) => !prev);
			setTargetSquare([row, column]);
            setSelectedSquare(null);
		}
	}, [
		lightSquare,
		selectedSquare,
		targetSquare,
		setSelectedSquare,
		setTargetSquare,
	]);

	// useEffect(() => {
	// 	if (!targetSquare) {
	// 		setIsSelected(false);
	// 	}
	// }, [targetSquare]);

	return (
		<View style={style} onTouchStart={handleTouch}>
			{/* <Pressable
				onTouchStart={() => {
					setStyle({ ...style, backgroundColor: "yellow" });
				}}
			> */}
			<Text
				style={{
					opacity: column === 0 ? 100 : 0,
					alignSelf: "flex-start",
					color: lightSquare ? "#ab6829" : "white",
					fontSize: 10,
				}}
			>
				{8 - row}
			</Text>
			<Text
				style={{
					opacity: row === 7 ? 100 : 0,
					alignSelf: "flex-end",
					color: !lightSquare ? "white" : "#ab6829",
					fontSize: 10,
				}}
			>
				{String.fromCharCode(column + 65).toLowerCase()}
			</Text>
			{/* </Pressable> */}
		</View>
	);
};

const SquareStyle = StyleSheet.create({
	square: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		padding: 3,
	},
});
