// create chessboard
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

function setPieces(){
        var a0 = document.getElementById('a0');
        var a2 = document.getElementById('a1');
        var piece = document.createElement('div');
        piece.className = 'piece';
        piece.id = 'boo';
        piece.setAttribute("isSelected", false);
        var piece2 = document.createElement('div');
        piece2.className = 'piece';
        piece2.id = 'booff';
        piece2.setAttribute("isSelected", false);
        a0.appendChild(piece2);
        a2.appendChild(piece);
}


function createChessBoard(){    
    var board = document.createElement('table');
    for(var i = 0; i < 8; i++){
        var row = document.createElement('tr');
        for(var j = 0;  j < 8; j++){
            var square = document.createElement('td');
            square.id = calcSquare(i, j);
            square.setAttribute('isSelected', false);
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
    if(e.target.className == 'piece'){
        e.target.id;
        e.target.setAttribute('isSelected', true);
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
