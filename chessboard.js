// create chessboard
function createChessBoard(){    
    var board = document.createElement('table');
    for(var i = 0; i < 8; i++){
        var row = document.createElement('tr');
        for(var j = 0;  j < 8; j++){
            // check parity of square
            var square = document.createElement('td');
            //square.className = "square";
            square.setAttribute('position', calcSquare(i, j));
            square.setAttribute('isSelected', false);
            square.addEventListener('click', function(){
                //console.log('here');
                //console.log(square.getAttribute('position'))
                square.setAttribute('isSelected', true);
            });
            square.addEventListener("click", function(){
                pieces = document.getElementsByClassName('rudpiece');
                squares = document.getElementsByClassName('blacksquare');
                //console.log(squares.length);
                for(var j = 0; j < squares.length; j++){
                    console.log(squares[j].getAttribute('position').concat(": ").concat(squares[j].getAttribute('isSelected')))
                    if(squares[j].getAttribute('isSelected') == 'true'){
                        var target = squares[j];
                        console.log('here');
                    }                   
                }
                for(var i = 0; i < pieces.length; i++){
                    if(pieces[i].getAttribute('isSelected') == 'true'){
                        target.appendChild(pieces[i]);
                        pieces[i].setAttribute('isSelected', false);
                        target.setAttribute('isSelected', false);
            }}});
            if((j+i)%2 === 0){
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