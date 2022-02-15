"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.createPost = exports.fetchPosts = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//specify the url
var url = "http://localhost:4000/posts";

var fetchPosts = function fetchPosts() {
  return _axios["default"].get(url);
};

exports.fetchPosts = fetchPosts;

var createPost = function createPost(newPost) {
  return _axios["default"].post(url, newPost);
}; //call back function where (newPost) is taking in the entire post --> then axios and url, and the data we r sending


exports.createPost = createPost;

var updatePost = function updatePost(id, updatedPost) {
  return _axios["default"].patch("".concat(url, "/").concat(id), updatedPost);
};

exports.updatePost = updatePost;