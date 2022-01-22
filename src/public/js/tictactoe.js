"use strict";
const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);

ws.onopen = function() {
  console.log('WebSocket Client Connected');

  // ws.send(JSON.stringify({
  //   type: 'connection',
  //   foo: 'foobar'
  // }));

  ws.onmessage = function(e) {
    console.log('Message Received:');
    console.log(JSON.parse(e.data));
  };
};

class ModalBg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }    
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    let value = this.state.value;
    return (
      <div className="modal-bg">
        <div className="modal-content">
          <input autofocus="true" type="text" placeholder="Choose Room Number" onChange={this.handleChange} />
          <button id="roomButton" onClick={()=>this.props.handleSubmit(this.state.value)}>Enter</button>
          <div id="error-message"></div>
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideModalAndShowBoard: false,
    };
    this.hideModalAndShowBoard = this.hideModalAndShowBoard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hideModalAndShowBoard() {
    //this.setState({hideModalAndShowBoard: true});
    console.log('hello there');
  }

  handleSubmit(value) {
    // console.log('hola');
   
    console.log(value);

    ws.send(JSON.stringify({
      type: 'connection',
      roomNumber: 666,
    }));
  }

  render() {
    if (this.state.hideModalAndShowBoard) {
      return (
        <div className="game">
          <Board />
        </div>
      );
    } else {
      return (
        <div className="game">
          <ModalBg handleSubmit={this.handleSubmit}/>
        </div>
      );
    }
  }  
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

