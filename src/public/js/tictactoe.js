"use strict";
const HOST = location.origin.replace(/^http/, 'ws');
// const ws = new WebSocket(HOST);

// ws.onopen = function() {
//   console.log('WebSocket Client Connected');

//   // ws.send(JSON.stringify({
//   //   type: 'connection',
//   //   foo: 'foobar'
//   // }));

//   // ws.onmessage = function(e) {
//   //   let message = JSON.parse(e.data);

//   //   console.log('Message Received:');
//   //   console.log(message);
    
//   //   if (message.type === 'hideModalAndShowBoar')
//   //     console.log('I should hide the modal and show the board...');
//   // };
// };

// ws.onmessage = function(e) {
  // let message = JSON.parse(e.data);
  
  // console.log('Message Received:');
  // console.log(message);
  
  // if (message.type === 'hideModalAndShowBoard')
  //   console.log('I should hide the modal and show the board...');
// };

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
      <div>BOARD HERE (TODO)</div>
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

  componentDidMount() {
    this.ws = new WebSocket(HOST);
    this.ws.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    this.ws.onmessage = (e) => {
      let message = JSON.parse(e.data);
      console.log('Message Received:');
      console.log(message);
      
      if (message.type === 'hideModalAndShowBoard') {
        console.log('hideModalAndShowBoard message received...');
        this.setState({hideModalAndShowBoard: true});
      }
    };
  }

  hideModalAndShowBoard() {
    //this.setState({hideModalAndShowBoard: true});
    console.log('hello there');
  }

  handleSubmit(value) {
    this.ws.send(JSON.stringify({
      type: 'connection',
      roomNumber: value,
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

