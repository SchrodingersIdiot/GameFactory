let riverLength = 8
let riverWidth = 8
let tileZone = null
const primeList = []
let river = []
let stoneList = []
let count = 1
let xList = []
let yList = []
let fullMoveList = []
let firstMove = true 
console.log("fart")

for(t=2; t < 99; t++){
   let fart = false
   innerPoop: for(p=0;p<primeList.length;p++){
      Gary = t%primeList[p]
   
      if(Gary === 0){
         fart = true 
         break innerPoop
      }
   }
   if(fart){
      continue
   }

   primeList.push(t)
}
primeList.unshift(1)
function generateRiver(){
    for (let j = 0; j < riverLength; j++){
        let tempRiver = []
        for(let i=0; i < riverWidth; i++) {
            let John = Math.trunc(Math.random()*100) + 1

            tempRiver.push(rerollPrime(John))
        }
    river.push(tempRiver)
    }
    let columns = river[0].map((_, c) => river.map(r => r[c]));
    columns.forEach(row => {console.log(row.map(n => String(n).padStart(3)).join(" "));});
    return columns
}
let columns = generateRiver() 



let hyperPane = []
for(let q=0;q<9;q++){
    let superPane = []
    for(i=0; i<riverLength; i++){
        let tempPane = []
        ///add in prime stuff
        for(let p=0; p<riverWidth; p++){
            if(q === 0){
                tempPane.push(1)
            }
            else{
                tempPane.push(0)
            }

        }
        superPane.push(tempPane)
    }
    hyperPane.push(superPane)
}


hyperMapMaker(river)

const undoButton = document.getElementById("undo")
undoButton.addEventListener("click", handleUndo)
const orthoButton = document.getElementById("orthoButton")
const holeBoard = document.getElementById("river")
const countVisual = document.getElementById("count")
countVisual.textContent = count 
const resetButton = document.getElementById("resetButton")
resetButton.addEventListener("click", handleReset)



generateBoard()

function generateBoard(){

    for(i=0;i<columns.length;i++){
        columnZone = document.createElement("div")
        columnZone.classList.add("columnZone")
        columnZone.dataset.subIndex = i
        columnZone.addEventListener("click", handleCol)
        for(j=0;j<columns[i].length;j++){
            const tile = document.createElement("div")
            tile.classList.add("tile")
            tile.dataset.x = i
            tile.dataset.y = j
            tile.textContent = columns[i][j]
            tile.addEventListener("click", handleClick)
            if(primeList.includes(columns[i][j])){
                tile.style.background = "gray"
                tile.style.color = "white"

            }
            columnZone.appendChild(tile)
        }
        holeBoard.appendChild(columnZone)
    }
}

function handleClick(event){
    tileZone = event.target.dataset.y

}
function handleCol(event){
    let innit = false
    if(fullMoveList.length != 0 && fullMoveList.includes(event.currentTarget.dataset.subIndex+ tileZone)){
            innit = true
        }
    if(isLegal(count, event.currentTarget.dataset.subIndex, tileZone)){
        james = event.target
        james.style.backgroundColor = "brown"
        james.style.color = "white"
        james.style.boxSizing = "border-box"
        james.style.borderStyle = "dotted"
        
        if(innit){
            james.style.backgroundColor = "darkgray"
        }
        if(event.currentTarget.dataset.subIndex == riverWidth-1){
            win = document.createElement("div")
            win.classList.add("win")
            win.textContent = "YOU WIN!"
            event.currentTarget.appendChild(win)
            console.log("you win!")
        }
    }
    

    console.log("fart")
}

