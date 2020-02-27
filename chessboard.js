
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
legalMove takes in a start: row, column; end: row, col 
takes in piece object
returns a bool
returns true if move is legal for piece
returns false if not
*/

function isLegalMove(piece, target_square){
    // get current position of the chess piece as a tuple of integers
    var crrnt_coord = [parseInt(piece.parentElement.getAttribute('row')), parseInt(piece.parentElement.getAttribute('col'))];
    // get target square coordinates as a tuple of integers
    var trgt_coord = [parseInt(target_square.getAttribute('row')), parseInt(target_square.getAttribute('col'))]
    if(piece.classList.contains('castle')){
       // console.log(target_square_coordinates);
        // console.log(piece_coordinates);
        if(!((trgt_coord[0] != crrnt_coord[0]) && (crrnt_coord[1] != crrnt_coord[1]))){
                    return true;
            }
        }
    else if(piece.classList.contains('blackpawn')){
            if((trgt_coord[0] == crrnt_coord[0] + 1)){ 
                 return true;
             }
        }
    else if(piece.classList.contains('whitepawn')){
        if((trgt_coord[0] == crrnt_coord[0] - 1)){
                 return true;
                 }
            }
    return false;
    }
/*
isAttacking takes in target square
determines whether or not the square has a child element (i.e. a piece is currently occupying the square)
return: true if the piece is attacking; false otherwise
*/

function isAttacking(target_square){
    target_square.hasChildNodes() ? console.log(target_square.id) : console.log('does not');
    if(target_square.hasChildNodes()){
                console.log('here');
                return true;    
        }
    return false;
}

/*
TODO: create loop to simulate creation of the pieces
don't create every piece individually
*/

function setPieces(){
        var a0 = document.getElementById('a0');
        var a1 = document.getElementById('a1');
        var a5 = document.getElementById('a5');
        
        var blck_pwn = document.createElement('div')
        var wht_pwn = document.createElement('div');
        var blck_cstl = document.createElement('div');
        
        wht_pwn.className = 'piece whitepawn';
        wht_pwn.id = 'boo';
        wht_pwn.setAttribute("isSelected", false);
        blck_cstl.className = 'piece castle';
        blck_cstl.id = 'booff';
        blck_cstl.setAttribute("isSelected", false);
        blck_pwn.className = "piece blackpawn";
        blck_pwn.setAttribute('isSelected', false);
        blck_pwn.id = "blck-pwn";
        
        a0.appendChild(blck_cstl);
        a1.appendChild(blck_pwn);
        a5.appendChild(wht_pwn);
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

/*
    This will be peeled off into a file called main.js
    The following lines are used to simulate actual gameplay
*/
createChessBoard();
setPieces();


document.addEventListener('click', function(e){
    if(e.target.classList.contains('piece')){
        e.target.id;
        e.target.setAttribute('isSelected', true);
        //var coordinates = [e.target.parentElement.getAttribute('rownum'), e.target.parentElement.getAttribute('colnum')];
        //console.log(typeof parseInt(coordinates[1]));
    }else{
        //isAttacking(e.target) ? console.log(e.target.children) : console.log('does not');
        var pieces = this.getElementsByClassName('piece');
        for(var i = 0; i < pieces.length; i++){
            if(isSelected(pieces[i])){
                var selected_piece = pieces[i];
            }
        }
                if(isLegalMove(selected_piece, e.target)){
                    if(e.target.hasChildNodes()){
                        var attacked_piece = e.target.firstChild;
                        console.log(e.target.id);
                        attacked_piece.remove();
                        e.target.appendChild(selected_piece);
                    }else{
                        e.target.appendChild(selected_piece);
                        //console.log('not attacking')
                        //pieces[i].setAttribute('isSelected', false);
                    }
                    selected_piece.setAttribute('isSelected', false);
                }

            }
    }, false);