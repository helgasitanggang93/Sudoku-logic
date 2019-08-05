"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.generateBoard(board_string)
    this.zeroCoordinates = this.findZeroes()
  }

  solve() {
    let current = 0
    while (current < this.zeroCoordinates.length) {
      let counter = this.board[this.zeroCoordinates[current][0]][this.zeroCoordinates[current][1]]
      var flagCekHorizontal = false
      var flagCekVertical = false
      var flaGrid = false
      while ((flagCekHorizontal === false || flagCekVertical === false || flaGrid === false) && counter < 9) {
        counter++
        flagCekHorizontal = this.cekHorizontal(this.zeroCoordinates[current][0], counter, this.board)
        flagCekVertical = this.cekVertical(this.zeroCoordinates[current][1], counter, this.board)
        flaGrid = this.cekGrid(this.zeroCoordinates[current][0], this.zeroCoordinates[current][1], counter, this.board)
      }
      if (flagCekHorizontal === true && flagCekVertical === true && flaGrid === true) {
        let i = this.zeroCoordinates[current][0]
        let j = this.zeroCoordinates[current][1]
        this.board[i][j] = counter
        current++
      } else {
        this.board[this.zeroCoordinates[current][0]][this.zeroCoordinates[current][1]] = 0
        current--
      }
    }
    return this.board
  }

  generateBoard(string) {
    let arena = []
    let counter = 0
    for (let i = 0; i < 9; i++) {
      let subArena = []
      var flag = true
      while (flag === true) {
        subArena.push(Number(string[counter]))
        counter++
        if (counter % 9 === 0) {
          flag = false

        }
      }
      arena.push(subArena)

    }
    return arena

  }

  findZeroes() {
    let koordinat = []
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 0) {
          koordinat.push([i, j])
        }
      }
    }
    return koordinat
  }
  cekHorizontal(indexI, cekAngka, data) {
    for (let i = 0; i < 9; i++) {
      if (data[indexI][i] === cekAngka) {
        return false
      }

    }
    return true

  }
  cekVertical(indexJ, cekAngka, data) {
    for (let i = 0; i < 9; i++) {
      if (data[i][indexJ] === cekAngka) {
        return false
      }

    }
    return true

  }
  cekGrid(indexI, indexJ, cekAngka, data) {
    let awalI = indexI - (indexI % 3)
    let akhirI = indexI - (indexI % 3) + 2
    let awalJ = indexJ - (indexJ % 3)
    let akhirJ = indexJ - (indexJ % 3) + 2

    for (let i = awalI; i <= akhirI; i++) {
      for (let j = awalJ; j <= akhirJ; j++) {
        if (data[i][j] === cekAngka) {
          return false
        }

      }

    }
    return true

  }
}


var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
console.log(game.solve())
