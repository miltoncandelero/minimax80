/// <reference path="./Board.ts" />

class Game {

	public board: Board;
	public currentTurn: 1 | 2;

	public drawSize: number = 8;

	constructor() {
		this.board = new Board(8, 8)
		this.currentTurn = 1;
		let moves = this.board.getAvailableMoves();
		trace(moves.length);
		let flip = 0;
		while (moves.length > 0) {
			const { x, y } = moves[Math.floor(Math.random() * moves.length)]
			this.board.putToken(x, y, (flip++ % 2) ? -1 : 1);
			moves = this.board.getAvailableMoves();
		}
		trace(moves.length);
		trace(flip);
	}


	public draw() {
		for (let i = 0; i < this.board.matrix.length; i++) {
			for (let j = 0; j < this.board.matrix[i].length; j++) {
				let color = 0;
				switch (this.board.matrix[i][j]) {
					case -1:
						color = 2;
						break;
					case 1:
						color = 6;
						break;
					case -2:
						color = 8;
						break;
					case 2:
						color = 9;
						break;

				}
				rect(i * (this.drawSize + 2) + (this.drawSize - 1), j * (this.drawSize + 2) + (this.drawSize - 1), this.drawSize, this.drawSize, color);
			}
		}
		for (let l of this.board.lines) {
			const { x1, y1, x2, y2 } = l;
			line(x1 * (this.drawSize + 2) + (this.drawSize - 1), y1 * (this.drawSize + 2) + (this.drawSize - 1), x1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize, y1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize, 0)
			line(x1 * (this.drawSize + 2) + (this.drawSize - 1), y1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize, x1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize, y1 * (this.drawSize + 2) + (this.drawSize - 1), 0)
			line(x1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize / 2, y1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize / 2, x2 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize / 2, y2 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize / 2, 0);
		}
	}

	public isGameOver(): boolean {
		return this.board.getAvailableMoves().length == 0;
	}
}