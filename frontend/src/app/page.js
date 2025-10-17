'use client';

import { useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import Link from 'next/link';

const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
    }
  }
`;

const GET_EMPLOYEES_BY_DEPT = gql`
  query GetEmployeesByDepartment($department: String!) {
    getEmployeesByDepartment(department: $department) {
      id
      name
      position
    }
  }
`;

const SEARCH_EMPLOYEES = gql`
  query SearchEmployeesByName($name: String!) {
    searchEmployeesByName(name: $name) {
      id
      name
      position
      department
      salary
    }
  }
`;

export default function HomePage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const { loading, error, data } = useQuery(
    selectedDept === 'All' ? GET_ALL_EMPLOYEES : GET_EMPLOYEES_BY_DEPT,
    {
      variables: selectedDept !== 'All' ? { department: selectedDept } : {},
      skip: selectedDept !== 'All' && !selectedDept,
    }
  );

  const [searchEmployees, { loading: searchLoading, data: searchData }] = useLazyQuery(SEARCH_EMPLOYEES);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchEmployees({ variables: { name: searchTerm } });
      setShowSearch(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSearch(false);
  };

  if (loading || searchLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-base font-medium">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-semibold">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  const employees = showSearch 
    ? searchData?.searchEmployeesByName || [] 
    : selectedDept === 'All' 
      ? data?.getAllEmployees || [] 
      : data?.getEmployeesByDepartment || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 md:py-8">
      <div className="container mx-auto px-3 md:px-6">
        <div className="bg-white shadow-lg rounded-xl p-4 md:p-8 mb-6 md:mb-8 border border-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-800">Employee Directory</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by employee name..."
                className="flex-1 border-2 border-gray-400 bg-white rounded-lg px-4 md:px-5 py-3 md:py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-medium text-base placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={searchLoading}
                className="bg-green-600 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg hover:bg-green-700 transition shadow-md disabled:bg-gray-400 font-semibold text-base whitespace-nowrap"
              >
                {searchLoading ? '⏳ Searching...' : '🔍 Search'}
              </button>
              {showSearch && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="bg-gray-600 text-white px-6 md:px-7 py-3 md:py-3.5 rounded-lg hover:bg-gray-700 transition shadow-md font-semibold text-base whitespace-nowrap"
                >
                  ❌ Clear
                </button>
              )}
            </div>
          </form>

          {/* Department Filter */}
          {!showSearch && (
            <div className="mb-6 md:mb-8 bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <label className="text-base md:text-lg font-semibold text-gray-700 whitespace-nowrap">
                  Filter by Department:
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full sm:flex-1 border-2 border-gray-400 bg-white rounded-lg px-4 md:px-5 py-2.5 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-medium text-base cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
            </div>
          )}

          {/* Add Employee Button */}
          <Link href="/add-employee">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg hover:bg-blue-700 transition shadow-md font-semibold text-base">
              ➕ Add New Employee
            </button>
          </Link>
        </div>

        {/* Results Count */}
        <div className="bg-blue-600 text-white px-4 md:px-6 py-3 md:py-4 mb-6 md:mb-8 rounded-lg shadow-md">
          <p className="font-semibold text-base md:text-lg">
            {showSearch 
              ? `🔍 Search Results: ${employees.length} employee(s) found` 
              : `👥 Total Employees: ${employees.length}`}
          </p>
        </div>

        {/* Employee Table/Cards */}
        {employees.length === 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-10 md:p-16 text-center border border-gray-200">
            <p className="text-gray-600 text-xl md:text-2xl font-semibold mb-3">No employees found</p>
            <p className="text-gray-500 text-base md:text-lg">Try adjusting your search or filter</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">Position</th>
                    {showSearch && <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">Department</th>}
                    {showSearch && <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">Salary</th>}
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 text-gray-900 font-semibold text-lg">{emp.name}</td>
                      <td className="px-6 py-4 text-gray-700 font-medium text-base">{emp.position}</td>
                      {showSearch && (
                        <td className="px-6 py-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {emp.department}
                          </span>
                        </td>
                      )}
                      {showSearch && <td className="px-6 py-4 text-green-600 font-semibold text-lg">${emp.salary.toLocaleString()}</td>}
                      <td className="px-6 py-4">
                        <Link href={`/employee/${emp.id}`}>
                          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm text-sm">
                            View Details →
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {employees.map((emp) => (
                <div key={emp.id} className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Name</p>
                      <p className="text-lg font-semibold text-gray-900">{emp.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Position</p>
                      <p className="text-base font-medium text-gray-700">{emp.position}</p>
                    </div>
                    
                    {showSearch && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Salary</p>
                        <p className="text-lg font-semibold text-green-600">${emp.salary.toLocaleString()}</p>
                      </div>
                    )}
                    
                    <Link href={`/employee/${emp.id}`} className="block">
                      <button className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm text-base mt-2">
                        View Full Details →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
