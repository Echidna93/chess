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
                    piece.setAttribute("isSelected", false);
                    piece.addEventListener("click", function(){
                        piece.setAttribute("isSelected", true)
                    });
                    square.appendChild(piece);
                }
                square.className = "blacksquare";
                row.appendChild(square);
            }else{
                var square = document.createElement('td');
                square.setAttribute('position', calcSquare(i, j));
                square.setAttribute('isSelected', false);
                square.addEventListener("click", function(){
                    square.setAttribute("isSelected", true);
                });
                square.addEventListener("click", function(){
                    pieces = document.getElementsByClassName('rudpiece');
                    squares = document.getElementsByClassName('whitesquare');
                    console.log(square);
                    for(var j = 0; j < squares.length; j++){
                        if(squares[j].getAttribute('isSelected') == true){
                            var target = squares[j];
                        }                   
                    }
                    for(var i = 0; i < pieces.length; i++){
                        if(pieces[i].getAttribute('isSelected') == true){
                            target.appendChild(piece[i]);
                            piece[i].setAttribute('isSelected', false);
                            target.setAttribute('isSelected', false);
                }}});
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

function movePieceToSquare(){
    pieces = document.getElementsByClassName('rudpiece');
    for(var i = 0; i < pieces.length; i++){
        if(pieces[i].getAttribute('isSelected') == true){
            console.log(square);
            square.appendChild(piece[i]);
            piece[i].setAttribute('isSelected', false);
        }
    }
}


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