function handleUndo(){
    const x = parseInt(xList.at(-1))
    const y = parseInt(yList.at(-1))
    console.log(`Undoing tile at: ${x}, ${y}`)
    const psTile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
    console.log(x, y);
    console.log(psTile);
    psTile.style.backgroundColor = "lightblue"
    psTile.style.color = "black"
    psTile.style.borderStyle = "hidden"
    xList.pop()
    yList.pop()
    fullMoveList.pop()
    if(fullMoveList.length !== 0){
            const x = fullMoveList.at(-1)[0]
            const y = fullMoveList.at(-1)[1]
            console.log(`farting tile: ${x}, ${y}`)
            const psTile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
            console.log(x, y);
            console.log(psTile);
            psTile.style.borderStyle = "dotted"
        }
    if(fullMoveList.length == 0){
        firstMove = true
    }
    if(primeList.includes(parseInt(psTile.textContent))){
        psTile.style.backgroundColor = "gray"
        psTile.style.color = "white"
        return
    }
    count--
    countVisual.textContent = count 
}
function handleReset(){
    let newWidth = document.getElementById("width")
    let newHeight = document.getElementById("height")
    if(newWidth.value.length !=0){
        riverWidth = parseInt(newWidth.value)
        riverLength = parseInt(newHeight.value)
    }
    holeBoard.innerHTML = ""
    river = []
    stoneList = []
    count = 1
    xList = []
    yList = []
    fullMoveList = []
    firstMove = true 
    console.log(river)
    columns = generateRiver()
    generateBoard()
    countVisual.textContent = count 
}
function isLegal(count2, x, y){
    if(primeList.includes(columns[x][y])){
        if(fullMoveList.length !== 0){
            const x = fullMoveList.at(-1)[0]
            const y = fullMoveList.at(-1)[1]
            console.log(`fixing tile: ${x}, ${y}`)
            const psTile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
            console.log(x, y);
            console.log(psTile);
            psTile.style.borderStyle = "hidden"
        }
        xList.push(x)
        yList.push(y)
        fullMoveList.push(x+y)
        return true 
    }
    if(firstMove && x == 0){
        count++
        xList.push(x)
        yList.push(y)
        console.log(x + y)
        fullMoveList.push(x+y)
        countVisual.textContent = count 
        firstMove = false
        return true
    }
    const x1 = xList.at(-1)
    const y1 = yList.at(-1)
    gorf = isAdjacent(x,y,x1,y1)
    console.log(columns[x][y])
    if(columns[x][y]%count2 === 0 && gorf){
        count++
        if(count === 10){
            count = 1
        }
        countVisual.textContent = count 
        console.log(count)
        if(fullMoveList.length !== 0){
            const x = fullMoveList.at(-1)[0]
            const y = fullMoveList.at(-1)[1]
            console.log(`fixing tile: ${x}, ${y}`)
            const psTile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
            console.log(x, y);
            console.log(psTile);
            psTile.style.borderStyle = "hidden"
        }
        xList.push(x)
        yList.push(y)
        fullMoveList.push(x+y)
        console.log(fullMoveList.at(-1))
        return true 
    }
    else{
        return false
    }
}
function isAdjacent(x, y, x1, y1){
    if((Math.abs(x-x1) <= 1) && (Math.abs(y-y1) <= 1)){
        if(!(x === x1 && y === y1)){
             if(orthoButton.checked){
                if(!(Math.abs(x-x1) === 1 && Math.abs(y-y1) === 1)){
                    console.log("she is very orthogonal to me!")
                    return true 
                }
                return false
            }
            console.log("she is very adjacent to me!")
            return true
        }
    }
    return false
}
function hyperMapMaker(river){
    for(i=0; i<riverLength; i++){
        for(p=0; p<riverLength; p++){
            console.log(i)
            console.log(p)
            let pick = river[p][i]
            if(primeList.includes(pick)){
                for(u=0;u<9;u++){
                    hyperPane[u][i][p] = 1
                }
                
            }
            if(pick%9 === 0){
                hyperPane[8][i][p] = 1
                hyperPane[2][i][p] = 1
            }
            if(pick%8 === 0){
                hyperPane[7][i][p] = 1
                hyperPane[1][i][p] = 1
                hyperPane[3][i][p] = 1
            }
            if(pick%7===0){
                hyperPane[6][i][p] = 1
            }
            if(pick%6===0){
                hyperPane[5][i][p] = 1
                hyperPane[1][i][p] = 1
                hyperPane[2][i][p] = 1
            }
            if(pick%5===0){
                hyperPane[4][i][p] = 1
            }
            if(pick%4===0 && pick !== 1){
                hyperPane[3][i][p] = 1
                hyperPane[1][i][p] = 1
            }
            if(pick%3===0){
                hyperPane[2][i][p] = 1
                
            }
            if(pick%2===0 && pick !== 1){
                hyperPane[1][i][p] = 1
            }
        }
    }
}


