import $ from 'jquery'

const React = require('react');
const ReactDOM = require('react-dom');

const SMALL = 0;
const MIDDLE = 1;
const LARGE = 2;
const SLOW = 3;
const FAST = 4;
const START = 5;
const PAUSE = 6;
const STOP = 7;

let interalTime = 300;

class Game extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      width: 50,
      height: 30,
      gen: 0,
      interalTime: 200,
      gameStatus: START,
      cells: []
    }

    for(var i = 0 ; i < this.state.height ; i++){
      this.state.cells[i] = [];
      for(var j = 0 ; j < this.state.width ; j++){
        this.state.cells[i][j] = Math.random() > .7;
      }
    }

    this.calNextStatus = this.calNextStatus.bind(this);
    setInterval(this.calNextStatus, this.state.interalTime);
  }

  calNextStatus(){
    if(this.state.gameStatus != START){
      return;
    }
    var oriArr = this.state.cells;
    var nextArr = oriArr;

    for(var i = 0; i < this.state.height; i++){
      for(var j = 0; j < this.state.width; j++){
        var count = 0;
        oriArr[i][j] ? count++ : "";
        if(i - 1 >= 0){
          if(j - 1 >= 0){
            oriArr[i - 1][j - 1] ? count++ : "";
          }

          oriArr[i - 1][j] ? count++ : "";

          if(j + 1 <= this.state.width){
            oriArr[i - 1][j + 1] ? count++ : "";
          }
        }

        if(j - 1 >= 0){
          oriArr[i][j - 1] ? count++ : "";
        }

        if(j + 1 < this.state.width){
          oriArr[i][j + 1] ? count++ : "";
        }

        if(i + 1 < this.state.height){
          if(j - 1 >= 0){
            oriArr[i + 1][j - 1] ? count++ : "";
          }

          oriArr[i + 1][j] ? count++ : "";

          if(j + 1 <= this.state.width){
            oriArr[i + 1][j + 1] ? count++ : "";
          }
        }
        nextArr[i][j] = count >= 3 & Math.random() > 0.3 ? true : false;
      }
    }
    var curGen = this.state.gen;
    this.setState({
      gen: ++curGen,
      cells: nextArr
    });
  }

  updateInterval(param){
    switch(param){
      case SLOW:
        this.setState({interalTime: 500});
        break;
      case MIDDLE:
        this.setState({interalTime: 300});
        break;
      case FAST:
        this.setState({interalTime: 150});
        break;
    }
  }

  updateGameState(param){
    if(param == STOP){
      var arr = [];
      for(var i = 0 ; i < this.state.height ; i++){
        arr[i] = [];
        for(var j = 0 ; j < this.state.width ; j++){
          arr[i][j] = false;
        }
      }
      this.setState({cells: arr});
    }
    this.setState({gameStatus: param});
  }

  toggleCellState(e){
    var i = parseInt(e.target.id);
    var iX = Math.floor(i / this.state.width);
    var iY = i % this.state.width;
    var arr = this.state.cells;
    arr[iX][iY] = !this.state.cells[iX][iY];
    this.setState({cells: (arr)});
  }
  render(){
    return (
      <div className = "game-container">
        <h1>Game of Life</h1>
        <h4>Generation: {this.state.gen}</h4>

        <div> 
          <div className = "button-group">
              <button className = "btn btn-status-control" onClick={this.updateGameState.bind(this, START)}>Start</button>
              <button className = "btn btn-status-control" onClick={this.updateGameState.bind(this, PAUSE)}>Pause</button>
              <button className = "btn btn-status-control" onClick={this.updateGameState.bind(this, STOP)}>Clear</button>
          </div>
        </div>

        <div className = "game-body">
        {
          this.state.cells.map((row, i) =>
                <div  key={i} className="game-row">
                {
                  row.map((col, j) => <div onClick={this.toggleCellState.bind(this)} key={j} className={'cell ' + (this.state.cells[i][j] ? '' : 'dead')} id={i * this.state.width + j}></div>
                )}
                </div>
          )
        }
        </div>

        <div>
          <div className = "button-group">
            <button className = "btn btn-speed-control" onClick={this.updateInterval.bind(this, SLOW)}>Slow</button>
            <button className = "btn btn-speed-control" onClick={this.updateInterval.bind(this, MIDDLE)}>Middle</button>
            <button className = "btn btn-speed-control" onClick={this.updateInterval.bind(this, FAST)}>Fast</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game></Game>,
  document.querySelector('#wrapper')
);