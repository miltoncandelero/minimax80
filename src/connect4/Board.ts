class Board {
	public matrix: number[][];
	public connect: number;
	public lines: { x1: number, y1: number, x2: number, y2: number }[];
	constructor(w: number, h: number, connect: number = 4) {
		this.connect = connect;
		this.matrix = [];
		this.lines = [];
		for (let i = 0; i < w; i++) {
			this.matrix[i] = [];
			for (let j = 0; j < h; j++) {
				this.matrix[i][j] = 0;
			}
		}
	}

	public getScore(): number {
		//player1 substracts
		//player2 adds
		this.lines = [];
		let score = 0;
		for (let i = 0; i < this.matrix.length - this.connect + 1; i++) {
			for (let j = 0; j < this.matrix[i].length - this.connect + 1; j++) {
				//assume we have a match in all 4 possible directions and then set to false if we see that a match didn't occur
				let sameH = true;
				let sameV = true;
				let sameD = true;
				let sameOtherD = true;
				const current = this.sign(this.matrix[i][j]);
				const otherCurrent = this.sign(this.matrix[this.matrix.length - 1 - i][this.matrix[this.matrix.length - 1 - i].length - 1 - j]);
				for (let c = 1; c < this.connect; c++) {
					//check the next horizontal ones
					if (this.sign(this.matrix[i + c][j]) != current) sameH = false;
					//check the next vertical ones
					if (this.sign(this.matrix[i][j + c]) != current) sameV = false;
					//check the next diagonals down right
					if (this.sign(this.matrix[i + c][j + c]) != current) sameD = false;
					//check the next diagonals down left
					if (this.sign(this.matrix[this.matrix.length - 1 - i - c][this.matrix[this.matrix.length - 1 - i - c].length - 1 - j + c]) != otherCurrent) sameOtherD = false;
				}

				//count the score
				if (sameH) {
					score += current;
				}
				if (sameV) {
					score += current;
				}
				if (sameD) {
					score += current;
				}
				if (sameOtherD) {
					score += otherCurrent;
				}

				//color
				for (let c = 0; c < this.connect; c++) {
					//check the next horizontal ones
					if (sameH) {
						this.matrix[i + c][j] = current * 2;
						this.lines.push({ x1: i, y1: j, x2: i + c, y2: j })
					}
					//check the next vertical ones
					if (sameV) {
						this.matrix[i][j + c] = current * 2
						this.lines.push({ x1: i, y1: j, x2: i, y2: j + c })
					}
					//check the next diagonals down right
					if (sameD) {
						this.matrix[i + c][j + c] = current * 2
						this.lines.push({ x1: i, y1: j, x2: i + c, y2: j + c })
					}
					//check the next diagonals down left
					if (sameOtherD) {
						this.matrix[this.matrix.length - 1 - i - c][this.matrix[this.matrix.length - 1 - i - c].length - 1 - j + c] = otherCurrent * 2;
						this.lines.push({ x1: this.matrix.length - 1 - i, y1: this.matrix[this.matrix.length - 1 - i].length - 1 - j, x2: this.matrix.length - 1 - i - c, y2: this.matrix[this.matrix.length - 1 - i - c].length - 1 - j + c })
					}
				}

			}
		}

		return score;
	}
	public getAvailableMoves(): { x: number, y: number }[] {
		const retval = [];
		for (let i = 0; i < this.matrix.length; i++) {
			for (let j = 0; j < this.matrix[i].length; j++) {
				if (this.matrix[i][j] != 0) {
					//if it's not empty, try to go up to find the empty spot
					if (j > 0) {
						retval.push({ x: i, y: j - 1 });
					}
					break;
				} else {
					//if it's empty, check if it's the bottom of the board
					if (j == this.matrix[i].length - 1) {
						retval.push({ x: i, y: j });
					}
				}
			}
		}
		return retval;
	}

	public putToken(x: number, y: number, player: -1 | 1) {
		this.matrix[x][y] = player;
	}

	public removeToken(x: number, y: number) {
		this.matrix[x][y] = 0;
	}

	private sign(x: number): -1 | 0 | 1 {
		if (x > 0) return 1;
		else if (x < 0) return -1;
		else return 0;
	}
}