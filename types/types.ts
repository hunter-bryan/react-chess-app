export enum player {
    white = 'w',
    black = 'b'
}

export const pieceImages: Record<string, ReturnType<typeof require>> = {
    'br': require('../assets/black_rook.png'),
    'bn': require('../assets/black_knight.png'),
    'bb': require('../assets/black_bishop.png'),
    'bq': require('../assets/black_queen.png'),
    'bk': require('../assets/black_king.png'),
    'bp': require('../assets/black_pawn.png'),
    'wr': require('../assets/white_rook.png'),
    'wn': require('../assets/white_knight.png'),
    'wb': require('../assets/white_bishop.png'),
    'wq': require('../assets/white_queen.png'),
    'wk': require('../assets/white_king.png'),
    'wp': require('../assets/white_pawn.png'),
}

export type Square = [number, number];