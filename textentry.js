// INFO 463 - Thunderfrogs
// Cassandra Beaulaurier, Tamanh Nguyen, Gary Smith, Dominik Żmuda

'use strict';

var startX,
    startY,
    endX,
    endY;

var letters = [[null, "b", "c", "a"], [null, "d", "f", "e"], ["i", "g", "h", null],
                [null, "j", "k", "l"], [null, "m", "o", "n"], ["r", "p", "q", null],
                [null, "s", "u", "t"], [null, "v", "x", "w"], [" ", "y", "z", null]];

// records x and y coordinates of mousedown
function recordStart(event) {
    startX = event.pageX;
    startY = event.pageY;

    console.log("x = " + startX + ", y = " + startY);
}

// records x and y coordinates of mouseup and starts calculation process
function recordEnd(event) {
    endX = event.pageX;
    endY = event.pageY;
    console.log("x = " + endX + ", y = " + endY);

    matchAngle();
}

// 
function matchAngle() {

    if (startX == endX && startY == endY) {
        // TREAT AS CLICK
        console.log("click");
    } else {
        // TREAT AS GESTURE
        var angle = computeAngle();
        console.log(angle);
        // TODO: unit circle if statements
        if (angle >= -135 && angle < -45) {
            console.log("upward");
            console.log(letters[0][1]);
        } else if (angle >=-45 && angle < 45) {
            console.log("rightward");
        } else if (angle >= 45 && angle < 135) {
            console.log("downward");
        } else {
            console.log("leftward");
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