const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table')

// * Main prompt
const prompt = {
    type: 'list',
    name: 'cms_choices',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles','View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
}

// * Adding a department
const departmentPrompt  = {
  type: 'input',
  name: 'department_choices',
  message: 'What department would you like to add?',
}

// * Adding a role prompt
const addARole = [
  {
    type: 'input',
    name: 'role_choices',
    message: 'Please Enter the role you would like to add'
  },
  {
    type: 'input',
    name: 'role_salary',
    message: 'What is the salary for this role?'
  },
  {
    type: 'input',
    name: 'role_department',
    message: 'What department will this role belong to? '
  }
]

// * Adding a employee
const addEmployee = [
  {
    type: 'input',
    name: 'employee_first',
    message: 'Please Enter the employees first name'
  },
  {
    type: 'input',
    name: 'employee_last',
    message: 'Please Enter the employees first name'
  },
  {
    type: 'input',
    name: 'employee_role',
    message: 'Please Enter the employees first name'
  }
]

// * Ending of prompts


inquirer
  .prompt(
    /* Pass your questions in here */
    (prompt)
  )
  .then((answers) => {
   console.log(promptFunctions());

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
      // Something else went wrong
    }
  });


 function promptFunctions () {
  inquirer.prompt(prompt).then((answers) =>{
    if(answers.cms_choices === 'View all departments'){
      const sql = `SELECT * FROM department`
      
      db.query(sql, (err, res) =>{
        if(err){
          console.log(err)
          return;
        } else {
          console.table('ALL DEPARTMENTS')

           console.table(res)
        }
      })
    } 

    if (answers.cms_choices === 'View all roles'){
      const sql = `SELECT * FROM role`
      
      db.query(sql, (err, res) =>{
        if(err){
          console.log(err)
          return;
        } else {
          console.table(res)
        }
      })
    }

    if (answers.cms_choices === 'View all employees'){
      const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, role.department_id
                  FROM employee
                  INNER JOIN role
                  ON employee.role_id = role.id`
      
      db.query(sql, (err, res) =>{
        if(err){
          console.log(err)
          return;
        } else {
          console.table(res)
        }
      })
    }

    if (answers.cms_choices === 'Add a department'){
      inquirer.prompt(departmentPrompt).then((answers) => {
        const sql = `INSERT INTO department (name) VALUES (?)`
        const params = [answers.department_choices]

        db.query(sql, params, (err, res) => {
          if (err) {
            console.log(err)
          } else {
            console.table(res)
          }
        })

      })

      
    }

    if (answers.cms_choices === 'Add a role'){
      inquirer.prompt(addARole).then((answers) => {
        const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?,?,?)`
        const params = [answers.role_choices, answers.role_salary, answers.role_department]

        db.query(sql, params ,(err, res) => {
          if (err) {
            console.log(err)
          } else {
            console.table(res)
          }
        })
      })
    }

    if (answers.cms_choices === 'Add an employee'){
      inquirer.prompt(addEmployee).then((answers) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id)
                    VALUE (?,?,?)`

        const params = [answers.employee_first, answers.employee_last, answers.employee_role]
        
        db.query(sql, params, (err, res) => {
          if(err){
            console.log(err)
          } else {
            console.table(res)
          }
        })
      })
    }

  })



 }
