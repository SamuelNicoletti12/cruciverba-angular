export interface Cell {
    row: number;
    col: number;
    letter: string;
    solution: string;
    isBlocked: boolean;
    correct?: boolean;
}
