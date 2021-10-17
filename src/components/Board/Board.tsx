import React, { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Square } from "../Square/Square";
import { Piece } from "../../components/Piece/Piece";

const backRankPieces = [
	"Rook",
	"Bishop",
	"Knight",
	"Queen",
	"King",
	"Knight",
	"Bishop",
	"Rook",
];

export const Board: React.FC = (props) => {
	const initializeSquares = (): JSX.Element[] => {
		let squares: JSX.Element[] = [];

		for (let i = 0; i < 8; ++i) {
			// Rows
			for (let j = 0; j < 8; ++j) {
				// Columns
				let isLight: boolean;

				// Alternate dark and light squares, being sure to offset on new row
				if ((i + j) % 2 === 0) {
					isLight = true;
				} else {
					isLight = false;
				}

				squares.push(
					<Square
						key={`${i}${j}`}
						lightSquare={isLight}
						row={i}
						column={j}
					>
						<Text style={{ justifyContent: "center" }}>
							{getPiece(i, j)}
						</Text>
					</Square>
				);
			}
		}

		return squares;
	};

	const getPiece = (i: number, j: number): string => {
		if (i === 1 || i === 6) {
			return "Pawn";
		} else if (i === 0 || i === 7) {
			return backRankPieces[j];
		} else {
			return "";
		}
	};

	const [squares, setSquares] = useState<JSX.Element[]>(initializeSquares());

	const renderSquares = (): JSX.Element => {
		let rows: JSX.Element[] = [];

		for (let i = 0; i < 8; ++i) {
			rows.push(
				<View
					style={{
						height: "12%",
						flex: 1,
						flexDirection: "row",
						flexWrap: "nowrap",
					}}
					key={`row-${i}`}
				>
					{squares.slice(i * 8, i * 8 + 8)}
				</View>
			);
		}

		return <View style={boardStyles.board}>{rows}</View>;
	};

	return (
        <View>
            {renderSquares()}
            <Piece/>
        </View>
    );
};

const boardStyles = StyleSheet.create({
	board: {
		padding: 0,
		justifyContent: "center",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").width,
		flexDirection: "column",
		flexWrap: "wrap",
	},
});
