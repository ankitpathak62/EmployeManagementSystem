const { MongoClient } = require('mongodb');
require('dotenv').config();

const seedData = async () => {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('employeeDB');

    // Clear existing data
    console.log('🗑️  Clearing old data...');
    await db.collection('employees').deleteMany({});
    await db.collection('departments').deleteMany({});

    // Seed Departments
    console.log('📁 Seeding departments...');
    const departments = [
      { name: 'Engineering', floor: 3 },
      { name: 'Design', floor: 2 },
      { name: 'Product', floor: 2 },
      { name: 'Marketing', floor: 1 }
    ];
    await db.collection('departments').insertMany(departments);
    console.log(`✅ ${departments.length} departments added`);

    // Seed Employees (minimum 5 across 3 departments)
    console.log('👥 Seeding employees...');
    const employees = [
      {
        name: 'Ankit Pathak',
        position: 'Full Stack Developer',
        department: 'Engineering',
        salary: 75000,
        createdAt: new Date()
      },
      {
        name: 'Priya Sharma',
        position: 'UI/UX Designer',
        department: 'Design',
        salary: 65000,
        createdAt: new Date()
      },
      {
        name: 'Rahul Kumar',
        position: 'Backend Developer',
        department: 'Engineering',
        salary: 70000,
        createdAt: new Date()
      },
      {
        name: 'Sneha Gupta',
        position: 'Product Manager',
        department: 'Product',
        salary: 90000,
        createdAt: new Date()
      },
      {
        name: 'Amit Singh',
        position: 'DevOps Engineer',
        department: 'Engineering',
        salary: 80000,
        createdAt: new Date()
      },
      {
        name: 'Neha Verma',
        position: 'Frontend Developer',
        department: 'Engineering',
        salary: 68000,
        createdAt: new Date()
      },
      {
        name: 'Vikram Yadav',
        position: 'Marketing Manager',
        department: 'Marketing',
        salary: 72000,
        createdAt: new Date()
      },
      {
        name: 'Pooja Reddy',
        position: 'Graphic Designer',
        department: 'Design',
        salary: 60000,
        createdAt: new Date()
      }
    ];

    await db.collection('employees').insertMany(employees);
    console.log(`✅ ${employees.length} employees added`);

    // Summary
    console.log('\n📊 Seeding Summary:');
    console.log(`   - Departments: ${departments.length}`);
    console.log(`   - Employees: ${employees.length}`);
    console.log('   - Engineering: 4 employees');
    console.log('   - Design: 2 employees');
    console.log('   - Product: 1 employee');
    console.log('   - Marketing: 1 employee');

    await client.close();
    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
