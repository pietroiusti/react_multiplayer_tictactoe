var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function startApp() {

  var HOST = location.origin.replace(/^http/, 'ws');
  var ws = new WebSocket(HOST);

  /* WS #################################################### */
  ws.onopen = function () {
    console.log('WebSocket Client Connected');

    ws.send(JSON.stringify({
      type: 'connection',
      foo: 'foobar'
    }));

    ws.onmessage = function (e) {
      console.log('Message received from server');
      console.log(JSON.parse(e.data));
    };
  };
  /* WS #################################################### */

  var roomNumber = void 0;
  var mark = void 0;

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

  var ModalBg = function (_React$Component) {
    _inherits(ModalBg, _React$Component);

    function ModalBg(props) {
      _classCallCheck(this, ModalBg);

      var _this = _possibleConstructorReturn(this, (ModalBg.__proto__ || Object.getPrototypeOf(ModalBg)).call(this, props));

      _this.state = {
        display: 'flex'
      };
      return _this;
    }

    _createClass(ModalBg, [{
      key: 'hideModalBg1',
      value: function hideModalBg1() {
        this.setState({
          display: 'none'
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React.createElement(
          'div',
          { className: 'modal-bg', style: { display: this.state.display } },
          React.createElement(
            'div',
            { className: 'modal-content' },
            React.createElement('input', { autofocus: 'true', type: 'text', placeholder: 'Choose Room Number' }),
            React.createElement(
              'button',
              { id: 'roomButton', onClick: function onClick() {
                  return _this2.hideModalBg1();
                } },
              'Enter'
            ),
            React.createElement('div', { id: 'error-message' })
          )
        );
      }
    }]);

    return ModalBg;
  }(React.Component);

  function Square(props) {
    return React.createElement(
      'td',
      { className: 'square', onClick: props.onClick },
      props.value
    );
  }

  var Board = function (_React$Component2) {
    _inherits(Board, _React$Component2);

    function Board(props) {
      _classCallCheck(this, Board);

      var _this3 = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

      _this3.state = {
        squares: Array(9).fill(null),
        xIsNext: true
      };
      return _this3;
    }

    _createClass(Board, [{
      key: 'renderSquare',
      value: function renderSquare(i) {
        var _this4 = this;

        return React.createElement(Square, {
          value: this.state.squares[i],
          onClick: function onClick() {
            return _this4.handleClick(i);
          }
        });
      }
    }, {
      key: 'handleClick',
      value: function handleClick(i) {

        ws.send(JSON.stringify({ type: 'click' }));

        var squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var winner = calculateWinner(this.state.squares);
        var status = void 0;
        if (winner) status = 'Winner: ' + winner;else status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'status' },
            status
          ),
          React.createElement(
            'table',
            null,
            React.createElement(
              'tbody',
              null,
              React.createElement(
                'tr',
                { className: 'row' },
                this.renderSquare(0),
                this.renderSquare(1),
                this.renderSquare(2)
              ),
              React.createElement(
                'tr',
                { className: 'row' },
                this.renderSquare(3),
                this.renderSquare(4),
                this.renderSquare(5)
              ),
              React.createElement(
                'tr',
                { className: 'row' },
                this.renderSquare(6),
                this.renderSquare(7),
                this.renderSquare(8)
              )
            )
          )
        );
      }
    }]);

    return Board;
  }(React.Component);

  var Game = function (_React$Component3) {
    _inherits(Game, _React$Component3);

    function Game() {
      _classCallCheck(this, Game);

      return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
    }

    _createClass(Game, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'game' },
          React.createElement(ModalBg, null),
          React.createElement(
            'div',
            { id: 'board' },
            React.createElement(Board, null)
          ),
          React.createElement('div', { id: 'info' })
        );
      }
    }]);

    return Game;
  }(React.Component);

  ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));

  function calculateWinner(squares) {
    var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (var i = 0; i < lines.length; i++) {
      var _lines$i = _slicedToArray(lines[i], 3),
          a = _lines$i[0],
          b = _lines$i[1],
          c = _lines$i[2];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
})();