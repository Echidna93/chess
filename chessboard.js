// create chessboard
// TODO: create stack of all moves played so that the moves can be "undone"
// TODO: display all moves on expandable log on the side of the screen
/* 
TODO: create square class, squares will have an x and y component as well
as a row signifier (i.e. a,b,c...h)
*/
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

class Piece{
    constructor(piece, class_name, color){
        this.piece = piece;
        this.class_name = class_name;
        this.piece.setAttribute("isSelected", false);
        this.piece.setAttribute("color", color);
    }
    setIsSelected(value){
                this.piece.setAttribute("isSelected", value);
        }
    getIsSelected(value){
                return this.piece.getAttribute("isSelected");
    }
    move(crrnt_square, trgt_square){

    }
}

class Square{
    constructor(square, x, y, color){
        this.square = square;
        this.x = x;
        this.y = y;
        this.color = color;
        this.square.setAttribute("isSelected", false);
        this.square.setAttribute("color", color);
    }

}

/*
direction vector
signum
implement a signum function that "mimics" one seen in Java's Math.signum
signum will take in two coordinates
subtract the x and y values for each coordinate
and return a direction vector
*/

function getDirectionVector(crrnt_coord, trgt_coord){
    // assume we have converted the row and col values that are assigned to
    // DOM elements to coordinate vectors
    x = crrnt_coord[0] - trgt_coord[0];
    y = crrnt_coord[1] - trgt_coord[1];
    if(x>=1 && y>1){
        return [1,1];
    }
    else if (x>0 && y==0){
        return [1,0];
    }
    else if (x>0 && y<0){
        return [1,-1];
    }
    else if (x==0 && y>0){
        return [0,1];
    }
    else if (x<0 && y>0){
        return [-1, 1];
    }
    else if(x<0 && y<0){
        return [-1, -1]
    }
    else if(x<0 && y==0){
        return [-1, 0]
    }
    return [0,0];
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
    var trgt_coord = [parseInt(target_square.getAttribute('row')), parseInt(target_square.getAttribute('col'))];
    if(isAttacking(target_square)){
        if(target_square.firstChild.getAttribute("color") == piece.getAttribute("color")){
            return false;
        }
    }
        // castle
        if(piece.classList.contains('castle')){
        // console.log(target_square_coordinates);
            // console.log(piece_coordinates);
            if((Math.abs(trgt_coord[0] - crrnt_coord[0]) == 0) || (Math.abs(trgt_coord[1] - crrnt_coord[1]) == 0)){
                        return true;
                }
            }
            // pawns
        else if(piece.classList.contains('blackpawn')){
            if(!(isAttacking(target_square))){
                if((trgt_coord[0] == crrnt_coord[0] + 1) && (trgt_coord[1] == crrnt_coord[1])){
                        return true;
                        }
                    }
            else{
                if((trgt_coord[0] == crrnt_coord[0] + 1) && (( trgt_coord[1] == crrnt_coord[1] - 1  )|| (trgt_coord[1] == crrnt_coord[1] + 1))){
                        return true;
                    }
                }
            }
        else if(piece.classList.contains('whitepawn')){
            if(!(isAttacking(target_square))){
                if((trgt_coord[0] == crrnt_coord[0] - 1) && (trgt_coord[1] == crrnt_coord[1])){
                        return true;
                        }
                    }
            else{
                if((trgt_coord[0] == crrnt_coord[0] - 1) && (( trgt_coord[1] == crrnt_coord[1] - 1  )|| (trgt_coord[1] == crrnt_coord[1] + 1))){
                        return true;
                    }
                }
            }
        // bishop
        else if(piece.classList.contains('blackbishop') || piece.classList.contains('whitebishop')){
                if((Math.abs(trgt_coord[0] - crrnt_coord[0]) == Math.abs(trgt_coord[1] - crrnt_coord[1]))){
                    return true;
                }
        }
        //knight
        else if(piece.classList.contains('whiteknight') || piece.classList.contains('blackknight')){
            if(((Math.abs(trgt_coord[0] - crrnt_coord[0]) == 2) && (Math.abs(trgt_coord[1] - crrnt_coord[1]) == 1)) || ((Math.abs(trgt_coord[0] - crrnt_coord[0]) == 1) && (Math.abs(trgt_coord[1] - crrnt_coord[1]) == 2))){
                return true;
            }
        }
        else if(piece.classList.contains('whitequeen') || piece.classList.contains('blackqueen')){ 
            if(((Math.abs(trgt_coord[0] - crrnt_coord[0]) == 0) || (Math.abs(trgt_coord[1] - crrnt_coord[1]) == 0)) || (Math.abs(trgt_coord[0] - crrnt_coord[0]) == Math.abs(trgt_coord[1] - crrnt_coord[1]))){
                return true;
            }
        }
        else if(piece.classList.contains('blackking') || piece.classList.contains('whiteking')){
            if(((Math.abs(trgt_coord[0] - crrnt_coord[0]) == 1) && (Math.abs(trgt_coord[1] - crrnt_coord[1]) == 0)) || ((Math.abs(trgt_coord[1] - crrnt_coord[1]) == 1) && (Math.abs(trgt_coord[0] - crrnt_coord[0]) == 0)) || ((Math.abs(trgt_coord[1] - crrnt_coord[1]) == 1) && (Math.abs(trgt_coord[0] - crrnt_coord[0]) == 1))){
                return true;
            }
        }
        console.log('illegal move');
        return false;
}

