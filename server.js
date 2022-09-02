// const { application } = require("express");
const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password1',
    database: 'company_db'

});


const mainQuestion = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: ('What would you like to do?'),
                choices: [ 'View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 
                            'View All Departments', 'Add Department', 'Update Employee Manager', 'View By Department'],
                name: 'options',
            }
        ])

        .then((response) => {
            switch(response.options) {
                case 'View All Employees':
                    viewEmployee();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    viewRole();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewDepartment();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;
                case 'View By Department':
                    viewByDepart();
                    break;
                default:
                    text = 'Good-bye!';
                    break
            }

        })
    };


const viewEmployee = () => {

    db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id', function(err, results) {

    console.table(results)

    mainQuestion()
    });

    

    };


const addEmployee = () => {

    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employee\'s first name?',
                name: 'first'
            },
            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'last'
            },
            {
                type: 'input',
                message: 'What is the employee\'s role ID?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the employee\'s manager ID?',
                name: 'manager'
            }
        ])

        .then((response) => {
            
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${response.first}', '${response.last}', '${response.title}', '${response.manager}')`), (err, result) => {
                console.log('New Employee added')

                mainQuestion()
            }


            
        });

       

};


const updateEmployee = () => {

    return inquirer
        .prompt([
           
            {
                type: 'input',
                message: 'What is the employee\'s ID?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'Enter employee\'s new role ID?',
                name: 'newRole'
            }

        ])

        .then((results) => {

            const update = `UPDATE employees SET role_id=? WHERE id=?`

            db.query(update, [results.newRole, results.title]), (err, results) => {
                console.log('New Employee added')

                mainQuestion()
            }

            
        })


};


const viewRole = () => {

    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results)

        mainQuestion()
    });

    
};


const addRole = () => {

    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'name'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary'
            },
        
            {
                type: 'input',
                message: 'What is the department ID?',
                name: 'title'
            }
        ])

        .then((response) => {

            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${response.name}', '${response.salary}', '${response.title}')`), (err, result) => {
                console.log('New Role added')

                mainQuestion()
            }


            
        })

};

const viewDepartment = () => {

        db.query('SELECT * FROM departments', function (err, results) {
            console.table(results)

            mainQuestion()
        });

        

};

const addDepartment = () => {

    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'name'
            },
        ])

        .then((response) => {



            db.query(`INSERT INTO departments (name) VALUES ('${response.name}')`), (err, result) => {
                console.log('New Department added')

                mainQuestion()
            }
        

            
        })

};

// Bonus

const updateEmployeeManager = () => {

    return inquirer
        .prompt([
            // need to add the current employees to update/ and the updated roles
            {
                type: 'input',
                message: 'What is the employee\'s ID?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'Enter employee\'s new manager ID?',
                name: 'newRole'
            }

        ])

        .then((results) => {

            const update2 = `UPDATE employees SET manager_id=? WHERE id=?`

            db.query(update2, [results.newRole, results.title]), (err, results) => {
                console.log('New Manager Updated!')

                mainQuestion()
            }

            
        })

};


const viewByDepart = () => {

    db.query('SELECT name, first_name, last_name FROM departments JOIN employees ON departments.id = employees.roles_id', function (err, results) {

        console.table(results)

        mainQuestion()
        
        });
    
        
    
};
  


mainQuestion()