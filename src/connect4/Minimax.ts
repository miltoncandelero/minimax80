function minimax(board: Board, player: -1 | 1, currentDepth: number, maxDepth: number = Number.POSITIVE_INFINITY, alpha: number = Number.NEGATIVE_INFINITY, beta: number = Number.POSITIVE_INFINITY): number {
    const score = board.getScore();
    const moves = board.getAvailableMoves();
    if (score != 0 || moves.length == 0 || maxDepth == 0) {
        return score;
    }

    if (player == 1) {
        let maxEval = Number.NEGATIVE_INFINITY;
        for (const move of moves) {
            //do the move
            board.putToken(move.x, move.y, player);
            //analyze it
            const eval = minimax(board, -1, currentDepth + 1, maxDepth - 1, alpha, beta) - (currentDepth / 100 * player)
            //undo it
            board.removeToken(move.x, move.y);
            //store the big boi
            maxEval = Math.max(maxEval, eval)

            //pruning...
            alpha = Math.max(alpha, eval)
            if (beta <= alpha) break;

        }
        return maxEval
    }
    else {
        let minEval = Number.POSITIVE_INFINITY;
        for (const move of moves) {
            //do the move
            board.putToken(move.x, move.y, player);
            //analyze it
            const eval = minimax(board, 1, maxDepth - 1, alpha, beta)
            //undo it
            board.removeToken(move.x, move.y);
            //store the big boi
            minEval = Math.min(minEval, eval)

            //pruning
            beta = Math.max(beta, eval)
            if (beta <= alpha) break;

        }
        return minEval
    }

}