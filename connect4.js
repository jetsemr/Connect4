/* ------------------------------------------
* File Name: connect4.js
* Author: Jet Semrick
* Date: 05-01-2021
* Description: Connect 4 using javascript, html, and css
-------------------------------------------*/

/* initialize turn to player 1 and create the gameboard */
let turn = 1;
let gameboard = [];
for (let i = 0; i < 7; i++) 
{
    gameboard.push([null,null,null,null,null,null,null]);
}

/*
* @name    : run
* @pre     : cell must be in string format "row-0-col-0"
* @post    : manages game state and checks the win condition
* @param   : cell i.e. area of game board clicked by user
* @return  : none
*/
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

/*
* @name    : selectRed
* @pre     : cell must be in string format "row-0-col-0"
* @post    : changes cell color to red
* @param   : cell i.e. area of game board affected
* @return  : none
*/
selectRed = (cell) => {
    document.getElementById(cell).style.backgroundColor = "red";
}

/*
* @name    : selectYellow
* @pre     : cell must be in string format "row-0-col-0"
* @post    : changes cell color to yellow
* @param   : cell i.e. area of game board affected
* @return  : none
*/
selectYellow = (cell) => {
    document.getElementById(cell).style.backgroundColor = "yellow";
}

/*
* @name    : selectBlue
* @pre     : cell must be in string format "row-0-col-0"
* @post    : changes cell color to blue
* @param   : cell i.e. area of game board affected
* @return  : none
*/
selectBlue = (cell) => {
    document.getElementById(cell).style.backgroundColor = "#5D5C61";
}

/*
* @name    : getRow
* @pre     : cell must be in string format "row-0-col-0"
* @post    : iterates the find the lowest empty cell in the selected column
* @param   : cell i.e. area of game board clicked by user
* @return  : num cellRow i.e. row where piece will go
*/
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

/*
* @name    : getCol
* @pre     : cell must be in string format "row-0-col-0"
* @post    : parses the cell string to get column
* @param   : cell i.e. area of game board clicked by user
* @return  : num cellCol i.e. column where piece will go
*/
getCol = (cell) => {
    cellCol = parseInt(cell.charAt(10));
    return cellCol;
}

/*
* @name    : checkHorizontalWin
* @pre     : none
* @post    : parses the gameboard for rows of 4 pieces in a horizontal row by the same player
* @param   : none
* @return  : bool, true if win detected, false else
*/
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

/*
* @name    : checkVerticalWin
* @pre     : none
* @post    : parses the gameboard for cols of 4 pieces in a vertical row by the same player
* @param   : none
* @return  : bool, true if win detected, false else
*/
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

/*
* @name    : checkRightDiagonalWin
* @pre     : none
* @post    : parses the gameboard for 4 pieces in a diagonal "/" by the same player
* @param   : none
* @return  : bool, true if win detected, false else
*/
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
/*
* @name    : checkLeftDiagonalWin
* @pre     : none
* @post    : parses the gameboard for 4 pieces in a diagonal "\" by the same player
* @param   : none
* @return  : bool, true if win detected, false else
*/
checkLeftDiagonalWin = () => {
    for (let i = 3; i < 7; i++)
    {
        for (let j = 7; j > 2; j--)
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

/*
* @name    : checkWin
* @pre     : none
* @post    : calls win condition checks
* @param   : none
* @return  : bool, true if win detected, false else
*/
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

    return false;
}

/*
* @name    : checkFull
* @pre     : none
* @post    : parses gameboard to check if the board is completely full i.e. unplayable
* @param   : none
* @return  : bool, true if board is full, false else
*/
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

/*
* @name    : animation
* @pre     : cell must be in string format "row-0-col-0"
* @post    : uses promises to "animate" the drop of the tokens
* @param   : cell where token will land
* @return  : none
*/
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
                        return new Promise((resolve, reject) => {
                            selectYellow("row-" + i.toString() + "-col-" + getCol(cell).toString());
                            setTimeout(() => {
                                resolve("resolved");
                            }, 50);
                        });
                    }
                    promise().then(() => {
                        selectBlue("row-" + i.toString() + "-col-" + getCol(cell).toString()); 
                    });
                }
                if (player == 1)
                {
                    let promise = function delay() {
                        return new Promise((resolve, reject) => {
                            selectRed("row-" + i.toString() + "-col-" + getCol(cell).toString());
                            setTimeout(() => {
                                resolve("resolved");
                            }, 50);
                        });
                    }
                    promise().then(() => {
                        selectBlue("row-" + i.toString() + "-col-" + getCol(cell).toString()); 
                    });
                }
                loop();
            }
        }, 50);
    }
    loop();
}