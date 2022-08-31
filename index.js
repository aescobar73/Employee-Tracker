const { application } = require("express");
const inquirer = require("inquirer");
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;



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
            }

        })
    };


const viewEmployee = () => {

    db.query('SHOW TABLE employees', function (err, results) {
        console.log(results)
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
                type: 'list',
                message: 'What is the employee\'s role?',
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Sales Lead', 'Salesperson', 'Lead Enginner'],
                name: 'title'
            },
            // need to add the list of available managers to this list. 
            {
                type: 'list',
                message: 'Who is the employee\'s manager?',
                choices: ['None'],
                name: 'manager'
            }
        ])

        .then((results) => {
            


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

    db.query('SHOW TABLE roles', function (err, results) {
        console.log(results)
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
            // need to add the role to the roles list. Need to make the list a variable to be able use the user input and append it to the list.
            {
                type: 'list',
                message: 'Which department does the role belong to?',
                choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service'],
                name: 'title'
            }
        ])

        .then((results) => {


            mainQuestion()
        })

};

const viewDepartment = () => {

        db.query('SHOW TABLE departments', function (err, results) {
            console.log(results)
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

        .then((results) => {


            mainQuestion()
        })

};

app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
