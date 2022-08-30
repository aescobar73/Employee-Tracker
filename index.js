const inquirer = require("inquirer");
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;



const connection = mysql.createConnection({
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

    };


const addEmployee = () => {

    


};


const updateEmployee = () => {


};


const viewRole = () => {


};


const addRole = () => {


};

const viewDepartment = () => {

        db.query('SHOW TABLE departments', function (err, results) {
            console.log(results)
        });

        mainQuestion()

};

const addDepartment = () => {


};



AudioParamMap.list(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
