import { ChessEngine } from "../../classes/ChessEngine";
import { Piece } from "../../components/Piece/Piece";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { Board } from "../Board/Board";
import { CapturedPieces } from "../../components/CapturedPieces/CapturedPieces";
import { GameState } from "../../containers/GameState/GameState";

interface IGameProps {}

export const Game: React.FC<IGameProps> = (props) => {
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
        movePiece
	} = GameState.useContainer();

	// useEffect(() => {
	// 	//if(isValidMove()) {
	// 	setBoard(chessEngine.board);
	// 	//}
	// }, [chessEngine.board]);

	const renderPieces = useCallback(
		() =>
			board.map((row, i) =>
				row.map((piece, j) => {
					return piece ? (
						<Piece
							key={`${i}${j}`}
							id={piece.getId()}
							row={i}
							col={j}
						/>
					) : null;
				})
			),
		[board]
	);

	return (
		<View>
			<View>
				<CapturedPieces color="w" pieces={capturedBlackPieces} />
			</View>
			<View>
				<CapturedPieces color="b" pieces={capturedWhitePieces} />
			</View>

			<Board />
			{renderPieces()}

			{chessEngine.printBoard()}
		</View>
	);
};
