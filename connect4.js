/*
File Name: connect4.js
Author: Jet Semrick
Date: 04-28-2021
Description: Connect 4.
*/

let turn = 1;
let gameboard = [];
for (let i = 0; i < 7; i++) 
{
    gameboard.push([null,null,null,null,null,null,null]);
}

run = (cell) => {
    let marked = document.getElementById(cell).style.backgroundColor;
    console.log(getRow(cell));
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
            console.log(("row-" + getRow(cell).toString() + "-col-" + getCol(cell).toString()));
            selectYellow("row-" + getRow(cell).toString() + "-col-" + getCol(cell).toString());
            gameboard[getRow(cell)][getCol(cell)] = player; 
        }
        turn++;

        if (checkWin())
        {
            alert("Game Over");
        }
    }
}

selectRed = (cell) => {
    document.getElementById(cell).style.backgroundColor = "red";
}

selectYellow = (cell) => {
    console.log(cell);
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
        let consecutive = 0;
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

checkWin = () => {
    if (checkHorizontalWin())
    {
        return true;
    }
}