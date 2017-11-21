const express = require("../config/express")();

const request = require("supertest")(express);
module.exports = request;

const chai = require("chai");
chai.should();