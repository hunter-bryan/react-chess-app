// An abstract base class with common functionality from which all pieces inherit
export abstract class Piece {
    protected abstract id: string;

    public abstract validMove: (oldRow: number, oldCol: number, targetRow: number, targetCol: number, board: (Piece|null)[][]) => boolean;
    public abstract getMoves: () => number[];
    public abstract getId: () => string;
    public abstract toString: () => string;
}