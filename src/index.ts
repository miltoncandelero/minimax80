
/// <reference path="connect4/Game.ts" />

const game = new Game();

/**
 * TIC is the 'main' function and must be present in every program. It takes no parameters and is called sixty times per second (60fps). 
 */
function TIC(): void {
  cls(13);
  game.draw();
  print(game.board.getScore().toString(), 84, 84);
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
