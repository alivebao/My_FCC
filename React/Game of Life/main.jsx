import $ from 'jquery'

const React = require('react');
const ReactDOM = require('react-dom');

const START = 1;
const PAUSING = 0;
const STOP = -1;

const SMALL = 0;
const MIDDLE = 1;
const LARGE = 2;

let gameSpeed = 300;

let gameStatus = PAUSING;

function setGameStatus(param, ele){
  gameStatus = param;
  btnClickSlip(ele.target);
  if(gameStatus == STOP){
    $('.cell').addClass('dead')
  }
}

function aliveorDead(ele){
 if(Math.random() > 0.3){
    $(ele).addClass("dead");
  }else{
    $(ele).removeClass("dead");
  }
}
function btnClickSlip(ele){
  let jqObj = $(ele);
  jqObj.addClass("activeButton");

  function removeActiveStatue(){
    jqObj.removeClass("activeButton");
  }
  setTimeout(removeActiveStatue, 100);
}

$().ready(function() {
  $('.cell').click(function() {
    $(this).toggleClass("dead")
  });

  function checkStatus() {
    if(gameStatus !== START){
      return;
    }else{
      setTimeout(calAllCells, gameSpeed);
    }    
  }
  function calAllCells(){
    var iLength = $('.cell').length;  
    for(var i = 0 ; i < iLength ; i++){
      aliveorDead($('.cell')[i]);
    }
  }
  setInterval(checkStatus, 500)  
});

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
    let runBtn = React.createElement(GameButton, {"name":"Run", "handler": (e) => setGameStatus(START, e), "isLongerBtn": false});
    let pauseBtn = React.createElement(GameButton, {"name":"Pause", "handler": (e) => setGameStatus(PAUSING, e), "isLongerBtn": false});
    let clearBtn = React.createElement(GameButton, {"name":"Clear", "handler": (e) => setGameStatus(STOP, e), "isLongerBtn": false});
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
              return React.createElement("div", { className: ele.status, key: i , id: i});
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
    
    this.state = {
      width: initWidth,
      height: initHeight,
      boardSize: SMALL
    }
    this.updateBoardSize = this.updateBoardSize.bind(this);
  }

  updateBoardSize(boardSize){
    if(boardSize !== this.state.boardSize){
      if(boardSize == SMALL){
        this.setState({width: 50, height: 30, boardSize: SMALL});
      }else if(boardSize == MIDDLE){
        this.setState({width: 70, height:  50, boardSize: MIDDLE});
        ;
      }else if(boardSize == LARGE){
        this.setState({width: 100, height: 80, boardSize: LARGE});
      }    
    }    
  }

  render() {
    let totals = this.state.width * this.state.height;
    let arrCells = [];
    for(let i = 0 ; i < totals ; i++){
      arrCells[i] = {id: i, status: "cell" + (Math.random() < 0.7 ? " dead" : "") + (i % this.state.width == 0 ? " clear-all" : "")}
    }
    return (
      <div className="game-wrapper">
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

ReactDOM.render(
  <GameWrapper></GameWrapper>,
  document.querySelector('#wrapper')
);