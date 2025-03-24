
/* 
  ===============================================================
  =               UTILITY & DRAWING FUNCTIONS                   =
  ===============================================================
*/

/**
 * Returns an array of shuffled integers from 0..(maxValue-1).
 * Equivalent to a "randperm" or "Fisher-Yates" shuffle.
 */
function randperm(maxValue) {
  // Generate number sequence
  const permArray = Array.from({ length: maxValue }, (_, i) => i);
  // Shuffle in place
  for (let b = maxValue - 1; b >= 0; b--) {
    const randPos = Math.floor(Math.random() * (b + 1));
    [permArray[b], permArray[randPos]] = [permArray[randPos], permArray[b]];
  }
  return permArray;
}

/**
 * Draws two squares (left and right) on the canvas. The squares can be color-coded.
 * @param {Object} c - The canvas context.
 * @param {string} colLeft - The color for the left square.
 * @param {string} colRight - The color for the right square.
 */
function drawBlank(c, colLeft, colRight) {
  const stimCanvas = document.getElementById("jspsych-canvas-stimulus");
  const ctx = c.getContext("2d");
  
  const squareWidth = 250;
  const margin = 70; // margin from the outside of the canvas
  const sqxstartpoint = (stimCanvas.width - squareWidth);

  // Draw left square
  ctx.fillStyle = colLeft;
  ctx.beginPath();
  ctx.fillRect(margin, 0, squareWidth, squareWidth);
  
  // Draw right square
  ctx.fillStyle = colRight;
  ctx.fillRect(sqxstartpoint - margin, 0, squareWidth, squareWidth);
  ctx.stroke();
}

/**
 * Draws two squares of black backgrounds and randomly placed white dots on one side (depending on condition).
 * One square has (313 + numDots) white dots out of 625, the other has 313 white dots out of 625.
 * @param {Object} c - The canvas context.
 * @param {number} numDots - The difference in the number of white dots vs. black dots.
 * @param {number} target_left - 1 if the left side is the 'target' (higher white dot count), 0 if right side is the target.
 */
function drawStim(c, numDots, target_left) {
  const stimCanvas = document.getElementById("jspsych-canvas-stimulus");
  const ctx = c.getContext("2d");

  const squareWidth = 250;
  const margin = 70;
  const cellSize = 10;     // Grid cell size for placing dots
  const totalCells = 625;  // 25x25 grid in each square
  const baseWhiteDots = 313;

  // Coordinates for squares
  const sqxstartpoint = (stimCanvas.width - squareWidth);

  // Draw the black boxes for the squares
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.fillRect(margin, 0, squareWidth, squareWidth);
  ctx.fillRect(sqxstartpoint - margin, 0, squareWidth, squareWidth);
  ctx.stroke();

  // Create permutations for left side (dotindex) and right side (dotindex2)
  const dotindex = randperm(totalCells);
  const dotindex2 = randperm(totalCells);

  // Create dot matrices specifying which positions are white (1) or black (0)
  let dotmatrix1 = [];
  let dotmatrix2 = [];

  for (let j = 0; j < totalCells; j++) {
    // For side 1: half are 313 white dots + the difference
    dotmatrix1[j] = dotindex[j] < (baseWhiteDots + numDots) ? 1 : 0;
    // For side 2: half are 313 white dots exactly
    dotmatrix2[j] = dotindex2[j] < baseWhiteDots ? 1 : 0;
  }

  // If target_left==1, then dotmatrix1 is for the left square, else it's for the right.
  let dotmatrixleft  = target_left === 1 ? dotmatrix1 : dotmatrix2;
  let dotmatrixright = target_left === 1 ? dotmatrix2 : dotmatrix1;



  // --- Count the white dots in each square ---
  const leftDotsCount = dotmatrixleft.reduce((acc, val) => acc + val, 0);
  const rightDotsCount = dotmatrixright.reduce((acc, val) => acc + val, 0);

  // Store them globally so we can retrieve them later
  window.lastWhiteLeft = leftDotsCount;
  window.lastWhiteRight = rightDotsCount;


  // Fill the left grid
  let k = 0;
  for (let x = margin; x < margin + squareWidth; x += cellSize) {
    for (let y = 0; y < squareWidth; y += cellSize) {
      ctx.beginPath();
      ctx.arc(x + cellSize / 2, y + cellSize / 2, 2, 0, 2 * Math.PI);
      ctx.fillStyle = dotmatrixleft[k] === 1 ? "#FFFFFF" : "#000000"; 
      ctx.fill();
      k++;
    }
  }

  // Fill the right grid
  k = 0;
  for (let x = sqxstartpoint - margin; x < (sqxstartpoint - margin) + squareWidth; x += cellSize) {
    for (let y = 0; y < squareWidth; y += cellSize) {
      ctx.beginPath();
      ctx.arc(x + cellSize / 2, y + cellSize / 2, 2, 0, 2 * Math.PI);
      ctx.fillStyle = dotmatrixright[k] === 1 ? "#FFFFFF" : "#000000";
      ctx.fill();
      k++;
    }
  }
}



/**
 * Adjusts the difficulty based on recent performance using a staircase method.
 * 
 * @param {number} dotsDiff - The current difficulty level (difference in dots).
 * @param {number[]} accuracy - An array containing accuracy results, where:
 *                              accuracy[1] is the result for the current trial,
 *                              accuracy[0] is the result for the previous trial.
 *                              A value of 1 indicates correct, 0 indicates incorrect.
 * @param {number} trialNum - The current trial number.
 * @returns {object} An object containing the updated difficulty, accuracy array, and trial number.
 */
function staircase(dotsDiff, accuracy, trialNum) {
  // If both the current and previous trials are correct:
  if (accuracy[1] === 1 && accuracy[0] === 1) {
    // Adjust the difficulty decrease based on the trial number:
    if (trialNum < 7) {
      // For early trials, decrease difficulty by 0.4
      dotsDiff -= 0.4;
    } else if (trialNum >= 7 && trialNum < 12) {
      // For mid trials, decrease difficulty by 0.2
      dotsDiff -= 0.2;
    } else if (trialNum >= 12) {
      // For later trials, decrease difficulty by 0.1
      dotsDiff -= 0.1;
    }
  }

  // If the last trial was incorrect:
  if (accuracy[1] === 0) {
    // Adjust the difficulty increase based on the trial number:
    if (trialNum < 7) {
      // For early trials, increase difficulty by 0.4
      dotsDiff += 0.4;
    } else if (trialNum >= 7 && trialNum < 12) {
      // For mid trials, increase difficulty by 0.2
      dotsDiff += 0.2;
    } else if (trialNum >= 12) {
      // For later trials, increase difficulty by 0.1
      dotsDiff += 0.1;
    }
  }

  // Enforce a minimum difficulty level (dotsDiff should not be less than 1)
  if (dotsDiff <= 1) {
    dotsDiff = 1;
  }

  // Return an object with the updated values
  return {
    diff: dotsDiff,
    accuracy: accuracy,
    trialnum: trialNum,
  };
}