function comingFrom(hyperPane, x, y, z){
    console.log(x.toString() + y.toString() + z.toString())
    for(p=0;p<3;p++){
        for(q=0;q<3;q++){
            let sx = x +(-1 + p)
            let sy = y + (-1 + q)
            let sz = z - 1
            if(sx<0 || sx > riverLength){
                sx = Math.max(sx, 0)
                sx = Math.min(sx, riverLength)
            }
            if(sy<0 || sy > riverWidth){
                sy = Math.max(sy, 0)
                sy = Math.min(sy, riverWidth)
            }
            if(sz<0 || sz > 8){
                sz = Math.max(sz, 0)
                sz = Math.min(sz, 8)
            }
            ///(x + (-1 + p) !== x && y +(-1 + q) !== y)
            if(((hyperPane[sz][sx][sy] === 1) && !(sx === x && sy === y))){
                let from = sx.toString() + sy.toString() + sz.toString()
                console.log(from + " found it! from")
                return[true, from]
            }
        }
    }
    if(true){
        console.log("bing")
        return [false, "bing"]
        
    }

}
function goingTo(hyperPane, x, y, z, from){
    console.log(x.toString() + y.toString() + z.toString())
    for(p=0;p<3;p++){
        for(q=0;q<3;q++){
            let sx = x +(-1 + p)
            let sy = y + (-1 + q)
            let sz = z + 1
            if(sx<0 || sx > riverLength){
                sx = Math.max(sx, 0)
                sx = Math.min(sx, riverLength)
            }
            if(sy<0 || sy > riverWidth){
                sy = Math.max(sy, 0)
                sy = Math.min(sy, riverWidth)
            }
            if(sz === 9){
                sz = 0
            }
            ///(x + (-1 + p) !== x && y +(-1 + q) !== y)
            if(((hyperPane[sz][sx][sy] === 1) && !(sx === x && sy === y) && !(from[1][0] === sx && from[1][1] === sy))){
                let to = sx.toString() + sy.toString() + sz.toString()
                console.log(to + " found it! to")
                return[true, to]
            }
        }
    }
    if(true){
        console.log("bing")
        return [false, "bing"]
        
    }

}
function checkShit(hyperPane, currentLocation){
    let info = []
    let x = parseInt(currentLocation[0], 10)
    let y = parseInt(currentLocation[1], 10)
    let z = parseInt(currentLocation[2], 10)
    const goop = river[x][y]
    console.log("break")
    columns[y][x] = "fart"
    columns.forEach(row => {
        console.log(row.map(n => String(n).padStart(3)).join(" "));
    });
    columns[y][x] = goop 
    let from = comingFrom(hyperPane, x, y, z)
    let to = goingTo(hyperPane, x, y, z, from)

    console.log(to[0])
    if(x == riverLength){
        console.log("whazt")
        return true
    }
    if(from[0] && to[0]){
        info.push(true)
        console.log("BAZINGA")
        let next = to[1][2]
        if(next == 9){
            next = 0
        }
        let newLocation = to[1][0] + to[1][1] + next
        console.log(newLocation)
        checkShit(hyperPane, newLocation)
    }
    else{
        hyperPane[z][x][y] = 0
        checkShit(hyperPane, from[1]) ///up z
    }
    
}
function pathFinder(hyperPane){
    outloop: for(c=1;c<11;c++){
        for(t=1;t<riverLength;t++){
            for(m=0;m<8;m++){
                x = t.toString()
                y = m.toString()
                z = c.toString()
                location = x + y + z
                console.log(location)
                console.log(river[t][m])
                console.log(checkShit(hyperPane, location)[0])
                if(checkShit(hyperPane, location)[0] == false){
                    continue
                }
                else{
                    console.log("yipee")
                    break outloop
                }
                }
            }
        }
    }

function rerollPrime(number){
   if(primeList.includes(number)){
         if(Math.random()>= 0.15){
            number = Math.random()*100
            number = Math.trunc(number)
            return rerollPrime(number)
         }
         else{
             return number
         }
      }
   else{
      return number 
   }

}

