// INFO 463 - Thunderfrogs
// Cassandra Beaulaurier, Tamanh Nguyen, Gary Smith, Dominik Żmuda

'use strict';

var startX,
    startY,
    endX,
    endY, 
    relX,
    relY;

var letters = [[null, "b", "c", "a"], [null, "d", "f", "e"], ["i", "g", "h", null],
                [null, "j", "k", "l"], [null, "m", "o", "n"], ["r", "p", "q", null],
                [null, "s", "u", "t"], [null, "v", "x", "w"], [" ", "y", "z", null]];

// var letters = [[null, "b", "c", "a"], [null, "j", "k", "l"], [null, "s", "u", "t"], 
//                 [null, "d", "f", "e"], [null, "m", "o", "n"], [null, "v", "x", "w"],
//                 ["i", "g", "h", null], ["r", "p", "q", null], [" ", "y", "z", null]];

// records x and y coordinates of mousedown
function recordStart(event) {
    startX = event.pageX;
    startY = event.pageY;
    getRelativePosition()
}

// records x and y coordinates of mouseup and starts calculation process
function recordEnd(event) {
    endX = event.pageX;
    endY = event.pageY;

    matchAngle();
}

// gets mouse coordinates relative to canvas
function getRelativePosition() {
    var rect = document.getElementById("myCanvas").getBoundingClientRect();
    relX = startX - rect.left;
    relY = startY - rect.top;
}

// 
function matchAngle() {

    var box = getBox();
    if (startX == endX && startY == endY) {
        // TREAT AS CLICK
        if (box == 2 || box == 5 || box == 8) {
            console.log(letters[box][0]);
        } else {
            console.log(letters[box][3]);
        }
    } else {
        // TREAT AS GESTURE
        var angle = computeAngle();

        // compare angle to unit circle
        if (angle >= -135 && angle < -45) {
            if (letters[box][1]) {
                console.log(letters[box][1]);
            }
        } else if (angle >=-45 && angle < 45) {
            if (letters[box][3]) {
                console.log(letters[box][3]);
            }
        } else if (angle >= 45 && angle < 135) {
            if (letters[box][2]) {
                console.log(letters[box][2]);
            }
        } else {
            if (letters[box][0]) {
                console.log(letters[box][0]);
            }
        }
    }

}

// Credit to Martez Mott for this function, which we adapted to work in JavaScript
// Returns angle between two points in degrees
function computeAngle() {
    var radians = 0.0;
    if (startX != endX) {
        radians = Math.atan2(endY - startY, endX - startX);
    } else {
        if (endY < startY) {
            radians = -Math.PI / 2.0;     // -90 degrees is straight up
        } else if (endY > startY) {
            radians = +Math.PI / 2.0;     // 90 degrees is straight down
        }
    }
    var degrees = radians * (180/Math.PI);
    return degrees;
}

// returns the number of the box that the gesture begins in
// note: code is kind of backwards but the box numbers are correct
function getBox() {
    if (relX <= 116) {  // column 1
        if (relY <= 133) { // row 1
            return 0;
        } else if (relY > 133 && relY <= 266) { // row 2
            return 3;
        } else {    // row 3
            return 6;
        }
    } else if (relX > 116 && relX <= 224) {  // column 2
        if (relY <= 133) { // row 1
            return 1;
        } else if (relY > 133 && relY <= 266) { // row 2
            return 4;
        } else {    // row 3
            return 7;
        }
    } else {  // column 3
        if (relY <= 133) { // row 1
            return 2;
        } else if (relY > 133 && relY <= 266) { // row 2
            return 5;
        } else {    // row 3
            return 8;
        }
    }
}