 
const { ObjectId } = require('mongodb');
const { getDB } = require('../../config/db');
const { GraphQLError } = require('graphql');

// Custom error class
class AppError extends GraphQLError {
  constructor(message, code = 'INTERNAL_SERVER_ERROR') {
    super(message, {
      extensions: {
        code,
        http: { status: code === 'NOT_FOUND' ? 404 : 500 }
      }
    });
  }
}

const resolvers = {
  Query: {
    hello: () => '🚀 Server is running perfectly!',

    getAllEmployees: async () => {
      try {
        const db = getDB();
        const employees = await db.collection('employees')
          .find({})
          .project({ _id: 1, name: 1, position: 1 })
          .toArray();

        if (!employees || employees.length === 0) {
          return [];
        }

        return employees.map(emp => ({
          id: emp._id.toString(),
          name: emp.name || 'N/A',
          position: emp.position || 'N/A',
          department: '',
          salary: 0
        }));
      } catch (error) {
        console.error('Error in getAllEmployees:', error);
        throw new AppError('Failed to fetch employees. Please try again later.');
      }
    },

    getEmployeeDetails: async (_, { id }) => {
      try {
        const db = getDB();
        
        if (!id || id.trim() === '') {
          throw new AppError('Employee ID is required', 'BAD_USER_INPUT');
        }

        if (!ObjectId.isValid(id)) {
          throw new AppError('Invalid employee ID format', 'BAD_USER_INPUT');
        }

        const employee = await db.collection('employees')
          .findOne({ _id: new ObjectId(id) });
        
        if (!employee) {
          throw new AppError('Employee not found', 'NOT_FOUND');
        }
        
        return {
          id: employee._id.toString(),
          name: employee.name,
          position: employee.position,
          department: employee.department,
          salary: employee.salary
        };
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.error('Error in getEmployeeDetails:', error);
        throw new AppError('Failed to fetch employee details');
      }
    },

    getEmployeesByDepartment: async (_, { department }) => {
      try {
        const db = getDB();
        
        if (!department || department.trim() === '') {
          throw new AppError('Department name is required', 'BAD_USER_INPUT');
        }

        const employees = await db.collection('employees')
          .find({ department })
          .toArray();
        
        return employees.map(emp => ({
          id: emp._id.toString(),
          name: emp.name,
          position: emp.position,
          department: emp.department,
          salary: emp.salary
        }));
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.error('Error in getEmployeesByDepartment:', error);
        throw new AppError('Failed to fetch employees by department');
      }
    },

    searchEmployeesByName: async (_, { name }) => {
      try {
        const db = getDB();
        
        if (!name || name.trim() === '') {
          throw new AppError('Search term is required', 'BAD_USER_INPUT');
        }

        const employees = await db.collection('employees')
          .find({ 
            name: { $regex: name.trim(), $options: 'i' }
          })
          .toArray();
        
        return employees.map(emp => ({
          id: emp._id.toString(),
          name: emp.name,
          position: emp.position,
          department: emp.department,
          salary: emp.salary
        }));
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.error('Error in searchEmployeesByName:', error);
        throw new AppError('Failed to search employees');
      }
    }
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      try {
        const db = getDB();

        // Validation
        if (!name || name.trim() === '') {
          throw new AppError('Name is required', 'BAD_USER_INPUT');
        }
        if (!position || position.trim() === '') {
          throw new AppError('Position is required', 'BAD_USER_INPUT');
        }
        if (!department || department.trim() === '') {
          throw new AppError('Department is required', 'BAD_USER_INPUT');
        }
        if (salary === undefined || salary === null || salary < 0) {
          throw new AppError('Valid salary is required', 'BAD_USER_INPUT');
        }

        const newEmployee = {
          name: name.trim(),
          position: position.trim(),
          department: department.trim(),
          salary: parseFloat(salary),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const result = await db.collection('employees').insertOne(newEmployee);
        
        if (!result.insertedId) {
          throw new AppError('Failed to create employee');
        }

        return {
          id: result.insertedId.toString(),
          ...newEmployee
        };
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.error('Error in addEmployee:', error);
        throw new AppError('Failed to add employee');
      }
    },

    updateEmployee: async (_, { id, name, position, department, salary }) => {
      try {
        const db = getDB();
        
        if (!id || id.trim() === '') {
          throw new AppError('Employee ID is required', 'BAD_USER_INPUT');
        }

        if (!ObjectId.isValid(id)) {
          throw new AppError('Invalid employee ID format', 'BAD_USER_INPUT');
        }

        // Check if employee exists
        const existingEmployee = await db.collection('employees')
          .findOne({ _id: new ObjectId(id) });

        if (!existingEmployee) {
          throw new AppError('Employee not found', 'NOT_FOUND');
        }

        // Build update object
        const updateData = {};
        if (name !== undefined && name.trim() !== '') updateData.name = name.trim();
        if (position !== undefined && position.trim() !== '') updateData.position = position.trim();
        if (department !== undefined && department.trim() !== '') updateData.department = department.trim();
        if (salary !== undefined && salary >= 0) updateData.salary = parseFloat(salary);
        updateData.updatedAt = new Date();

        if (Object.keys(updateData).length === 1) { // Only updatedAt
          throw new AppError('No fields to update', 'BAD_USER_INPUT');
        }

        const result = await db.collection('employees').findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updateData },
          { returnDocument: 'after' }
        );

        if (!result.value) {
          throw new AppError('Failed to update employee');
        }

        return {
          id: result.value._id.toString(),
          name: result.value.name,
          position: result.value.position,
          department: result.value.department,
          salary: result.value.salary
        };
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.error('Error in updateEmployee:', error);
        throw new AppError('Failed to update employee');
      }
    },

    deleteEmployee: async (_, { id }) => {
      try {
        const db = getDB();
        
        if (!id || id.trim() === '') {
          throw new AppError('Employee ID is required', 'BAD_USER_INPUT');
        }

        if (!ObjectId.isValid(id)) {
          throw new AppError('Invalid employee ID format', 'BAD_USER_INPUT');
        }

        // Check if employee exists
        const existingEmployee = await db.collection('employees')
          .findOne({ _id: new ObjectId(id) });

        if (!existingEmployee) {
          throw new AppError('Employee not found', 'NOT_FOUND');
        }

        const result = await db.collection('employees').deleteOne({
          _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
          throw new AppError('Failed to delete employee');
        }

        return true;
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.error('Error in deleteEmployee:', error);
        throw new AppError('Failed to delete employee');
      }
    }
  }
};

module.exports = resolvers;
