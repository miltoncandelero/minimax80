/// <reference path="./Board.ts" />

class Game {

	private readonly marginH = 61;
	private readonly marginV = 22;
	private readonly spacing = 17;

	public board: Board;
	public currentTurn: 1 | 2;

	public drawSize: number = 16;

	constructor() {
		this.board = new Board(7, 6)
		this.currentTurn = 1;
		let moves = this.board.getAvailableMoves();
		trace(moves.length);
		let flip = 0;
		while (!this.isGameOver()) {
			//const { x, y } = moves[Math.floor(Math.random() * moves.length)]
			//this.board.putToken(x, y, (flip++ % 2) ? -1 : 1);
			this.AI((flip++ % 2) ? -1 : 1, 4);
			//moves = this.board.getAvailableMoves();
		}
		trace("exited")
		trace(moves.length);
		trace(flip);
	}


	public draw() {
		for (let i = 0; i < this.board.matrix.length; i++) {
			for (let j = 0; j < this.board.matrix[i].length; j++) {
				let color = 0;
				const x = i * (this.spacing) + (this.marginH);
				const y = j * (this.spacing) + (this.marginV);
				switch (this.board.matrix[i][j]) {
					case -1:
						spr(13, x, y, 14, 1, 0, 0, 2, 2)
						color = 2;
						break;
					case 1:
						spr(45, x, y, 14, 1, 0, 0, 2, 2)
						color = 6;
						break;

				}
				//rect(x, y, this.drawSize, this.drawSize, color);

			}
		}
		for (let l of this.board.lines) {
			const { x1, y1, x2, y2 } = l;
			//line(x1 * (this.drawSize + 2) + (this.drawSize - 1), y1 * (this.drawSize + 2) + (this.drawSize - 1), x1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize, y1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize, 0)
			//line(x1 * (this.drawSize + 2) + (this.drawSize - 1), y1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize, x1 * (this.drawSize + 2) + (this.drawSize - 1) + this.drawSize, y1 * (this.drawSize + 2) + (this.drawSize - 1), 0)
			line(x1 * (this.spacing) + this.marginH + this.drawSize / 2, y1 * (this.spacing) + (this.marginV) + this.drawSize / 2, x2 * (this.spacing) + (this.marginH) + this.drawSize / 2, y2 * (this.spacing) + (this.marginV) + this.drawSize / 2, 0);
		}
	}

	public AI(player: -1 | 1, level: number) {
		const moves = this.board.getAvailableMoves();
		let options: { x: number, y: number, score: number }[] = [];
		for (let l = 0; l < level+1; l++) {
			options = [];
			for (const move of moves) {
				this.board.putToken(move.x, move.y, player);
				//analyze it
				options.push({ x: move.x, y: move.y, score: minimax(this.board, player == 1 ? -1 : 1, l) });
				//undo it
				this.board.removeToken(move.x, move.y);
			}
			if (options.some(v => v.score != 0)){
				break;
			}
		}
		if (options.length == 0) {
			throw ("ERROR! game should be over!");
		}
		//shuffe to fuck up the sort if all scores are the same
		options = options.sort((_a, _b) => Math.random() - 0.5);

		//now actually sort
		options = options.sort((a, b) => (a.score - b.score) * -player);

		this.board.putToken(options[0].x, options[0].y, player);
		trace("player " + player + " chose score " + "{"+options[0].x+","+options[0].y+","+options[0].score+"}"+ " from " + options.map(v => "{"+v.x+","+v.y+","+v.score+"}"));
	}

	public isGameOver(): boolean {
		return (this.board.getScore() != 0 || this.board.getAvailableMoves().length == 0);
	}
}