// create chessboard
// TODO: create stack of all moves played so that the moves can be "undone"
// TODO: display all moves on expandable log on the side of the screen

// Board will hold the squares
var Pieces = [];
var Squares = [];
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
/*
 * PIECES CLASSES AND INHERITED CLASSES SECTION 
 */


// TODO: clean up all isLegalMove methods for piece classes
// TODO: create numMoves attribute that tracks number of moves individual piece has taken




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

class Pawn extends Piece{
    constructor(name, color){
        super(color);
        this.name = name;
    }
    isLegalMove(strt_sqr, trgt_sqr){
        console.log("this is the color of the piece " + this.color);
        if(!(isAttacking(trgt_sqr))){
            if(this.color == "white"){
                if((strt_sqr.x == trgt_sqr.x) && ((trgt_sqr.y - strt_sqr.y) == 1)){
                    return true;
            }
        }
        else{
                if((strt_sqr.x == trgt_sqr.x) && ((trgt_sqr.y - strt_sqr.y) == -1)){
                    return true;
                    }
                }
            }
        else{
            if(this.color == "white"){
                if((Math.abs(trgt_sqr.x - strt_sqr.x) == 1)){
                    return true;
                }
            }else{
                if((strt_sqr.y == trgt_sqr.y + 1) && (( trgt_sqr.x == strt_sqr.x - 1  )|| (trgt_sqr.x == strt_sqr.x + 1))){
                    return true;
                }
            }
        }
        return false;
    }
}

class Castle extends Piece{
    constructor(name, color){
        super(color);
        this.name = name;
    }
    isLegalMove(strt_sqr, trgt_sqr){
        // console.log(target_square_coordinates);
        // console.log(piece_coordinates);
        if((Math.abs(strt_sqr.x - trgt_sqr.x) == 0) || (Math.abs(trgt_sqr.y - strt_sqr.y) == 0)){
                return true;
            }
            return false;
        }
    }

class Knight extends Piece{
    constructor(name, color){
        super(color);
        this.name = name;
    }
    isLegalMove(strt_sqr, trgt_sqr){
        // console.log(target_square_coordinates);
        // console.log(piece_coordinates);
        if(((Math.abs(trgt_sqr.x - strt_sqr.x) == 2) && (Math.abs(trgt_sqr.y - strt_sqr.y) == 1)) || ((Math.abs(trgt_sqr.x - strt_sqr.x) == 1) && (Math.abs(trgt_sqr.y - strt_sqr.y) == 2))){
            return true;
        }
        return false;
    }
}

class Bishop extends Piece{
    constructor(name, color){
        super(color);
        this.name = name;
    }
    isLegalMove(strt_sqr, trgt_sqr){
        // console.log(target_square_coordinates);
        // console.log(piece_coordinates);
        if((Math.abs(trgt_sqr.y - strt_sqr.y) == Math.abs(trgt_sqr.y - strt_sqr.y))){
            return true;
        }
        return false;
    }
}
            
/*
* SQUARE CLASS METHODS AND SUCH
*/

