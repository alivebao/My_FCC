import $ from 'jquery'

const React = require('react');
const ReactDOM = require('react-dom');

const RUNNING = 1;
const PAUSING = 0;
const STOP = -1;

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
  constructor(props){
    super(props);
  }
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

class GameBody extends React.Component{
  render() {
    return (
      <div id="game-body">
        {React.createElement(GameControlBtnGroup)}
      </div>
    );
  }
}

class GameWrapper extends React.Component{
  render() {
    return (
      <div>
        <GameHeader></GameHeader>
        <GameBody></GameBody>
      </div>
    );
  }
}

ReactDOM.render(
  <GameWrapper></GameWrapper>,
  document.querySelector('#wrapper')
);