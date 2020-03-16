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

var Pieces = [];
var Squares = [];
class Piece{
    constructor(color){ 
        this.repr = null;
        this.is_selected = false;
        this.color = color;
    }
    setRepr(repr){
        this.repr = repr;
    }
    setIsSelected(value){
                this.is_selected = value;
        }
    getIsSelected(){
                return this.is_selected;
    }
    //move(crrnt_square, trgt_square){}
}

class King extends Piece{
    constructor(name, color){
        super(color);
        this.name = name;
        this.id = "bk";
    } 
    isLegalMove(strt_sqr, trgt_sqr){
        if(((Math.abs( strt_sqr.x - trgt_sqr.x ) == 1) && (Math.abs(strt_sqr.y - trgt_sqr.y) == 0)) || ((Math.abs(strt_sqr.y - trgt_sqr.y) == 1) && (Math.abs(strt_sqr.x - trgt_sqr.x ) == 0)) || ((Math.abs(strt_sqr.y - trgt_sqr.y ) == 1) && (Math.abs(strt_sqr.x - trgt_sqr.x ) == 1))){
            return true; 
        }
        return false;
    }
}
class Queen extends Piece{
    constructor(name){
        super();
        this.name = name;
        this.id = "q";
    }
    isLegalMove(strt_sqr, trgt_sqr){
        if(((Math.abs(strt_sqr.x - trgt_sqr.x) == 0) || (Math.abs(strt_sqr.y - trgt_sqr.y) == 0)) || (Math.abs(strt_sqr.x - trgt_sqr.x) == Math.abs(strt_sqr.y - trgt_sqr.y))){
            return true;
        }
        return false;
    }
}
/*
class Queen extends Piece{
    constructor(name){
        super();
        this.name = name;
        this.id = 
    }
}
*/
class Square{
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.id = id;
        this.repr = document.createElement('td');
        this.isSelected = false;
    }
    getIsSelected(){
        return this.isSelected;
    }
    setIsSelected(value){
        this.isSelected = value;
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
    console.log(target_square instanceof Square);
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
/*
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
}*/

/*
isAttacking takes in target square
determines whether or not the square has a child element (i.e. a piece is currently occupying the square)
return: true if the piece is attacking; false otherwise
*/

function isAttacking(target_square){
    target_square.hasChildNodes() ? console.log(target_square.id) : console.log('does not');
    if(target_square.hasChildNodes()){
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
        var blck_king = document.createElement('div');
        blck_king.id = "black_king";
        blck_king.className = "piece blckking";
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
        wht_queen.id = "white_queen";
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
        a6.appendChild(blck_king);
}

function associateReprToPieces(){
        black_king = new King("black_king", "black");
        white_queen = new Queen("white queen", "white");
        Pieces[0] = black_king;
        Pieces[1] = white_queen;
        black_king.setRepr(document.getElementById("black_king"));
        black_king.repr.addEventListener("click", black_king.setIsSelected(true));
        white_queen.setRepr(document.getElementById("white_queen"));
        white_queen.repr.addEventListener("click", white_queen.setIsSelected(true));
}

function createChessBoard(){    
    var board = document.createElement('table');
    board.className = 'board';
    for(var i = 0; i < 8; i++){
        var row = document.createElement('tr');
        for(var j = 0;  j < 8; j++){
            var square = new Square(i, j, calcSquare(i,j));
            // var square_object = new Square(square, i, j);
            // square.setAttribute('isSelected', false);
            square.repr.id = square.id;
            square.repr.addEventListener('click', function(){
                square.setIsSelected(true);
            });
            if((j+i)%2 === 0){
                square.repr.className = "square blacksquare";
            }else{
                square.repr.className = "square whitesquare";    
            }
                row.appendChild(square.repr);
                Squares.push(square);
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
function getSquareByID(Squares, id){
    for(var i = 0; i < Squares.length; i++){
        if(Squares[i].id == id){
            return Squares[i]
        }
    }
}
function movePiece(piece, target_square){
    console.log(target_square.id);
    target_square.appendChild(piece);
}

/***********************************
  GAME
 ***************************************/

/*
    This will be peeled off into a file called main.js
    The following lines are used to simulate actual gameplay
*/
createChessBoard();
setPieces();
associateReprToPieces();

document.addEventListener('click', function(e){
    if(e.target.classList.contains('piece')){
        //e.target.id;
        //e.target.setIsSelected(true);
        //console.log(e.target);
        var name = e.target.id;
        for(var i = 0; i < Pieces.length; i++){
            Pieces[i].setIsSelected(true);
        }
        //console.log(Pieces[0].getIsSelected());
        // var coordinates = [e.target.parentElement.getAttribute('rownum'), e.target.parentElement.getAttribute('colnum')];
        // console.log(typeof parseInt(coordinates[1]));
    }
    else{
        //isAttacking(e.target) ? console.log(e.target.children) : console.log('does not');
        // = this.getElementsByClassName('piece');
        for(var i = 0; i < Pieces.length; i++){
            if(Pieces[i].getIsSelected()){
               // var selected_piece = Pieces[i];
                console.log(Pieces[i].repr);
                if(Pieces[i].isLegalMove(getSquareByID(Squares, Pieces[i].repr.parentElement.id), getSquareByID(Squares, e.target.id)) ){
                    //console.log('hitting here')
                    e.target.appendChild(Pieces[i].repr);
                    Pieces[i].setIsSelected(false);
                }
                //movePiece(Pieces[i], e.target);
            }
        }
        //movePiece(selected_piece, selected_piece.)

        /*
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
*/
            }
    }, false);