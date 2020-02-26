
// create chessboard
// TODO: create stack of all moves played so that the moves can be "undone"
// TODO: display all moves on expandable log on the side of the screen
class Stack{
    constructor(){
        this.items = [];
    }
    push(element){
        this.items.push(element);
    }
    pop(){
        if(this.items.length == 0){
            return "underflow";
            return this.items.pop();
        }
    }
    isempty(){
        return this.items.length == 0;
    }

}
/*
class Piece(){
    constructor(){
        this.createElement('div');
        this.className = "piece";
        this.createAttribute('isSelected', f)
    }
}
*/
// legalMove takes in a start: row, column; end: row, col 
// takes in piece object
// returns a bool
// returns true if move is legal for piece
// returns false if not

function legalMove(piece, target_square){
    // get current position of the chess piece as a tuple of integers
    var piece_coordinates = [piece.parentElement.getAttribute('row'), piece.parentElement.getAttribute('col')]);
    // get target square coordinates as a tuple of integers
    var target_square_coordinates = [parseInt(target_square.getElementById('row')), parseInt(target_square.getElementById.getAttribute('col'))]
    // variable to be returned by the function to determine whether or not the move is legal
    // to be set in each case
    var is_legal = false;
    switch(piece.classList.contains()){
        case "castle":
                if()
            break;
        case "pawn":
            break;
    }
}

function setPieces(){
        var a0 = document.getElementById('a0');
        var a2 = document.getElementById('a1');
        var piece = document.createElement('div');
        piece.className = 'piece whitepawn';
        piece.id = 'boo';
        piece.setAttribute("isSelected", false);
        var piece2 = document.createElement('div');
        piece2.className = 'piece castle';
        piece2.id = 'booff';
        piece2.setAttribute("isSelected", false);
        a0.appendChild(piece2);
        a2.appendChild(piece);
}


function createChessBoard(){    
    var board = document.createElement('table');
    board.className = 'board';
    for(var i = 0; i < 8; i++){
        var row = document.createElement('tr');
        for(var j = 0;  j < 8; j++){
            var square = document.createElement('td');
            square.id = calcSquare(i, j);
            square.setAttribute('isSelected', false);
            square.setAttribute('row', i);
            square.setAttribute('col', j);
            square.addEventListener('click', function(){
                square.setAttribute('isSelected', true);
            });
            if((j+i)%2 === 0){
                square.className = "blacksquare";
            }else{
                square.className = "whitesquare";    
            }
                row.appendChild(square);
                }
                board.appendChild(row);
        
            }
    document.body.appendChild(board);
}


// calcSquare takes in row and column numbers and converts them
// to the unique code of the square

function calcSquare(row, column){
    return String.fromCharCode(97 + column) + row;
}


function selectPiece(piece){
    piece.setAttribute("isSelected", true);
}

createChessBoard();
setPieces();
stack = new Stack();
var tables = document.getElementsByClassName('board');
var table = tables[0];
console.log(table);
// takes in no arguments
// return: bool
// function determine whether or not there is a piece that is selected


function areNoPiecesSelected(){
    var pieces = document.getElementsByClassName('piece');
    if(pieces.length > 0){
        return false;
    }
    return true;
}

function isSelected(element){
    if(element.getAttribute('isSelected') == 'true'){
        return true;
    }
    return false;
}

document.addEventListener('click', function(e){
    if(e.target.classList.contains('piece')){
        e.target.id;
        e.target.setAttribute('isSelected', true);
        //var coordinates = [e.target.parentElement.getAttribute('rownum'), e.target.parentElement.getAttribute('colnum')];
        //console.log(typeof parseInt(coordinates[1]));
    }else{
    var pieces = this.getElementsByClassName('piece');
    for(var i = 0; i < pieces.length; i ++){
        if(isSelected(pieces[i])){
            var square = document.getElementById(e.target.id);
            square.append(pieces[i]);
            pieces[i].setAttribute('isSelected', false);
        }
    }
    //var pieces = document.getElementsByClassName('piece');
    console.log(stack.pop());
    //square.appendChild(pieces[0]);
    }
}, false);
