//* importing express, mysql, inquirer, and Console.Table packages
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const app = express();

//Adding middleware
app.use(express.urlencoded( {extended: false} ));
app.use(express.json());

//* Used to connect our MySQL database and MySQL local server
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "BingBong1999?",
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

//* Create the questions when the specified drop down item has been selected

const addEmployeeDropDown = [
    {
      name: "firstNameEmploy",
      message: "Please enter the employee's first name:",
    },
    {
      name: "lastNameEmploy",
      message: "Please enter their last name:",
    },
    {
      name: "roleEmploy",
      type: "list",
      message: "Select their role:",
      choices: roleItems,
    },
  ];
  
  const addRoleDropDown = [
    {
      name: "roleName",
      message: "Please enter the name of the role:",
    },
    {
      name: "roleSalary",
      type: "input",
      message: "Please enter the salary of this role:",
    },
    {
      name: "roleDepartment",
      type: "list",
      message: "Please select the department associated with this role:",
    },
  ];
  
  const addDepartmentDropDown = [
    {
      name: "department",
      message: "Please enter the department by name:",
    },
  ];
  
//* Create the directing selections from the questions 
  function addRole() {
    inquirer.prompt(addRoleDropDown).then((data) => {
      const roleName = JSON.stringify(data.roleName).split("").join("");
      roleItems.push(roleNameInput);
      const roleSalary = JSON.stringify(data.roleSalary).split("").join("");
  
      const roleDepartment = JSON.stringify(data.roleDepartment)
        .split("")
        .join("");
  
      db.query(
        "SELECT department.id FROM department WHERE department_name = (?)",
        roleDepartment,
        function (err, results) {
          const departId = results.map(((arr) => `${arr.id}`).join(", "));
          department(departId);
        }
      );
      function department(id) {
        const departId = id;
        db.query(
          "INSERT INTO tableRole (title, salary, department_id VALUES (?, ?, ?)",
          [roleName, roleSalary, departId],
          function (err, results) {
            console.log(
              "Role name, salary, and associated department have all been inputted into the database"
            );
            inquirerQuestions();
          }
        );
      }
    });
  }
  
  function addDepartment() {
    inquirer.prompt(addDepartmentDropDown).then((data) => {
      const departmentInput = JSON.stringify(data.department).split(" ").join("");
      departmentItems.push(departmentInput);
      db.query(
        "INSERT INTO department (department_name) VALUES (?)",
        departmentInput,
        function (err, results) {
          console.log("Your department has been inputted into the database.");
          inquirerQuestions();
        }
      );
    });
  }
  
  function addEmployee() {
    inquirer.prompt(addEmployeeDropDown).then((data) => {
      const employeeFirstNameInput = JSON.stringify(data.firstNameEmploy)
        .split(" ")
        .join("");
      const employeeLastNameInput = JSON.stringify(data.lastNameEmploy)
        .split(" ")
        .join("");
      const employeeRoleInput = JSON.stringify(data.roleEmploy)
        .split(" ")
        .join("");
      employeeItems.push(employeeFirstNameInput);
      db.query(
        "SELECT tableRole.id FROM tableRole WHERE title = (?)",
        employeeRoleInput,
        function (err, res) {
          const roleIdInsert = res.map((arr) => `${arr.id}`).join(", ");
          insert(roleIdInsert);
        }
      );
      function insert(newRoleId) {
        const roleIdInsert = newRoleId;
        db.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [employeeFirstNameInput, employeeLastNameInput, roleIdInsert, 1],
          function (err, res) {
            console.log(
              "Successfully added employees first name, last name, role identification, and the associated manager"
            );
            inquirerQuestions();
          }
        );
      }
    });
  }

inquirerQuestions();