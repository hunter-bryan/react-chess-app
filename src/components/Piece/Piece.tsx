import React, { useCallback, useState } from "react";
import { View, Image, Animated, Pressable, Text } from "react-native";
import { pieceImages } from "../../../types/types";
import { GameState } from "../../containers/GameState/GameState";

interface IPieceProps {
	id: string;
	row: number;
	col: number;
}

export const Piece: React.FC<IPieceProps> = ({ id, row, col }) => {
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

    const handlePress = useCallback(() => {
        if(!selectedSquare) {
            setSelectedSquare([row, col]);
        }
    }, [selectedSquare])

	return (
		<Animated.View
			style={{
				position: "absolute",
				top: row * 51,
				left: col * 50,
				width: 100,
				height: 100,
			}}
		>
			<Pressable onPress={handlePress}>
				{/* <Image source={pieceImages[id]} height={200} width={200} /> */}
                <View>
                    <Text style={{fontSize: 35, marginLeft: 10}}>{id}</Text>
                </View>
			</Pressable>
		</Animated.View>
	);
};
