import React, { useCallback, useRef, useState } from "react";
import { View, Image, Animated, Pressable, PanResponder } from "react-native";
import { pieceImages } from "../../../types/types";
import { GameState } from "../../containers/GameState/GameState";

interface IPieceProps {
	id: string;
	row: number;
	col: number;
	size: number;
}

export const Piece: React.FC<IPieceProps> = ({ id, row, col, size }) => {
	const {
		chessEngine,
		player,
		setPlayer,
		board,
		setBoard,
		capturedBlackPieces,
		capturedWhitePieces,
		setCapturedBlackPieces,
		setCapturedWhitePieces,
		targetSquare,
		selectedSquare,
		setSelectedSquare,
		setTargetSquare,
	} = GameState.useContainer();

	let pan = useRef(
		new Animated.ValueXY({ x: size * col - 5, y: size * row - 5 })
	).current;

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: (e, gestureState) => {
				// console.log("X: ", gestureState.moveX, "Y: ", gestureState.moveY);
				//console.log("Coordinates: ", gestureState.x0, gestureState.y0);
				pan.setOffset({
					x: (pan.x as any)._value,
					y: (pan.y as any)._value,
				});
			},
			onPanResponderMove: Animated.event(
				[null, { dx: pan.x, dy: pan.y }],
				{ useNativeDriver: false }
			),
			onPanResponderRelease: (e, gestureState) => {
				// Need to get coordinates, convert it into a square on the board, call the chess
				// engine to check move, and either make the move and update to new position or
				// return to old position

				const { targetRow, targetCol } = getTargetSquare(
					gestureState.moveX,
					gestureState.moveY
				);
				console.log("Row: ", targetRow, "Col: ", targetCol);

				if (targetRow > 7 || targetRow < 0) {
					// Target square not on the board
					pan.setValue({ x: 0, y: 0 });
					pan.flattenOffset();
					return;
				}

				let isValid: boolean = chessEngine.makeMove(
					row,
					col,
					targetRow,
					targetCol
				);
				console.log("Is valid? ", isValid);
				if (isValid) {
					// Move was valid so get the coordinates from the corresponding square
					pan.setValue(getCoordinates(targetRow, targetCol));
                    // setPlayer(player === 'w' ? 'b' : 'w');
				} else {
					// This is one way to return to the old positionw
					pan.setValue({ x: 0, y: 0 });
				}
                pan.flattenOffset();
			},
		})
	).current;

	const getTargetSquare = (x: number, y: number) => {
		let targetRow: number;
		let targetCol: number;
		console.log("X: ", x, "Y: ", y);

		targetCol = Math.floor(x / size);
		targetRow = Math.floor((y - size / 2) / size) - 4; // For offest of screen size above board

		return { targetRow, targetCol };
	};

	const getCoordinates = (
		targetRow: number,
		targetCol: number
	): { x: number; y: number } => {
		let x: number = 0;
		let y: number = 0;

        x = size * (targetCol - col);
        y = size * (targetRow - row);

		return { x, y };
	};

	const handlePress = useCallback(() => {
		if (!selectedSquare) {
			setSelectedSquare([row, col]);
		}
	}, [selectedSquare]);

	return (
		<Animated.View
			style={[
				{
					position: "absolute",
					width: size,
					height: size,
				},
				{
					transform: [{ translateX: pan.x }, { translateY: pan.y }],
				},
			]}
			{...panResponder.panHandlers}
		>
			{/* <Pressable onPress={handlePress}> */}
			<Image source={pieceImages[id]} />
			{/* <View>
                    <Text style={{fontSize: 35, marginLeft: 10}}>{id}</Text>
                </View> */}
			{/* </Pressable> */}
		</Animated.View>
	);
};
