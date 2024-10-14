const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee'); // Import Employee Model

// GET all employees
// This endpoint retrieves all employee records from the database and sends them in the response.
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find(); // Get all employees from the database
        res.status(200).json(employees); // Return employee data as JSON with a 200 status code
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});

// POST to create an employee
// This endpoint creates a new employee record in the database and returns the created employee.
router.post('/employees', async (req, res) => {
    const { empid, first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const newEmployee = new Employee({
            empid,
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        });

        const createdEmployee = await newEmployee.save(); // Save the created employee to the database
        res.status(201).json({ message: 'Employee created successfully', employee: createdEmployee }); // Respond with status 201 and employee data
    } catch (error) {
        console.error('Error creating employee:', error); // Log the error
        res.status(400).json({ message: 'Error creating employee', error }); // Return status 400 for Bad Request
    }
});

// GET an employee by ID
// This endpoint fetches an employee by their ID and returns the employee data if found.
router.get('/employees/:eid', async (req, res) => {
    const { eid } = req.params; // Extract employee ID from route parameters

    try {
        const employee = await Employee.findById(eid); // Find employee by ID
        if (employee) {
            res.status(200).json(employee); // Return employee data if found
        } else {
            res.status(404).json({ message: 'Employee not found' }); // Return 404 if employee is not found
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error });
    }
});

// PUT to update employee details by ID
// This endpoint updates an employee's details and returns the updated employee.
router.put('/employees/:eid', async (req, res) => {
    const { eid } = req.params; // Extract employee ID from route parameters
    const updatedData = req.body; // Get updated employee data from the request body

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, updatedData, { new: true }); // Update employee data

        if (updatedEmployee) {
            res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee }); // Return updated employee data
        } else {
            res.status(404).json({ message: 'Employee not found' }); // Return 404 if employee is not found
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
});

// DELETE an employee by ID
// This endpoint deletes an employee from the database by their ID and returns a success message.
router.delete('/employees/:eid', async (req, res) => {
    const { eid } = req.params; // Extract employee ID from route parameters

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid); // Delete employee by ID
        if (deletedEmployee) {
            res.status(200).json({ message: 'Employee Deleted ' }); // Return 204 No Content if deletion is successful
        } else {
            res.status(404).json({ message: 'Employee not found' }); // Return 404 if employee is not found
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});
module.exports = router;