/*
File Name: connect4.js
Author: Jet Semrick
Date: 04-28-2021
Description: Connect 4.
Needs:
--reset
--fix bug where game ends before token is placed
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

    if (marked != "red" && marked != "yellow")
    {
        player = (turn % 2);
        if (player == 0)
        {
            selectRed("row-" + getRow(cell).toString() + "-col-" + getCol(cell).toString());
            gameboard[getRow(cell)][getCol(cell)] = player; 
        }
        else 
        {
            selectYellow("row-" + getRow(cell).toString() + "-col-" + getCol(cell).toString());
            gameboard[getRow(cell)][getCol(cell)] = player; 
        }
        turn++;

        if (checkWin())
        {
            if (player == 0)
            {
                alert("Red Wins");
            }
            if (player == 1)
            {
                alert("Yellow Wins");
            }
        }
        if (checkFull() && !checkWin())
        {
            alert("Tie! Gameboard is full.");
        }
    }
}

selectRed = (cell) => {
    document.getElementById(cell).style.backgroundColor = "red";
}

selectYellow = (cell) => {
    document.getElementById(cell).style.backgroundColor = "yellow";
}

getRow = (cell) => {
    cellRow = parseInt(cell.charAt(4));

    while (gameboard[cellRow + 1][getCol(cell)] == null) {
        console.log(cellRow);

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