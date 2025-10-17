 
const typeDefs = `#graphql
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Float!
  }

  type Department {
    id: ID!
    name: String!
    floor: Int!
  }

  type Query {
    hello: String!
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
    searchEmployeesByName(name: String!): [Employee!]!  # New search query
    getAllDepartments: [Department!]!
  }

  type Mutation {
    addEmployee(
      name: String!
      position: String!
      department: String!
      salary: Float!
    ): Employee!
    
    updateEmployee(
      id: ID!
      name: String
      position: String
      department: String
      salary: Float
    ): Employee!
    
    deleteEmployee(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
