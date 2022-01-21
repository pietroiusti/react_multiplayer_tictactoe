var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function startApp() {

  var HOST = location.origin.replace(/^http/, 'ws');
  var ws = new WebSocket(HOST);

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

  var ModalBg = function (_React$Component) {
    _inherits(ModalBg, _React$Component);

    function ModalBg(props) {
      _classCallCheck(this, ModalBg);

      var _this = _possibleConstructorReturn(this, (ModalBg.__proto__ || Object.getPrototypeOf(ModalBg)).call(this, props));

      _this.state = {
        value: '',
        display: true
      };
      _this.handleChange = _this.handleChange.bind(_this);
      _this.handleKeyUp = _this.handleKeyUp.bind(_this);
      _this.handleClick = _this.handleClick.bind(_this);
      return _this;
    }

    _createClass(ModalBg, [{
      key: 'handleChange',
      value: function handleChange(event) {
        this.setState({ value: event.target.value });
      }
    }, {
      key: 'handleKeyUp',
      value: function handleKeyUp(event) {
        if (event.keyCode == 13) {
          this.setState({
            display: false
          });
        }
      }
    }, {
      key: 'handleClick',
      value: function handleClick() {
        this.setState({
          display: false
        });
      }
    }, {
      key: 'render',
      value: function render() {
        if (this.state.display) return React.createElement(
          'div',
          { className: 'modal-bg', onKeyUp: this.handleKeyUp, style: { display: this.state.display } },
          React.createElement(
            'div',
            { className: 'modal-content' },
            React.createElement('input', { autofocus: 'true', type: 'text', placeholder: 'Choose Room Number' }),
            React.createElement(
              'button',
              { id: 'roomButton', onClick: this.handleClick },
              'Enter'
            ),
            React.createElement('div', { id: 'error-message' })
          )
        );else return null;
      }
    }]);

    return ModalBg;
  }(React.Component);

  var Game = function (_React$Component2) {
    _inherits(Game, _React$Component2);

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
          React.createElement(ModalBg, null)
        );
      }
    }]);

    return Game;
  }(React.Component);

  ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));
})();