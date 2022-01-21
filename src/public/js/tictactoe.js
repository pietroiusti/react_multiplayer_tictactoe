(function startApp () {

  const HOST = location.origin.replace(/^http/, 'ws');
  const ws = new WebSocket(HOST);

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

  class ModalBg extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
	display: true
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyUp = this.handleKeyUp.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }    
    
    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleKeyUp (event) {
      if (event.keyCode == 13) {
        this.setState({
          display: false
        });
      }
    }
    
    handleClick () {
      this.setState({
        display: false
      });
    }

    render() {
      if (this.state.display)
        return (
          <div className="modal-bg" onKeyUp={this.handleKeyUp} style={{display: this.state.display}}>
            <div className="modal-content">
              <input autofocus="true" type="text" placeholder="Choose Room Number"/>
              <button id="roomButton" onClick={this.handleClick}>Enter</button>
              <div id="error-message"></div>
            </div>
          </div>
        );
      else
        return null;
    }
  }

  class Game extends React.Component {
    render(){
      return (
	<div className="game">
          <ModalBg />
	</div>
      );
    }  
  }
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
})();
