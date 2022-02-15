"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.createPost = exports.getPosts = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _postMessage = _interopRequireDefault(require("../models/postMessage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//here we create all the handlers for our routes
//we dw all the logic inside routes folder, so we leave them in the controller folder
var getPosts = function getPosts(req, res) {
  var postMessages;
  return regeneratorRuntime.async(function getPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_postMessage["default"].find());

        case 3:
          postMessages = _context.sent;
          //finding something inside of the model takes time, which means it is an asynchronous action. hence we need to add 'await' and 'async'
          // console.log(postMessages);
          res.status(200).json(postMessages); //need to return something

          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          //if there's error
          res.status(404).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getPosts = getPosts;

var createPost = function createPost(req, res) {
  var post, newPost;
  return regeneratorRuntime.async(function createPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          post = req.body;
          newPost = new _postMessage["default"](post);
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(newPost.save());

        case 5:
          res.status(201).json(newPost); //201 = successful creation

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](2);
          res.status(409).json({
            message: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports.createPost = createPost;

var updatePost = function updatePost(req, res) {
  var _id, post, updatedPost;

  return regeneratorRuntime.async(function updatePost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //extract the id from req.params so. also, while using object destructuring we can also rename our id to _id
          _id = req.params.id;
          post = req.body; //we're rcving data for updates in req.body
          //check if _id is really a mongoose object id:

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(404).send('No post with that id: ${_id}'));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndUpdate(_id, post, {
            "new": true
          }));

        case 6:
          updatedPost = _context3.sent;
          //2nd param we need to pass the whole updated post - line 36
          //new - true so that we can actually receive the updated version of that post
          //async action (line 42) so we add const updatedPost = await in front.
          res.json(updatedPost);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updatePost = updatePost;