function tuplesAreEqual(crrnt_coord, trgt_coord){
    if(!((crrnt_coord[0]-trgt_coord[0]==0) && (crrnt_coord[1]-trgt_coord[1]==0))){
        return false;
    }
    return true;
}

/*
    isBlocked a function that determines if path that piece takes is blocked
    arguments: crrnt_ is the starting position of the piece,
    trgt_square is the destination
    returns true if blocked (i.e. another piece is between the crrnt_sqr and trgt sqr)
    we only want to call this method if the 
*/

function isBlocked(crrnt_coord, trgt_coord){
    // get direction vector tuple
    // only run this for non-knight piecies
    var direction_vector =  getDirectionVector(crrnt_coord, trgt_coord);
    while(!(tuplesAreEqual(crrnt_coord, trgt_coord))){
        crrnt_coord[0] += direction_vector[0];
        crrnt_coord[1] += direction_vector[1];
        // if the element at crrnt_coord contains a child Node (i.e. a piece) and the crrnt_coord is not the trgt_coord
        // if we are in the target coordinate and the piece is of the opposite color return false--consider it an attack
        // return true
        if(tuplesAreEqual(crrnt_coord, trgt_coord) && ){
            return 
        }
    }
    return flase;
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
        var a5 = document.getElementById('b5');
        var g0 = document.getElementById('g0');
        var g7 = document.getElementById('g7');
        var e7 = document.getElementById('e7');
        var a6 = document.getElementById('a6');
        
        var blck_pwn = document.createElement('div');
        var wht_pwn = document.createElement('div');
        var blck_cstl = document.createElement('div');
        var blck_bshp = document.createElement('div');
        var wht_kngt = document.createElement('div');
        var wht_queen = document.createElement('div');
        var blck_king = document.createElement('div');
        const black_king = new Piece(blck_king, "piece blackking");
        //black_king.sayHello();
        
        wht_pwn.className = 'piece whitepawn';
        wht_pwn.id = 'boo';
        wht_pwn.setAttribute("isSelected", false);
        wht_pwn.setAttribute("color", "white");
        blck_cstl.className = 'piece castle';
        blck_cstl.setAttribute("color", "black");
        blck_cstl.id = 'booff';
        blck_cstl.setAttribute("isSelected", false);
        blck_pwn.setAttribute("color", "black");
        blck_pwn.className = "piece blackpawn";
        blck_pwn.setAttribute('isSelected', false);
        blck_pwn.id = "blck-pwn";
        blck_bshp.setAttribute('isSelected', false);
        blck_bshp.setAttribute("color", "black");
        wht_kngt.className = "piece whiteknight";
        wht_kngt.setAttribute("isSelected", "false");
        wht_kngt.setAttribute("color", "white");
        wht_queen.setAttribute("isSelected", false);
        wht_queen.setAttribute("color", "white");
        wht_queen.className = "piece whitequeen";
        //blck_king.setAttribute("isSelected", false);
        blck_king.setAttribute("color", "black");
        blck_king.className = "piece blackking";

        
        a0.appendChild(blck_cstl);
        a1.appendChild(blck_pwn);
        a5.appendChild(wht_pwn);
        g0.appendChild(blck_bshp);
        g7.appendChild(wht_kngt);
        e7.appendChild(wht_queen);
        a6.appendChild(blck_king)
}


function createChessBoard(){    
    var board = document.createElement('table');
    board.className = 'board';
    for(var i = 0; i < 8; i++){
        var row = document.createElement('tr');
        for(var j = 0;  j < 8; j++){
            var square = document.createElement('td');
            var square_object = new Square(square, i, j);
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