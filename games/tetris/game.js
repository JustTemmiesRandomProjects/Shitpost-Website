document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerID
    let score = 0

    //mini-display
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0
    let nextRandom = 0

    //timer in miliseconds
    var timer = 1000


    //SWITCH OUT LTETROMINO FOR JTETROMINO


    //Tetrominoes
    const jTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2*2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [jTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    //select a random tetromino
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    //draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    //undraw the current Tetroimno
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }


    //assign functions to keyCodes
    function control(event) {
        if (timerID) {
            if(event.keyCode === 37) {
                moveLeft()
            } else if (event.keyCode == 38) {
                rotate()
            } else if (event.keyCode == 39) {
                moveRight()
            } else if (event.keyCode == 40) {
                moveDown()
            }
        }
    }
    document.addEventListener('keydown', control)

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //make another tetromino start falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
        }
    }

    //move the tetromino left, unless there's something in the way
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }
        
        draw()
    }
    
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }
        
        draw()
    }

    function rotate() {
        undraw()
        currentRotation ++
        if(currentRotation === current.length) { //if the rotation reaches 4, make it 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    //the tetrominos without rotations
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //jTetromino
        [0, displayWidth,   displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth,   displayWidth+1, displayWidth+2], //tTetromino
        [0, 1,  displayWidth    ,displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1,   displayWidth*3+1] //iTetromino

    ]

    //display the tetromino in the mini-display
    function displayShape() {
        //undraw
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })

        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }

    
    StartBtn.addEventListener('click', () => {
        if (timerID) {
            clearInterval(timerID)
            timerID = null
        } else {
            draw()
            timerID = setInterval(moveDown, timer)
            nextRandom = Math.floor(Math.random()*theTetrominoes.lenght)
            displayShape()
        }
    })

    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 1
                ScoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                })
                const squaresRemoved = squres.splice(i, width)
                console.log(squaresRemoved)
            }
        }
    }


}) 