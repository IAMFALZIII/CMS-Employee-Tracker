//* importing express, mysql, inquirer, and Console.Table packages
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { default: PasswordPrompt } = require('inquirer/lib/prompts/password');

const app = express();

//Adding middleware
app.use(express.urlencoded( {extended: false} ));
app.use(express.json());

//* Used to connect our MySQL database and MySQL local server
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "management_db",
    },
    console.log("Now connected to database")
);

//* Bringing in Database array made in schema.sql and seeds.sql
const departmentItems = ["Engineering", "Finance", "Legal", "Sales"];
const roleItems = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"];
const employeeItems = ["John", "Mike", "Ashley", "Kevin", "Kunal", "Malia", "Sarah", "Tom"];

//* Questions for the application
const dropDown = [
    {
        type: "list", 
        name: "dropDown",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department"
        ],
    },
];