import { Piece } from "./Piece";

export class King extends Piece {
    private color: string;
    protected id: string;

    constructor(color: string) {
        super();
        this.color = color;
        this.id = color + 'k';
    }
    public getMoves = (): number[] => {
        return [];
    }

    public validMove = (): boolean => {
        return true;
    }

    public getId = (): string => {
        return this.id;
    }

    public toString = (): string => {
        return this.color + 'k';
    }
}