'use client';

import { gql, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id: params.id },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-800 text-lg font-semibold">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border-2 border-red-400 text-red-800 px-6 py-4 rounded-lg">
          <p className="font-bold text-lg">Error!</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const employee = data?.getEmployeeDetails;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg mb-6 hover:bg-gray-800 transition shadow-md flex items-center gap-2 font-semibold"
        >
          <span>←</span> Back to Home
        </button>

        <h1 className="text-4xl font-bold mb-8 text-gray-900">Employee Details</h1>

        <div className="bg-white shadow-2xl rounded-xl p-8 border border-gray-200">
          {/* Employee Info Card */}
          <div className="space-y-6">
            <div className="border-b pb-5">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Employee ID</p>
              <p className="text-xl text-gray-900 font-mono">{employee.id}</p>
            </div>

            <div className="border-b pb-5">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Full Name</p>
              <p className="text-3xl text-gray-900 font-bold">{employee.name}</p>
            </div>

            <div className="border-b pb-5">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Position</p>
              <p className="text-2xl text-gray-900 font-semibold">{employee.position}</p>
            </div>

            <div className="border-b pb-5">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Department</p>
              <p className="text-xl text-gray-900 font-semibold">
                <span className="bg-blue-100 text-blue-800 px-5 py-2 rounded-full text-lg">
                  {employee.department}
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Annual Salary</p>
              <p className="text-4xl text-green-600 font-bold">${employee.salary.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
