document.body.onload = createChessBoard;
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
                square.setAttribute('position', calcSquare(i, j))
                square.className = "whitesquare";
                square.addEventListener("click", function(){
                    var piece = document.getElementById('boo');
                    var num = Math.floor((Math.random() * 9 )+1);
                    var attribute = 'a' + num;
                    console.log(attribute);
                    random_square = document.querySelectorAll('[position="attribute"]');
                    console.log(random_square);
                    random_square.appendChild(piece);
                })
                row.appendChild(square);
                }
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
