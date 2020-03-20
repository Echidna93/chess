// create chessboard
// TODO: create stack of all moves played so that the moves can be "undone"
// TODO: display all moves on expandable log on the side of the screen
/* 
TODO: create square class, squares will have an x and y component as well
as a row signifier (i.e. a,b,c...h)
*/

var Pieces = [];
var Squares = [];
// Board will hold the squares
var Board = [[],[]];
var Rows = [];

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
    }
    isLegalMove(strt_sqr, trgt_sqr){
        if(((Math.abs(strt_sqr.x - trgt_sqr.x) == 0) || (Math.abs(strt_sqr.y - trgt_sqr.y) == 0)) || (Math.abs(strt_sqr.x - trgt_sqr.x) == Math.abs(strt_sqr.y - trgt_sqr.y))){
            return true;
        }
        return false;
    }
}

class Square{
    constructor(x, y, name, repr){
        this.x = x;
        this.y = y;
        this.v = [x, y];
        this.name = name;
        this.repr = repr;
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

function getDirectionVector(strt_sqr, trgt_sqr){
    // assume we have converted the row and col values that are assigned to
    // DOM elements to coordinate vectors
    //console.log("coord for start square: " + "(" + strt_sqr.x + ", " + strt_sqr.y + ")");
    //console.log("coord for target square: " + "(" + trgt_sqr.x + ", " + trgt_sqr.y + ")");

    x = trgt_sqr.x - strt_sqr.x;
    //console.log("x direction: " + strt_sqr.x + "-" + trgt_sqr.x);
    y = trgt_sqr.y - strt_sqr.y;
    //console.log("y direction: " + strt_sqr.y + "-" + trgt_sqr.y);
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
    else if(x==0 && y<0){
        return [0, -1];
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
   // console.log(target_square instanceof Square);
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

/*
    isBlocked a function that determines if path that piece takes is blocked
    arguments: crrnt_ is the starting position of the piece,
    trgt_square is the destination
    returns true if blocked (i.e. another piece is between the crrnt_sqr and trgt sqr)
    we only want to call this method if the 
*/


function isBlocked(strt_sqr, trgt_sqr){
    // get direction vector tuple
    // only run this for non-knight piecies
    var direction_vector =  getDirectionVector(strt_sqr, trgt_sqr);
    console.log("direction vector: " + direction_vector);
    console.log("target square : " + trgt_sqr.name);
    console.log("start square : " + strt_sqr.name);
    crnt_tuple = [];
    crnt_tuple[0] = strt_sqr.x;
    crnt_tuple[1] = strt_sqr.y;
    trgt = [];
    trgt[0] = trgt_sqr.x;
    trgt[1] = trgt_sqr.y;
    while(!(tuplesAreEqual(crnt_tuple, trgt))){
        crrnt_sqr = Board[[x],[y]];
        Board[[crnt_tuple[0]],[crnt_tuple[1]]];
        // if the element at crrnt_coord contains a child Node (i.e. a piece) and the crrnt_coord is not the trgt_coord
        // if we are in the target coordinate and the piece is of the opposite color return false--consider it an attack
        // return true
        //console.log("current tupe 0 : " + crnt_tuple[0]);
        //console.log("current tupe 1 : " + crnt_tuple[1]);
        
        crnt_tuple[0] += direction_vector[0];
        crnt_tuple[1] += direction_vector[1];
        crnt_square = getSquareByV(Squares, [crnt_tuple[0], crnt_tuple[1]]);
        console.log("debugging : " + crnt_square.name);
        if(tuplesAreEqual(crnt_tuple, trgt)){
            return false;
        }
        if(crnt_square.repr.hasChildNodes()){
            return true;
        }
    }
    return false;
}

/*
    Function determines whether or not two given tuples are equal,
    primarily used to determine whether or not a pieces path is blocked
*/

function tuplesAreEqual(strt, trgt){
    if((Math.abs(strt[0]-trgt[0])==0) && (Math.abs(strt[1]-trgt[1]==0))){
        return true;
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
                return true;    
        }
    return false;
}

function getSquareByV(Squares, vector){
    for(var i = 0; i < Squares.length; i++){
        if(tuplesAreEqual(Squares[i].v, vector)){
            return Squares[i];
        }
    }
}

/*
TODO: create loop to simulate creation of the pieces
don't create every piece individually
*/

function setPieces(){
    e7 = document.getElementById('e7');
    a6 = document.getElementById('a6');
    e6 = document.getElementById('e6');
    wht_queen = document.createElement('div');
    wht_queen2 = document.createElement('div');
    blck_king = document.createElement('div');
    blck_king.id = "black_king";
    blck_king.className = "piece blackking";
    wht_queen2.id = "white_queen2";
    wht_queen.id = "white_queen";
    wht_queen2.setAttribute("color", "white");
    wht_queen.setAttribute("color", "white");
    wht_queen.className = "piece whitequeen";
    wht_queen2.className = "piece whitequeen";
    blck_king.setAttribute("color", "black");
    e7.appendChild(wht_queen);
    a6.appendChild(blck_king);
    e6.appendChild(wht_queen2);
}

function associateReprToPieces(){
    black_king = new King("black_king", "black");
    white_queen = new Queen("white_queen", "white");
    white_queen2 = new Queen("white_queen2", "white");
    black_king.setRepr(document.getElementById("black_king"));
    white_queen.setRepr(document.getElementById("white_queen"));
    white_queen2.setRepr(document.getElementById("white_queen2"));
    Pieces.push(black_king);
    Pieces.push(white_queen);
    Pieces.push(white_queen2);
}

function createChessBoard(){    
    var board = document.createElement('table');
    board.className = 'board';
    for(var i = 8; i >= 1; i--){
        var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        var k = 0;
        var row = document.createElement('tr');
        for(var j = 1;  j < 9; j++){
            square = document.createElement('td');
            square.id = letters[k] + i;
            if((j+i) % 2 === 0){
                square.className = "square blacksquare";
            }else{
                square.className = "square whitesquare";    
            }
                row.appendChild(square);
                var square_object = new Square(i, j, letters[k] + (i), square);
                square.addEventListener('click', function(){
                    square_object.setIsSelected(true);
                });
                Squares.push(square_object);
                Board[[i],[j]] = square_object;
                k += 1;  
            }
                board.appendChild(row);
                
            }
    document.body.appendChild(board);
}

function getObjectByID(Objects, id){
    for(var i = 0; i < Objects.length; i++){
        if(Objects[i].name == id){
            return Objects[i];
        }
    }
}
function getObjectByIsSelected(Objects){
    for(var i = 0; i < Objects.length; i++){
       // console.log(Objects[i]);
        //console.log(Objects[i+1]);
        if(Objects[i].getIsSelected()){
           // console.log(Objects[i]);
            return Objects[i];
        }
    }
}
function movePiece(piece, target_square){
    //console.log(target_square.id);
    target_square.appendChild(piece);
}

createChessBoard();
setPieces();
associateReprToPieces();

/***********************************
  GAME
 ***************************************/

/*
    This will be peeled off into a file called main.js
    The following lines are used to simulate actual gameplay
*/

document.addEventListener('click', function(e){
    if(e.target.classList.contains('piece')){
        var name = e.target.id;
        object_to_select = getObjectByID(Pieces, name);
        object_to_select.setIsSelected(true);
    }
    else{
            selected_piece = getObjectByIsSelected(Pieces);
            //console.log(selected_piece.repr.parentElement.id);
            //console.log(e.target.id);
            strt_sqr = getObjectByID(Squares, selected_piece.repr.parentElement.id);
            trgt_sqr = getObjectByID(Squares, e.target.id);
            if(selected_piece.isLegalMove(strt_sqr, trgt_sqr) && !(isBlocked(strt_sqr, trgt_sqr))){          
                    if(e.target.hasChildNodes()){
                        var attacked_piece = getObjectByID(Pieces, e.target.firstChild.id);
                        //console.log(attacked_piece);
                        // verify that we aren't attacking piece of the same color
                        if(selected_piece.color !== attacked_piece.color){
                            attacked_piece.repr.remove();
                            e.target.appendChild(selected_piece.repr);
                        }else{
                            selected_piece.setIsSelected(false);
                        }
                    }
                    else{
                        e.target.appendChild(selected_piece.repr);
                        selected_piece.setIsSelected(false);
                    }
                }
                selected_piece.setIsSelected(false);
            }
    }, false);