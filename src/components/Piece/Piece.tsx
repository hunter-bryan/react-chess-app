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

	const pan = useRef(new Animated.ValueXY({x: size * col, y: size * row})).current;

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: (e, gestureState) => {
                console.log("Move XY: ", gestureState.moveX, gestureState.moveY);
                console.log("Coordinates: ", gestureState.x0, gestureState.y0);
				pan.setOffset({
					x: (pan.x as any)._value,
					y: (pan.y as any)._value,
				});
			},
			onPanResponderMove: Animated.event(
				[null, { dx: pan.x, dy: pan.y }],
				{useNativeDriver: false}
			),
			onPanResponderRelease: (e, gestureState) => {
                // Need to get coordinates, convert it into a square on the board, call the chess
                // engine to check move, and either make the move and update to new position or
                // return to old position

                // This is one way to return to the old position
                pan.setValue({x: 0, y: 0}); 
				pan.flattenOffset();
			},
		})
	).current;

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
					// top: row * size,
					// left: col * size,
					width: size,
					height: size,
                    
				},
                {
                    transform: [{translateX: pan.x}, {translateY: pan.y}]
                }
			]}
			{...panResponder.panHandlers}
		>
			{/* <Pressable onPress={handlePress}> */}
			<Image source={pieceImages[id]} height={200} width={200} />
			{/* <View>
                    <Text style={{fontSize: 35, marginLeft: 10}}>{id}</Text>
                </View> */}
			{/* </Pressable> */}
		</Animated.View>
	);
};
