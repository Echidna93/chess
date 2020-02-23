// create chessboard
function createChessBoard(){    
    var board = document.createElement('table');
    for(var i = 0; i < 8; i++){
        var row = document.createElement('tr');
        for(var j = 0;  j < 8; j++){
            // check parity of square
            if((j+i)%2 === 0){
                var square = document.createElement('td');
                square.setAttribute('position', calcSquare(i, j));
                if(square.getAttribute('position') == 'a0'){
                    var piece = document.createElement('div');
                    piece.className = 'rudpiece';
                    piece.id = 'boo';
                    square.appendChild(piece);
                }
                square.className = "blacksquare";
                row.appendChild(square);
            }else{
                var square = document.createElement('td');
                square.setAttribute('position', calcSquare(i, j));
                square.addEventListener("click", moveToRandomSquare);
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

createChessBoard();
// take in element to move to new table cell

function moveToRandomSquare(){
    var piece = document.getElementById('boo');
    //console.log(piece);
    var els = ['b0', 'b2', 'b4', 'b6', 'b8'];
    var num = Math.floor((Math.random() *  els.length)+1);
    var attribute = els[num];
    //console.log(attribute);
    squares = document.getElementsByClassName("whitesquare");
    //console.log(squares.legnth);
    console.log(squares[0]);
    for(var i = 0; i < squares.length; i++)
    {
        //console.log(squares[i].getAttribute("position"));
        if(squares[i].getAttribute("position") == attribute){
            console.log(squares[i].getAttribute('position'));
            squares[i].appendChild(piece);
        }
    }
}
    //console.log(random_square);
    //random_square.appendChild(piece);