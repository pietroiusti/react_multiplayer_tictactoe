(function startApp () {

  const HOST = location.origin.replace(/^http/, 'ws');
  const ws = new WebSocket(HOST);

  /* WS #################################################### */
  ws.onopen = function() {
    console.log('WebSocket Client Connected');

    ws.send(JSON.stringify({
      type: 'connection',
      foo: 'foobar'
    }));

    ws.onmessage = function(e) {
      console.log('Message received from server');
      console.log(JSON.parse(e.data));
    };
  };
  /* WS #################################################### */

  let roomNumber;
  let mark;

  // function ModalBg(props) {
  //   function hideModalBg1() { // This works but it doesn't look like ``the react way''...
  //     document.querySelector('.modal-bg').style.display = 'none';
  //     roomNumber = document.getElementsByTagName('input')[0].value;
  //     console.log(roomNumber);
  //   }
  //   return (
  //     <div className="modal-bg">
  //       <div className="modal-content">
  //         <input autofocus="true" type="text" placeholder="Choose Room Number"/>
  //         <button id="roomButton" onClick={()=>hideModalBg1()}>Enter</button>
  //         <div id="error-message"></div>
  //       </div>
  //     </div>
  //   );
  // }

  class ModalBg extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
	display: 'flex'
      };
    }    
    
    hideModalBg1() {      
      this.setState({
        display: 'none'
      });
    }

    render() {
      return (
        <div className="modal-bg" style={{display: this.state.display}}>
          <div className="modal-content">
            <input autofocus="true" type="text" placeholder="Choose Room Number"/>
            <button id="roomButton" onClick={()=>this.hideModalBg1()}>Enter</button>
            <div id="error-message"></div>
          </div>
        </div>
      );
    }
  }

  function Square(props) {
    return (
      <td className="square" onClick={props.onClick}>
        {props.value}
      </td>
    );
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
	squares: Array(9).fill(null),
	xIsNext: true,
      };
    }
    
    renderSquare(i) {
      return (
	<Square 
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
	/>
      );
    }
    
    handleClick(i) {

      ws.send(JSON.stringify({type: 'click'}));

      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i])
	return;
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
	squares: squares,
	xIsNext: !this.state.xIsNext
      });
    } 
    
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner)
	status = 'Winner: ' + winner;
      else
	status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      
      return (
	<div>
	  <div className="status">{status}</div>
	  <table>
	    <tbody>
              <tr className="row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
              </tr>
              <tr className="row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
              </tr>
              <tr className="row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
              </tr>
	    </tbody>
	  </table>
	</div>
      );
    }
  }

  class Game extends React.Component {
    render(){
      return (
	<div className="game">
          <ModalBg />
          <div id="board">
            <Board />  
          </div>
          <div id="info">
          </div>
	</div>
      );
    }  
  }

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	return squares[a];
      }
    }
    return null;
  }
})();
