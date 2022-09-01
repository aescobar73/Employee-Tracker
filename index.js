// const { application } = require("express");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
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
                            'View All Departments', 'Add Department'],
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
                default:
                    text = 'Good-bye!';
                    break
            }

        })
    };


const viewEmployee = () => {

    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results)
    });

    mainQuestion()

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
            }


            mainQuestion()
        });

       

};


const updateEmployee = () => {

    return inquirer
        .prompt([
            // need to add the current employees to update/ and the updated roles
            {
                type: 'list',
                message: 'Which employee\'s role do you want to update?',
                choices: ['None'],
                name: 'title'
            },
            {
                type: 'list',
                message: 'Which role do you want to assign the selected employee?',
                choices: ['Sales Lead', 'Software Engineer', 'Lawyer', 'Accountant']
            }

        ])

        .then((results) => {


            mainQuestion()
        })


};


const viewRole = () => {

    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results)
    });

    mainQuestion()
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
            }


            mainQuestion()
        })

};

const viewDepartment = () => {

        db.query('SELECT * FROM departments', function (err, results) {
            console.table(results)
        });

        mainQuestion()

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
            }
        

            mainQuestion()
        })

};

// app.use((req, res) => {
//     res.status(404).end();
//   });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
mainQuestion()