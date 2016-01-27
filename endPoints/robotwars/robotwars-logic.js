// #############################################################
// ROBOT WARS Logic
// #############################################################
 

/* =============================================================
 * Input
 * =============================================================

 * The first line of input: upper-right coordinates of the arena,
 * the lower-left coordinates are assumed to be (0, 0).

 * The rest of the input is information pertaining to the robots that have been deployed.
 * Each robot has two lines of input:
 * 1 - The first gives the robot’s position (type: two integers)
 * 2 - The second is a series of instructions telling the robot how to move within the arena (type: string)

  Input example:
    5 5
    1 2 N
    LMLMLMLMM
    3 3 E
    MMRMMRMRRM

*/ 

/* =============================================================
 * Output
 * =============================================================

 * The output for each robot should be its final coordinates and heading.

  Output example:
    1 3 N
    5 1 E
*/

function robotLogic(input) {
  // Format multiline string input
  var input = input.split('\n');
  // Arena size in a tuple format
  // arena = [xSize, ySize];
  var arena = input
                .shift()
                .split(' ')
                .map(str => parseInt(str));

  // In memory storage for n given robots.
  // Each robot internally will be represented as stateful object with x,y and headings properties
  var output = [];

  // Each robot will finish moving sequentially, which means that
  // the second robot won’t start to move until the first one has finished moving.
  for (var i = 0; i <= input.length / 2; i += 2) {
    var data = input[i].split(' ');

    var robot = {
      x: parseInt(data[0]),
      y: parseInt(data[1]),
      heading: data[2]
    };

    // Process each command by reducing the robot state
    // to its final position (coordinates and heading)
    input[i+1].split('').reduce((robot, cmd) => navigation(arena, robot, cmd), robot);

    output.push('' + robot.x + ' ' + robot.y + ' ' + robot.heading);
  }
  return output;


  // Navigation helper
  function navigation(arena, bot, cmd) {

    if (!arena) {
      throw new Error('arena must be defined');
    }
    if (!bot) {
      throw new Error('robbot must be defined');
    }

    var cardinalPoints = {
      N: ['W', 'E'],
      E: ['N', 'S'],
      S: ['E', 'W'],
      W: ['S', 'N']
    };

    // ‘L’ and ‘R’ make the robot spin 90 degrees to the left or right respectively 
    // without moving from its current spot
    if (cmd.match(/[R,L]/)) {
      cmd = (cmd === 'R') ? 1 : 0;
      bot.heading = cardinalPoints[bot.heading][cmd];
    }

    // ‘M’ means move forward one grid point and maintain the same heading.
    // Assume that the square directly North from (x, y) is (x, y+1).
    if (cmd === 'M') {
      if (bot.heading === 'N' && bot.y < arena[1]) {
        bot.y++;
      }
      if (bot.heading === 'S' && bot.y > 0) {
        bot.y--;
      }
      if (bot.heading === 'E' && bot.x < arena[0]) {
        bot.x++;
      }
      if (bot.heading === 'W' && bot.x > 0) {
        bot.x--;
      }
    }
    return bot;
  }
}

module.exports = robotLogic;
