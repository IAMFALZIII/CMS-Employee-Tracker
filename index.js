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

//* Have to make a function for inquirer -> inquirer.prompt();
function inquirerQuestions() {
    inquirer.prompt(dropDown).then((data) => {
        if (data.dropDown === "View All Employees") {
            db.query(
                'SELECT employee.id, employee.first_name, employee.last_name, tableRole.title, department.department_name, tableRole.salary, CONCAT(manager.first_name, "", manager.last_name) AS manager FROM employee JOIN tableRole ON employee.role_id = tableRole.id JOIN department ON tableRole.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;',
                function (err, results) {
                console.table(results);
                inquirerQuestions();
                }
            );
        } else if (data.dropDown === "Add Employee") {
            addEmployee();
        }  else if (data.dropDown === "Update Employee Role") {
            employeeUpdateRole();
        }  else if (data.dropDown === "View All Roles") {
            db.query(
                "SELECT tableRole.id, tableRole.title, tableRole.salary, department.department_name FROM tableRole JOIN department ON tableRole.department_id = department.id",
                function (err, results) {
                  console.table(results);
                  inquirerQuestions();
                }
            );
        } else if (data.dropDown === "Add Department") {
            addDepartment(); 
        } else if (data.dropDown === "View All Departments") {
            db.query(
                "SELECT department_name FROM department",
                function (err, results) {
                    console.table(results);
                    inquirerQuestions();
                }
            );
        } else if (data.dropDown === "Add Role") {
            addRole();
        } else if (data.dropDown === "Quite") {
            console.log("You have successfully quit the application.");
        } 

    });
}



inquirerQuestions();