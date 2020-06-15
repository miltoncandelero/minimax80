
/// <reference path="Sprite.ts" />

let t: number = 0;
const ticFace = new Sprite(1, 50, 50, 14, 3, 0, 0, 2, 2)

/**
 * TIC is the 'main' function and must be present in every program. It takes no parameters and is called sixty times per second (60fps). 
 */
function TIC(): void {
  if (btn(0)) {
    ticFace.y--;
  }
  if (btn(1)) {
    ticFace.y++;
  }
  if (btn(2)) {
    ticFace.x--;
  }
  if (btn(3)) {
    ticFace.x++;
  }

  cls(13);
  ticFace.id = 1 + Math.floor((t % 60) / 30) * 2
  ticFace.draw();
  print("HELLO WORLD!", 84, 84);
  t++;
}

/**
 * SCN() allows you to execute code between the drawing of each scan line, for example, to manipulate the palette. 
 * @param line 
 */
function SCN(_line: number) { }

/**
 * OVR() is called on every frame. It draws on a separate layer and can be used together with SCN() to create separate background or foreground layers and other visual effects. 
 */
function OVR() { }
