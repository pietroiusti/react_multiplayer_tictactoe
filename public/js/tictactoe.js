"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HOST = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(HOST);

ws.onopen = function () {
  console.log('WebSocket Client Connected');

  // ws.send(JSON.stringify({
  //   type: 'connection',
  //   foo: 'foobar'
  // }));

  ws.onmessage = function (e) {
    console.log('Message Received:');
    console.log(JSON.parse(e.data));
  };
};

var ModalBg = function (_React$Component) {
  _inherits(ModalBg, _React$Component);

  function ModalBg(props) {
    _classCallCheck(this, ModalBg);

    var _this = _possibleConstructorReturn(this, (ModalBg.__proto__ || Object.getPrototypeOf(ModalBg)).call(this, props));

    _this.state = {
      value: ''
    };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(ModalBg, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var value = this.state.value;
      return React.createElement(
        'div',
        { className: 'modal-bg' },
        React.createElement(
          'div',
          { className: 'modal-content' },
          React.createElement('input', { autofocus: 'true', type: 'text', placeholder: 'Choose Room Number', onChange: this.handleChange }),
          React.createElement(
            'button',
            { id: 'roomButton', onClick: function onClick() {
                return _this2.props.handleSubmit(_this2.state.value);
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

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', null);
    }
  }]);

  return Board;
}(React.Component);

var Game = function (_React$Component3) {
  _inherits(Game, _React$Component3);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this4 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this4.state = {
      hideModalAndShowBoard: false
    };
    _this4.hideModalAndShowBoard = _this4.hideModalAndShowBoard.bind(_this4);
    _this4.handleSubmit = _this4.handleSubmit.bind(_this4);
    return _this4;
  }

  _createClass(Game, [{
    key: 'hideModalAndShowBoard',
    value: function hideModalAndShowBoard() {
      //this.setState({hideModalAndShowBoard: true});
      console.log('hello there');
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(value) {
      // console.log('hola');

      console.log(value);

      ws.send(JSON.stringify({
        type: 'connection',
        roomNumber: 666
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.hideModalAndShowBoard) {
        return React.createElement(
          'div',
          { className: 'game' },
          React.createElement(Board, null)
        );
      } else {
        return React.createElement(
          'div',
          { className: 'game' },
          React.createElement(ModalBg, { handleSubmit: this.handleSubmit })
        );
      }
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));