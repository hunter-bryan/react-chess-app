import { Bishop } from "./Pieces/Bishop";
import { King } from "./Pieces/King";
import { Knight } from "./Pieces/Knight";
import { Pawn } from "./Pieces/Pawn";
import { Piece } from "./Pieces/Piece";
import { Queen } from "./Pieces/Queen";
import { Rook } from "./Pieces/Rook";

export class ChessEngine {
	public board: Array<Array<Piece | null>>; // Represents the current state of the game
	public isWhitesTurn: boolean; // The current player
	public capturedWhitePieces: string[] = []; // White's pieces captured by black
	public capturedBlackPieces: string[] = []; // Black's pieces captured by white

	constructor() {
		this.board = this.initializeBoard();
        this.isWhitesTurn = true;
	}

	private initializeBoard = (): Array<Array<Piece | null>> => {
		const _board: Array<Array<Piece | null>> = [];
		const blackBackRank: Piece[] = [
			new Rook("b"),
            new Knight("b"),
			new Bishop("b"),
			new Queen("b"),
			new King("b"),
			new Bishop("b"),
            new Knight("b"),
			new Rook("b"),
		];
		const whiteBackRank: Piece[] = [
			new Rook("w"),
			new Knight("w"),
            new Bishop("w"),
			new Queen("w"),
			new King("w"),
			new Bishop("w"),
            new Knight("w"),
			new Rook("w"),
		];

		for (let i: number = 0; i < 8; ++i) {
			if (i === 0) {
				_board.push([...blackBackRank]);
			} else if (i === 7) {
				_board.push([...whiteBackRank]);
			} else if (i === 1) {
				_board.push(new Array<Pawn>(8).fill(new Pawn("b")));
			} else if (i === 6) {
				_board.push(new Array<Pawn>(8).fill(new Pawn("w")));
			} else {
				_board.push(new Array<null>(8).fill(null));
			}
		}

		return _board;
	};

    public makeMove = (oldRow: number, oldCol: number, targetRow: number, targetCol: number): boolean => {
        let piece: Piece | null = this.board[oldRow][oldCol];
        
        if (piece) {
            if (piece.validMove(oldRow, oldCol, targetRow, targetCol, this.board)) {
                this.board[oldRow][oldCol] = null;
                this.board[targetRow][targetCol] = piece;
            }
            
            return true;
        }
        
        return false;
    }

	public printBoard = (): void => {
        let str: string = "";
		this.board.forEach((row: Array<Piece | null>) => {
			row.forEach((piece: Piece | null) => {
				str += (piece ? piece.toString() : '- ') + " ";
			});
			str += "\n";
		});
        console.log(str)
	};
}
