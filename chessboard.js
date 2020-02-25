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
function createChessBoard(){    
    var board = document.createElement('table');
    for(var i = 0; i < 8; i++){
        var row = document.createElement('tr');
        for(var j = 0;  j < 8; j++){
            // check parity of square
            var square = document.createElement('td');

            //square.className = "square";
            //row[i][j].td = square;
            square.id = calcSquare(i, j);
            square.setAttribute('isSelected', false);
            square.addEventListener('click', function(){
                //console.log('here');
                //console.log(square.getAttribute('position'))
                square.setAttribute('isSelected', true);
            });
            /*
                for(var i = 0; i < pieces.length; i++){
                    if(pieces[i].getAttribute('isSelected') == 'true'){
                        target.appendChild(pieces[i]);
                        pieces[i].setAttribute('isSelected', false);
                        target.setAttribute('isSelected', false);
            }}});
            */
            if((j+i)%2 === 0){
                
                if(square.getAttribute('id') == 'a0'){
                    var piece = document.createElement('div');
                    piece.className = 'piece';
                    piece.id = 'boo';
                    piece.setAttribute("isSelected", false);
                    /*piece.addEventListener("click", function(){
                        piece.setAttribute("isSelected", true)
                    });*/
                    square.appendChild(piece);
                }
                if(square.getAttribute('id') == 'a2'){
                    var piece = document.createElement('div');
                    piece.className = 'piece';
                    piece.id = 'booff';
                    piece.setAttribute("isSelected", false);
                    /*piece.addEventListener("click", function(){
                        piece.setAttribute("isSelected", true)
                    });*/
                    square.appendChild(piece);
                }
                
                square.className = "blacksquare";
            }else{
                // this always sets last square in the chessboard to be set
                // add listener to squares to select square for rudpiece to move to 

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

    /*square.addEventListener("click", function(){
    pieces = document.getElementsByClassName('rudpiece');
    squares = document.getElementsByClassName('blacksquare');
    //console.log(squares.length);
    for(var j = 0; j < squares.length; j++){
        console.log(squares[j].getAttribute('id').concat(": ").concat(squares[j].getAttribute('isSelected')))
        if(squares[j].getAttribute('isSelected') == 'true'){
            var target = squares[j];
            console.log('here');
        }                   
    }*/


//
//
//

function selectPiece(piece){
    piece.setAttribute("isSelected", true);
}

createChessBoard();
stack = new Stack();

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
