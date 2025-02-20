/*!
* rete-dock-plugin v0.2.1 
* (c) 2022 Vitaliy Stoliarov 
* Released under the MIT license.
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rete = require('rete');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function createNode(_x, _x2) {
  return _createNode.apply(this, arguments);
}

function _createNode() {
  _createNode = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(component, position) {
    var node;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return component.createNode({});

          case 2:
            node = _context.sent;
            node.position = [position.x, position.y];
            return _context.abrupt("return", node);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createNode.apply(this, arguments);
}

var ClickStrategy =
/*#__PURE__*/
function () {
  function ClickStrategy(editor) {
    var _this = this;

    _classCallCheck(this, ClickStrategy);

    _defineProperty(this, "editor", void 0);

    _defineProperty(this, "position", void 0);

    this.editor = editor;
    this.position = {
      x: 0,
      y: 0
    };
    editor.on('click', function () {
      _this.position = editor.view.area.mouse;
    });
  }

  _createClass(ClickStrategy, [{
    key: "addComponent",
    value: function addComponent(el, component) {
      var _this2 = this;

      el.addEventListener('click',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var node;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return createNode(component, _this2.position);

              case 2:
                node = _context.sent;

                _this2.editor.addNode(node);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }]);

  return ClickStrategy;
}();

var DropStrategy =
/*#__PURE__*/
function () {
  function DropStrategy(editor) {
    _classCallCheck(this, DropStrategy);

    editor.view.container.addEventListener('dragover', function (e) {
      return e.preventDefault();
    });
    editor.view.container.addEventListener('drop',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(e) {
        var name, component, node;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (e.dataTransfer) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                name = e.dataTransfer.getData('componentName');
                component = editor.components.get(name);

                if (component) {
                  _context.next = 6;
                  break;
                }

                throw new Error("Component ".concat(name, " not found"));

              case 6:
                // force update the mouse position
                editor.view.area.pointermove(e);
                _context.next = 9;
                return createNode(component, editor.view.area.mouse);

              case 9:
                node = _context.sent;
                editor.addNode(node);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  _createClass(DropStrategy, [{
    key: "addComponent",
    value: function addComponent(el, component) {
      el.draggable = true;
      el.addEventListener('dragstart', function (e) {
        if (!e.dataTransfer) return;
        e.dataTransfer.setData('componentName', component.name);
      });
    }
  }]);

  return DropStrategy;
}();

function install(editor, _ref) {
  var container = _ref.container,
      plugins = _ref.plugins,
      _ref$itemClass = _ref.itemClass,
      itemClass = _ref$itemClass === void 0 ? 'dock-item' : _ref$itemClass;
  if (!(container instanceof HTMLElement)) throw new Error('container is not HTML element');
  var copy = new rete.NodeEditor(editor.id, editor.view.container);
  var clickStrategy = new ClickStrategy(editor);
  var dropStrategy = new DropStrategy(editor);
  plugins.forEach(function (plugin) {
    if (Array.isArray(plugin)) copy.use(plugin[0], plugin[1]);else copy.use(plugin);
  });
  editor.on('componentregister',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(c) {
      var component, el;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              component = Object.create(c);
              el = document.createElement('div');
              el.classList.add(itemClass);
              container.appendChild(el);
              clickStrategy.addComponent(el, component);
              dropStrategy.addComponent(el, component);
              component.editor = copy;
              _context.t0 = copy;
              _context.t1 = el;
              _context.next = 11;
              return component.createNode({});

            case 11:
              _context.t2 = _context.sent;
              _context.t3 = component.data;

              _context.t4 = function bindSocket() {};

              _context.t5 = function bindControl(element, control) {
                copy.trigger('rendercontrol', {
                  el: element,
                  control: control
                });
              };

              _context.t6 = {
                el: _context.t1,
                node: _context.t2,
                component: _context.t3,
                bindSocket: _context.t4,
                bindControl: _context.t5
              };

              _context.t0.trigger.call(_context.t0, 'rendernode', _context.t6);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}

var index = {
  name: 'dock',
  install: install
};

exports.default = index;
//# sourceMappingURL=dock-plugin.common.js.map
