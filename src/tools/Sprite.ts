class Sprite {
	id: number;
	x: number;
	y: number;
	colorkey: number;
	scale: number;
	flip: number | boolean = false;
	rotate: number;
	width: number = 1;
	height: number = 1;
	constructor(id: number, x: number = 0, y: number = 0, colorkey: number = 15, scale: number = 1, flip: number | boolean = false, rotate: number = 0, w: number = 1, h: number = 1) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.colorkey = colorkey;
		this.scale = scale;
		this.flip = flip;
		this.rotate = rotate;
		this.width = w;
		this.height = h;
	}

	draw() {
		spr(this.id, this.x, this.y, this.colorkey, this.scale, this.flip, this.rotate, this.width, this.height);
	}
}