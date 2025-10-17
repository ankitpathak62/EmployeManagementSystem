'use client';

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $position: String!, $department: String!, $salary: Float!) {
    addEmployee(name: $name, position: $position, department: $department, salary: $salary) {
      id
      name
      position
    }
  }
`;

export default function AddEmployeePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: '',
  });

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      alert('✅ Employee added successfully!');
      router.push('/');
    },
    onError: (error) => {
      alert('❌ Error: ' + error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.position || !formData.department || !formData.salary) {
      alert('⚠️ Please fill all fields');
      return;
    }

    addEmployee({
      variables: {
        ...formData,
        salary: parseFloat(formData.salary),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg mb-6 hover:bg-gray-800 transition shadow-md flex items-center gap-2 font-semibold text-lg"
        >
          <span>←</span> Back to Home
        </button>

        <h1 className="text-5xl font-extrabold mb-8 text-gray-900">Add New Employee</h1>

        <div className="bg-white shadow-2xl rounded-xl p-10 border-2 border-gray-300">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div>
              <label className="block text-lg font-extrabold text-gray-900 mb-3">
                Employee Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                className="w-full border-3 border-gray-800 bg-white rounded-lg px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 text-gray-900 font-bold text-xl placeholder-gray-500"
                required
              />
            </div>

            {/* Position Field */}
            <div>
              <label className="block text-lg font-extrabold text-gray-900 mb-3">
                Position <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="e.g., Software Engineer"
                className="w-full border-3 border-gray-800 bg-white rounded-lg px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 text-gray-900 font-bold text-xl placeholder-gray-500"
                required
              />
            </div>

            {/* Department Field */}
            <div>
              <label className="block text-lg font-extrabold text-gray-900 mb-3">
                Department <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full border-3 border-gray-800 bg-white rounded-lg px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 text-gray-900 font-bold text-xl cursor-pointer"
                required
              >
                <option value="" className="text-gray-500">Select Department</option>
                <option value="Engineering" className="font-bold text-lg">Engineering</option>
                <option value="Marketing" className="font-bold text-lg">Marketing</option>
                <option value="Sales" className="font-bold text-lg">Sales</option>
              </select>
            </div>

            {/* Salary Field */}
            <div>
              <label className="block text-lg font-extrabold text-gray-900 mb-3">
                Annual Salary ($) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g., 75000"
                className="w-full border-3 border-gray-800 bg-white rounded-lg px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 text-gray-900 font-bold text-xl placeholder-gray-500"
                required
                min="0"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-800 px-6 py-4 rounded-lg">
                <p className="font-bold text-lg">Error: {error.message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-8 py-5 rounded-lg hover:bg-green-700 transition shadow-2xl disabled:bg-gray-400 font-extrabold text-2xl"
            >
              {loading ? '⏳ Adding Employee...' : '✅ Add Employee'}
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
          <p className="text-blue-900 font-bold text-lg">
            💡 <strong>Note:</strong> All fields marked with <span className="text-red-600">*</span> are required. Please ensure all information is accurate before submitting.
          </p>
        </div>
      </div>
    </div>
  );
}
