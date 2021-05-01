/*
File Name: connect4.js
Author: Jet Semrick
Date: 04-28-2021
Description: Connect 4.
Needs:
--add animations
*/

let turn = 1;
let gameboard = [];
for (let i = 0; i < 7; i++) 
{
    gameboard.push([null,null,null,null,null,null,null]);
}

run = (cell) => {
    let marked = document.getElementById(cell).style.backgroundColor;

    if (checkWin()) {
        alert("Game Over");
        return;
    }
    if (marked != "red" && marked != "yellow")
    {
        let runPromise = function winCondition() {
            return new Promise((resolve, reject) => {
            let player = (turn % 2);
            if (player == 0)
            {
                if (getRow(cell) == 0)
                {
                    selectRed("row-" + getRow(cell).toString() + "-col-" + getCol(cell).toString());
                    gameboard[getRow(cell)][getCol(cell)] = player; 
                }
                else
                { 
                    let promise = function delay() {
                        return new Promise((resolve, reject) => {
                            animation(cell);
                            setTimeout(() => {
                                resolve("resolved");
                            }, getRow(cell) * 50);
                        });
                    }
                    promise().then(() => {
                        selectRed("row-" + getRow(cell).toString() + "-col-" + getCol(cell).toString());
                        gameboard[getRow(cell)][getCol(cell)] = player;
                    });
                }
            }
            else 
            {
                if (getRow(cell) == 0)
                {
                    selectRed("row-" + getRow(cell).toString() + "-col-" + getCol(cell).toString());
                    gameboard[getRow(cell)][getCol(cell)] = player; 
                }
                else
                {
                    let promise = function delay() {
                        return new Promise((resolve, reject) => {
                            animation(cell);
                            setTimeout(() => {
                                resolve("resolved");
                            }, getRow(cell) * 50);
                        });
                    }
                    promise().then(() => {
                        selectYellow("row-" + getRow(cell).toString() + "-col-" + getCol(cell).toString());
                        gameboard[getRow(cell)][getCol(cell)] = player;
                    });
                }
            }
            setTimeout(() => {
                resolve()
            }, 400);
            turn++;
            });
        }

        runPromise().then(() => {
            if (checkWin())
            {
                let player = (turn % 2);
                if (player == 0)
                {
                    alert("Yellow Wins");
                }
                if (player == 1)
                {
                    alert("Red Wins");
                }
            }
            if (checkFull() && !checkWin())
            {
                alert("Tie! Gameboard is full.");
            }
        });
    }
}

selectRed = (cell) => {
    document.getElementById(cell).style.backgroundColor = "red";
}

selectYellow = (cell) => {
    document.getElementById(cell).style.backgroundColor = "yellow";
}

selectBlue = (cell) => {
    document.getElementById(cell).style.backgroundColor = "#5D5C61";
}

getRow = (cell) => {
    cellRow = parseInt(cell.charAt(4));

    while (gameboard[cellRow + 1][getCol(cell)] == null) {
        cellRow++;
        if (cellRow == 6)
        {
            return cellRow;
        }
    }
    return cellRow;
}

getCol = (cell) => {
    cellCol = parseInt(cell.charAt(10));
    return cellCol;
}

checkHorizontalWin = () => {
    for (let i = 0; i < 7; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if (gameboard[i][j] == 0 && gameboard[i][j + 1] == 0  && gameboard[i][j + 2] == 0  && gameboard[i][j + 3] == 0)
            {
                return true;
            }
            if (gameboard[i][j] == 1 && gameboard[i][j + 1] == 1  && gameboard[i][j + 2] == 1  && gameboard[i][j + 3] == 1)
            {
                return true;
            }
        }
    }
    return false;
}

checkVerticalWin = () => {
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 7; j++)
        {
            if (gameboard[i][j] == 0 && gameboard[i + 1][j] == 0  && gameboard[i + 2][j] == 0  && gameboard[i + 3][j] == 0)
            {
                return true;
            }
            if (gameboard[i][j] == 1 && gameboard[i + 1][j] == 1  && gameboard[i + 2][j] == 1  && gameboard[i + 3][j] == 1)
            {
                return true;
            }
        }
    }
    return false;
}

checkRightDiagonalWin = () => {
    for (let i = 3; i < 7; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            if (gameboard[i][j] == 0 && gameboard[i - 1][j + 1] == 0  && gameboard[i - 2][j + 2] == 0  && gameboard[i - 3][j + 3] == 0)
            {
                return true;
            }
            if (gameboard[i][j] == 1 && gameboard[i - 1][j + 1] == 1  && gameboard[i - 2][j + 2] == 1  && gameboard[i - 3][j + 3] == 1)
            {
                return true;
            }
        }
    }
}

checkLeftDiagonalWin = () => {
    for (let i = 3; i < 7; i++)
    {
        for (let j = 7; j > 3; j--)
        {
            if (gameboard[i][j] == 0 && gameboard[i - 1][j - 1] == 0  && gameboard[i - 2][j - 2] == 0  && gameboard[i - 3][j - 3] == 0)
            {
                return true;
            }
            if (gameboard[i][j] == 1 && gameboard[i - 1][j - 1] == 1  && gameboard[i - 2][j - 2] == 1  && gameboard[i - 3][j - 3] == 1)
            {
                return true;
            }
        }
    }
}

checkWin = () => {
    if (checkHorizontalWin())
    {
        return true;
    }
    if (checkVerticalWin())
    {
        return true;
    }
    if (checkRightDiagonalWin())
    {
        return true;
    }
    if (checkLeftDiagonalWin())
    {
        return true;
    }
}

checkFull = () => {
    let count = 0;
    for (let i = 0; i < 7; i++)
    {
        for (let j = 0; j < 7; j++)
        {
            if (gameboard[i][j] != null)
            {
                count++;
            }
        }
    }
    if (count == 49)
    {
        return true;
    }
    return false;
}

animation = (cell) => {
    let i = -1;

    function loop() {
        setTimeout(function() { 
            i++;
            if (i <= getRow(cell))
            {
                let player = (turn % 2);
                if (player == 0)
                {
                    let promise = function delay() {
                        console.log("Entered Function");
                        return new Promise((resolve, reject) => {
                            selectYellow("row-" + i.toString() + "-col-" + getCol(cell).toString());
                            setTimeout(() => {
                                console.log("Inside Function");
                                resolve("resolved");
                            }, 50);
                        });
                    }
                    promise().then(() => {
                        console.log("Function received.");
                        selectBlue("row-" + i.toString() + "-col-" + getCol(cell).toString()); 
                    });
                }
                if (player == 1)
                {
                    let promise = function delay() {
                        console.log("Entered Function");
                        return new Promise((resolve, reject) => {
                            selectRed("row-" + i.toString() + "-col-" + getCol(cell).toString());
                            setTimeout(() => {
                                console.log("Inside Function");
                                resolve("resolved");
                            }, 50);
                        });
                    }
                    promise().then(() => {
                        console.log("Function received.");
                        selectBlue("row-" + i.toString() + "-col-" + getCol(cell).toString()); 
                    });
                }
                loop();
            }
        }, 50);
    }
    loop();
}