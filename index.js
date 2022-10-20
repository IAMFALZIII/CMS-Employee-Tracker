//* importing express, mysql, inquirer, and Console.Table packages
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const app = express();

//Adding middleware
app.use(express.urlencoded( {extended: false} ));
app.use(express.json());