// TODO: figure out if there are classes square should be inheriting from, i.e. board, row column? to further simplify code

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
    if(x>=1 && y>=1){
        return [1,1];
    }
    else if (x>=1 && y==0){
        return [1,0];
    }
    else if (x>=1 && y<0){
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
    isBlocked a function that determines if path that piece takes is blocked
    arguments: crrnt_ is the starting position of the piece,
    trgt_square is the destination
    returns true if blocked (i.e. another piece is between the crrnt_sqr and trgt sqr)
    we only want to call this method if the 
*/


function isBlocked(strt_sqr, trgt_sqr, selected_piece){
    // get direction vector tuple
    // only run this for non-knight piecies
    if(selected_piece instanceof Knight){
        return false;
    }
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
    //target_square.repr.hasChildNodes() ? console.log(target_square.name) : console.log('does not');
    if(target_square.repr.hasChildNodes()){
                //console.log("is attacking works");
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

function setPiecesHelper(square_name, color, piece_type){
    var name = square_name + "_" + color +"_" + piece_type;
    square = document.getElementById(square_name);
    piece = document.createElement('div');
    piece.id = name;
    piece.className = "piece " + color + piece_type;
    square.appendChild(piece);
}

function setPieces(){
    var square_to_piece_obj = [
        {square: "a1", color: "white", piece_type: "castle"}, 
        {square: "b1", color: "white", piece_type: "knight"}, 
        {square: "c1", color: "white", piece_type: "bishop"},
        {square: "d1", color: "white", piece_type: "queen"},
        {square: "e1", color: "white", piece_type: "king"},
        {square: "f1", color: "white", piece_type: "bishop"},
        {square: "g1", color: "white", piece_type: "knight"},
        {square: "h1", color: "white", piece_type: "castle"},
        {square: "a2", color: "white", piece_type: "pawn"},
        {square: "b2", color: "white", piece_type: "pawn"},
        {square: "c2", color: "white", piece_type: "pawn"},
        {square: "d2", color: "white", piece_type: "pawn"},
        {square: "e2", color: "white", piece_type: "pawn"},
        {square: "f2", color: "white", piece_type: "pawn"},
        {square: "g2", color: "white", piece_type: "pawn"},
        {square: "h2", color: "white", piece_type: "pawn"},
        {square: "a7", color: "black", piece_type: "pawn"},
        {square: "b7", color: "black", piece_type: "pawn"},
        {square: "c7", color: "black", piece_type: "pawn"},
        {square: "d7", color: "black", piece_type: "pawn"},
        {square: "e7", color: "black", piece_type: "pawn"},
        {square: "f7", color: "black", piece_type: "pawn"},
        {square: "g7", color: "black", piece_type: "pawn"},
        {square: "h7", color: "black", piece_type: "pawn"},
        {square: "a8", color: "black", piece_type: "castle"},
        {square: "b8", color: "black", piece_type: "knight"},
        {square: "c8", color: "black", piece_type: "bishop"},
        {square: "d8", color: "black", piece_type: "queen"},
        {square: "e8", color: "black", piece_type: "king"},
        {square: "f8", color: "black", piece_type: "bishop"},
        {square: "g8", color: "black", piece_type: "knight"},
        {square: "h8", color: "black", piece_type: "castle"},
    ]
    for(i = 0; i <square_to_piece_obj.length; i++){
        setPiecesHelper(square_to_piece_obj[i].square, square_to_piece_obj[i].color, square_to_piece_obj[i].piece_type);
    }
}

function associateReprToPieces(){
    white_pawn = new Pawn("white_pawn", "white");
    white_pawn2 = new Pawn("white_pawn2", "white");
    black_king = new King("black_king", "black");
    white_queen = new Queen("white_queen", "white");
    white_queen2 = new Queen("white_queen2", "white");
    black_pawn  = new Pawn("black_pawn", "black");
    black_castle = new Castle("black_castle", "black");
    black_bishop = new Bishop("black_bishop", "black");
    black_knight = new Knight("black_knight", "black");

    black_bishop.setRepr(document.getElementById("black_bishop"));
    black_king.setRepr(document.getElementById("black_king"));
    white_queen.setRepr(document.getElementById("white_queen"));
    white_queen2.setRepr(document.getElementById("white_queen2"));
    black_pawn.setRepr(document.getElementById("black_pawn"));
    white_pawn.setRepr(document.getElementById("white_pawn"));
    white_pawn2.setRepr(document.getElementById("white_pawn2"));
    black_castle.setRepr(document.getElementById("black_castle"));
    black_knight.setRepr(document.getElementById("black_knight"));

    Pieces.push(black_king);
    Pieces.push(white_queen);
    Pieces.push(white_queen2);
    Pieces.push(black_pawn);
    Pieces.push(white_pawn);
    Pieces.push(white_pawn2);
    Pieces.push(black_castle);
    Pieces.push(black_bishop);
    Pieces.push(black_knight);
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
                var square_object = new Square(j, i, letters[k] + (i), square);
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
//associateReprToPieces();

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
            if(selected_piece.isLegalMove(strt_sqr, trgt_sqr) && !(isBlocked(strt_sqr, trgt_sqr, selected_piece))){          
                    if(e.target.hasChildNodes()){
                        var attacked_piece = getObjectByID(Pieces, e.target.firstChild.id);
                        //console.log(attacked_piece);
                        // verify that we aren't attacking piece of the same color
                        if(selected_piece.color !== attacked_piece.color){
                            attacked_piece.repr.remove();
                            e.target.appendChild(selected_piece.repr);
                        }
                    }
                    else{
                        e.target.appendChild(selected_piece.repr);
                    }
                }
                selected_piece.setIsSelected(false);
            }
    }, false);