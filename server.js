const express = require("express");

const env = require("dotenv").config({ path: "./config/config.env" });
// console.log(env.parsed);
const PORT = process.env.PORT;
console.log(PORT);
