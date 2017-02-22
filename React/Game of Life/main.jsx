import $ from 'jquery'

const React = require('react');
const ReactDOM = require('react-dom');

const RUNNING = 1;
const PAUSING = 0;
const STOP = -1;

const SMALL = 0;
const MIDDLE = 1;
const LARGE = 2;

let gameStatus = PAUSING;

class GameHeader extends React.Component{
  render() {
    return (
      <div id="game-header">
        <p>ReactJS Game of Life</p>
      </div>
    );
  }
}

class GameButton extends React.Component{  
  render() {
    return (
      <div>
        <button className={"game-button" + (this.props.isLongerBtn === true ? " longer-button" : "")} 
          onClick={this.props.handler}>
          {this.props.name}
        </button>
      </div>
    );
  }
}

class GameControlBtnGroup extends React.Component{
  render() {
    let runBtn = React.createElement(GameButton, {"name":"Run", "handler": (e) => setGameStatus(RUNNING, e), "isLongerBtn": false});
    let pauseBtn = React.createElement(GameButton, {"name":"Pause", "handler": (e) => setGameStatus(PAUSING, e), "isLongerBtn": true});
    let clearBtn = React.createElement(GameButton, {"name":"Clear", "handler": (e) => setGameStatus(STOP, e), "isLongerBtn": true});
    return (
      <div id="game-control-btn-group">
        {runBtn}
        {pauseBtn}
        {clearBtn}
      </div>
    );
  }
}

class GameBoardSetBtnGroup extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props.handler)
  }
  render() {
    let smallSizeBtn = React.createElement(GameButton, {"name":"Size: 50 x 30", "handler": (e) => this.props.handler(SMALL), "isLongerBtn": true});
    let middleSizeBtn = React.createElement(GameButton, {"name":"Size: 70 x 50", "handler": (e) => this.props.handler(MIDDLE), "isLongerBtn": true});
    let LargeSizeBtn = React.createElement(GameButton, {"name":"Size: 100 x 80", "handler": (e) => this.props.handler(LARGE), "isLongerBtn": true});
    return (
      <div id="game-boardsize-btn-group">
        {smallSizeBtn}
        {middleSizeBtn}
        {LargeSizeBtn}
      </div>
    );
  }
}

class GameBody extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div id="game-body">
        <div id="game-panel">
          {
            this.props.cells.map(function(ele, i) {
              return React.createElement("div", { className: ele.status, key: i });
            })
          }
        </div>
      </div>
    );
  }
}

class GameWrapper extends React.Component{
  constructor(props){
    super(props);

    let initWidth = 50;
    let initHeight = 30;
    let arr = [];
    for(let i = 0 ; i < initWidth * initHeight; i ++){
      arr[i] = {id: i, status: "cell dead"};
    }
    
    this.state = {
      width: initWidth,
      height: initHeight,
      cells: arr
    }
    this.updateBoardSize = this.updateBoardSize.bind(this);
  }

  updateBoardSize(boardSize){
    if(boardSize == SMALL){
      this.setState({width: 50});
      this.setState({height: 30});
    }else if(boardSize == MIDDLE){
      this.setState({width: 70});
      this.setState({height: 50});
    }else if(boardSize == LARGE){
      this.setState({width: 100});
      this.setState({height: 80});
    }    
  }

  render() {
    let totals = this.state.width * this.state.height;
    let arr = [];
    for(let i = 0 ; i < totals ; i++){
      arrCells[i] = {id: i, status: "cell dead"}
    }
    return (
      <div>
        <GameHeader></GameHeader>
        <GameControlBtnGroup></GameControlBtnGroup>

        <div className="clear-all"></div>
        <GameBody cells = {arrCells}></GameBody>
        <div className="clear-all"></div>

        <GameBoardSetBtnGroup handler={this.updateBoardSize}></GameBoardSetBtnGroup>
      </div>
    );
  }
}

function setGameStatus(param, ele){
  gameStatus = param;
  updateClickedEleClass(ele);
}

function updateClickedEleClass(ele){
  let jqObj = $(ele.target);
  jqObj.addClass("activeButton");
  if(jqObj.hasClass("longer-button")){
    //clear active class of same group and add active to clicked button    
  }else{
    //add active class and remove after 2s
  }
}

ReactDOM.render(
  <GameWrapper></GameWrapper>,
  document.querySelector('#wrapper')
);