# Bomberman

## Background

Bomberman is an arcade-style, maze-based video game. In Bomberman, a player must defeat enemies and reach an exit to progress through levels. Gameplay involves strategically placing bombs, which explode in multiple directions after a certain amount of time, in order to destroy obstacles and eliminate enemies. The player can pick up various powerups that will facilitate their advancement, such as increased speed or more powerful bombs. The player is killed if they touch an enemy or are caught up within a bomb's explosion, even their own.

## Functionality & MVP

In Bomberman, users will be able to:

- [ ] Move their player using the arrow key controls
- [ ] Place bombs using the spacebar button
- [ ] View the number of remaining lives they have
- [ ] View start, pause, and game over screens

## Wireframes

This app will consist of a single screen with game board, game controls, and nav links to my Github and LinkedIn. Game controls will include start, pause, and reset buttons. The game controls are rather simple (W,A,S,D and spacebar) so a minimalistic how-to featuring images of those keys is all that will be needed in terms of explanation. This will be found on the sidebar, along with the nav links.

!(Landing page)[docs/wireframes/bomberman.png]


## Architecture and Technologies

This project will be implemented with the following technologies:

* Vanilla Javascript and jquery for overall structure and game logic.

* Easel.js with HTML5 Canvas for DOM manipulation and rendering.

* Webpack to bundle and serve up the various scripts.

## Implementation TImeline

**Day 1:** Setup all necessary Node modules, including getting webpack up and running and Easel.js installed. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 3 scripts outlined above. Learn the basics of Easel.js. Goals for the day:

* Get a green bundle with webpack
* Learn enough Easel.js to render an object to the Canvas element

**Day 2:** Dedicate this day to learning the Easel.js API. Build out Tile object to connect to the board object. Then user board.js to create and render a grid, ideally all four grid types (empty, obstacle, explodable, exit).

**Day 3:** Install the controls for the user to interact with the game (place a bomb) and for destructive properties of bomb.

**Day 4** Introduce enemies, which kill player on touch. Create exit for level. Style and polish frontend.

## Bonus features

* Timer that kills player when reaches 0:00
* Player-like enemies that can plant bombs
* Music
* High-score
* Multiple levels
