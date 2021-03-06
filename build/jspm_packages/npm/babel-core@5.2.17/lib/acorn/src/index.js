/* */ 
"format cjs";
"use strict";

exports.__esModule = true;

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api].
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

exports.parse = parse;

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

exports.parseExpressionAt = parseExpressionAt;

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenize` export provides an interface to the tokenizer.
// Because the tokenizer is optimized for being efficiently used by
// the Acorn parser itself, this interface is somewhat crude and not
// very modular.

exports.tokenizer = tokenizer;
// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/marijnh/acorn/issues
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

var _Parser = require("./state");

var _getOptions = require("./options");

require("./parseutil");

require("./statement");

require("./lval");

require("./expression");

require("./lookahead");

exports.Parser = _Parser.Parser;
exports.plugins = _Parser.plugins;
exports.defaultOptions = _getOptions.defaultOptions;

var _SourceLocation = require("./location");

exports.SourceLocation = _SourceLocation.SourceLocation;
exports.getLineInfo = _SourceLocation.getLineInfo;

var _Node = require("./node");

exports.Node = _Node.Node;

var _TokenType$types = require("./tokentype");

exports.TokenType = _TokenType$types.TokenType;
exports.tokTypes = _TokenType$types.types;

var _TokContext$types = require("./tokencontext");

exports.TokContext = _TokContext$types.TokContext;
exports.tokContexts = _TokContext$types.types;

var _isIdentifierChar$isIdentifierStart = require("./identifier");

exports.isIdentifierChar = _isIdentifierChar$isIdentifierStart.isIdentifierChar;
exports.isIdentifierStart = _isIdentifierChar$isIdentifierStart.isIdentifierStart;

var _Token = require("./tokenize");

exports.Token = _Token.Token;

var _isNewLine$lineBreak$lineBreakG = require("./whitespace");

exports.isNewLine = _isNewLine$lineBreak$lineBreakG.isNewLine;
exports.lineBreak = _isNewLine$lineBreak$lineBreakG.lineBreak;
exports.lineBreakG = _isNewLine$lineBreak$lineBreakG.lineBreakG;
var version = "1.0.0";exports.version = version;

function parse(input, options) {
  var p = parser(options, input);
  var startPos = p.options.locations ? [p.pos, p.curPosition()] : p.pos;
  p.nextToken();
  return p.parseTopLevel(p.options.program || p.startNodeAt(startPos));
}

function parseExpressionAt(input, pos, options) {
  var p = parser(options, input, pos);
  p.nextToken();
  return p.parseExpression();
}

function tokenizer(input, options) {
  return parser(options, input);
}

function parser(options, input) {
  return new _Parser.Parser(_getOptions.getOptions(options), String(input));
}