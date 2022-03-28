#!/usr/bin/env node
'use strict';

/**
 * Random security code generation (please put it at the beginning of the file)
 */
var randomstring = require("randomstring");
process.env.token_defaults_secret = randomstring.generate();
var debug = require('debug')('libraryofficialwebsite:server');
debug(process.env.token_defaults_secret);

/**
 * Module dependencies.
 */
const { Base64 } = require('js-base64');
const { printTable } = require('console-table-printer');
var token = require('token');
const jsonwebtoken = require('jsonwebtoken');

/**
 * Custom Dependent Modules
 */
import app from "../app.js";
import ws_msg_income_obj from "../models/esm/keywordscopy.mjs";

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '18787');
app.set('port', port);
app.set_ws_implement(ws_msg_income_obj);

/**
 * The main starting point, which is the beginning of the universe
 */
app.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//Create a table
const start_msg = [
  { port_listening: port }];

//print
printTable(start_msg);
