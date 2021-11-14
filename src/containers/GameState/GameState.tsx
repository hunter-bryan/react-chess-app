import React, { useState, useCallback, useEffect } from "react";
import { createContainer } from "unstated-next";
import { Square } from "../../../types/types";
import { ChessEngine } from "../../classes/ChessEngine";

const useGameState = () => {
	const [chessEngine] = useState<ChessEngine>(new ChessEngine());
	const [player, setPlayer] = useState<string>('w');
	const [board, setBoard] = useState<typeof chessEngine.board>(
		chessEngine.board
	);
	const [capturedWhitePieces, setCapturedWhitePieces] = useState<string[]>(
		[]
	);
	const [capturedBlackPieces, setCapturedBlackPieces] = useState<string[]>(
		[]
	);
	const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
	const [targetSquare, setTargetSquare] = useState<Square | null>(null);

	// Check for valid move whenever a piece is attempting a move
	useEffect(() => {
		if (selectedSquare && targetSquare) {
			let didMove: boolean = chessEngine.makeMove(
				...selectedSquare,
				...targetSquare
			);
            
			if (didMove) {
				setBoard([...chessEngine.board]);
				setCapturedBlackPieces([...chessEngine.capturedBlackPieces]);
				setCapturedWhitePieces([...chessEngine.capturedWhitePieces]);
				setPlayer((prev) => (prev === "w" ? "b" : "w"));
			}
		}
	}, [targetSquare]);

	const updateBoard = useCallback(() => {}, []);

	const movePiece = (
		oldRow: number,
		oldCol: number,
		row: number,
		column: number,
		pieceId?: string
	) => {};

	return {
		chessEngine,
		player,
		setPlayer,
		board,
		setBoard,
		capturedWhitePieces,
		setCapturedWhitePieces,
		capturedBlackPieces,
		setCapturedBlackPieces,
		selectedSquare,
		setSelectedSquare,
		targetSquare,
		setTargetSquare,
		movePiece,
	};
};

export const GameState = createContainer(useGameState);
