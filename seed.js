const mongoose = require('mongoose');

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'CS', 'PE', 'Art'];
const depts = ['Science', 'Humanities', 'Technology', 'Languages', 'Sports', 'Arts'];
const classes = [
  '12-A', '12-B', '12-C', 
  '11-A', '11-B', '11-C', 
  '10-A', '10-B', '10-C', 
  '9-A', '9-B', '9-C', 
  '8-A', '8-B', '8-C', 
  '7-A', '7-B', '7-C'
];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Helper to get random item
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

// 1. Generate 40 Teachers (20 existing + 20 extra)
const allTeachers = [
  { id: 1, name: 'Dr. Sarah Johnson', subjects: ['Mathematics', 'Statistics'], avail: 'available', email: 'sarah@school.edu', phone: '+91-98765-11001', exp: 8, dept: 'Science', workload: 6, rating: 4.8 },
  { id: 2, name: 'Mr. Raj Kumar', subjects: ['Physics', 'Mathematics'], avail: 'busy', email: 'raj@school.edu', phone: '+91-98765-11002', exp: 12, dept: 'Science', workload: 8, rating: 4.9 },
  { id: 3, name: 'Ms. Emily Chen', subjects: ['English', 'Literature'], avail: 'available', email: 'emily@school.edu', phone: '+91-98765-11003', exp: 5, dept: 'Humanities', workload: 4, rating: 4.6 },
  { id: 4, name: 'Mr. David Wilson', subjects: ['Chemistry', 'Biology'], avail: 'on-leave', email: 'david@school.edu', phone: '+91-98765-11004', exp: 10, dept: 'Science', workload: 7, rating: 4.7 },
  { id: 5, name: 'Ms. Priya Sharma', subjects: ['History', 'Social Studies'], avail: 'available', email: 'priya@school.edu', phone: '+91-98765-11005', exp: 6, dept: 'Humanities', workload: 3, rating: 4.5 },
  { id: 6, name: 'Mr. Alex Thompson', subjects: ['Computer Science', 'Mathematics'], avail: 'available', email: 'alex@school.edu', phone: '+91-98765-11006', exp: 4, dept: 'Technology', workload: 5, rating: 4.4 },
  { id: 7, name: 'Ms. Maria Garcia', subjects: ['Spanish', 'English'], avail: 'busy', email: 'maria@school.edu', phone: '+91-98765-11007', exp: 9, dept: 'Languages', workload: 7, rating: 4.7 },
  { id: 8, name: 'Mr. James Brown', subjects: ['Physical Education', 'Health'], avail: 'available', email: 'james@school.edu', phone: '+91-98765-11008', exp: 7, dept: 'Sports', workload: 4, rating: 4.3 },
  { id: 9, name: 'Dr. Vikram Patel', subjects: ['Physics', 'Advanced Mathematics'], avail: 'available', email: 'vikram@school.edu', phone: '+91-98765-11009', exp: 14, dept: 'Science', workload: 9, rating: 4.9 },
  { id: 10, name: 'Ms. Anjali Desai', subjects: ['Chemistry', 'Environmental Science'], avail: 'available', email: 'anjali@school.edu', phone: '+91-98765-11010', exp: 11, dept: 'Science', workload: 7, rating: 4.8 },
  { id: 11, name: 'Mr. Sanjay Verma', subjects: ['Mathematics', 'Algebra'], avail: 'busy', email: 'sanjay@school.edu', phone: '+91-98765-11011', exp: 9, dept: 'Mathematics', workload: 8, rating: 4.7 },
  { id: 12, name: 'Ms. Kavya Nair', subjects: ['English', 'Communication'], avail: 'available', email: 'kavya@school.edu', phone: '+91-98765-11012', exp: 6, dept: 'Languages', workload: 5, rating: 4.5 },
  { id: 13, name: 'Mr. Rohit Singh', subjects: ['Hindi', 'Sanskrit'], avail: 'available', email: 'rohit@school.edu', phone: '+91-98765-11013', exp: 7, dept: 'Languages', workload: 6, rating: 4.6 },
  { id: 14, name: 'Dr. Neha Gupta', subjects: ['Computer Science', 'Programming'], avail: 'busy', email: 'neha@school.edu', phone: '+91-98765-11014', exp: 10, dept: 'Technology', workload: 9, rating: 4.9 },
  { id: 15, name: 'Mr. Arun Kumar', subjects: ['Database', 'Web Development'], avail: 'available', email: 'arun@school.edu', phone: '+91-98765-11015', exp: 8, dept: 'Technology', workload: 7, rating: 4.7 },
  { id: 16, name: 'Ms. Divya Iyer', subjects: ['Art', 'Design'], avail: 'available', email: 'divya@school.edu', phone: '+91-98765-11016', exp: 5, dept: 'Arts', workload: 4, rating: 4.4 },
  { id: 17, name: 'Mr. Ashok Reddy', subjects: ['Geography', 'Environmental Studies'], avail: 'on-leave', email: 'ashok@school.edu', phone: '+91-98765-11017', exp: 13, dept: 'Humanities', workload: 6, rating: 4.6 },
  { id: 18, name: 'Ms. Meera Chopra', subjects: ['Music', 'Cultural Studies'], avail: 'available', email: 'meera@school.edu', phone: '+91-98765-11018', exp: 7, dept: 'Arts', workload: 5, rating: 4.5 },
  { id: 19, name: 'Dr. Ramesh Nambiar', subjects: ['Economics', 'Business Studies'], avail: 'available', email: 'ramesh@school.edu', phone: '+91-98765-11019', exp: 15, dept: 'Humanities', workload: 7, rating: 4.8 },
  { id: 20, name: 'Ms. Pooja Malhotra', subjects: ['Psychology', 'Counseling'], avail: 'available', email: 'pooja@school.edu', phone: '+91-98765-11020', exp: 6, dept: 'Counseling', workload: 3, rating: 4.7 },
];

const firstNames = ['Amit', 'Sunita', 'Rahul', 'Kavita', 'Sanjay', 'Priti', 'Arjun', 'Deepa', 'Vikram', 'Anjali', 'Rohan', 'Sneha', 'Manoj', 'Pooja', 'Abhishek', 'Meera', 'Aditya', 'Divya', 'Suresh', 'Neha'];
const lastNames = ['Gupta', 'Iyer', 'Reddy', 'Singh', 'Sharma', 'Patel', 'Verma', 'Nair', 'Kumar', 'Desai'];

for (let i = 21; i <= 40; i++) {
  const name = `${rand(firstNames)} ${rand(lastNames)}`;
  allTeachers.push({
    id: i,
    name: name,
    subjects: [rand(subjects), rand(subjects)],
    avail: 'available',
    email: name.toLowerCase().replace(' ', '.') + '@school.edu',
    phone: `+91-98765-11${100 + i}`,
    exp: Math.floor(Math.random() * 15) + 2,
    dept: rand(depts),
    workload: Math.floor(Math.random() * 6) + 2,
    rating: parseFloat((Math.random() * 1 + 3.9).toFixed(1))
  });
}

// 2. Generate 105 Students (15 per class)
const allStudents = [];
let studentId = 1;
classes.forEach(cls => {
  for (let i = 1; i <= 15; i++) {
    const name = `${rand(firstNames)} ${rand(lastNames)}`;
    allStudents.push({
      id: studentId++,
      name: name,
      cls: cls,
      roll: i,
      gender: Math.random() > 0.5 ? 'M' : 'F',
      parent: `${rand(firstNames)} ${rand(lastNames)}`,
      phone: `+91-98765-21${1000 + studentId}`,
      email: name.toLowerCase().replace(/\s+/g, '.') + '.parent@gmail.com',
      attendance: Math.floor(Math.random() * 20) + 80,
      grades: {
        Math: Math.floor(Math.random() * 40) + 60,
        English: Math.floor(Math.random() * 40) + 60,
        Science: Math.floor(Math.random() * 40) + 60,
        History: Math.floor(Math.random() * 40) + 60,
        CS: Math.floor(Math.random() * 40) + 60
      },
      status: 'active'
    });
  }
});

// 3. Generate Timetable (5 days, 8 periods, 7 classes)
const fullTimetable = [];
const timeSlots = ['08:30', '09:30', '10:30', '11:30', '01:00', '02:00', '03:00', '04:00'];

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

days.forEach(day => {
  const teacherDailyCounts = {};
  allTeachers.forEach(t => teacherDailyCounts[t.id] = 0);
  
  for (let p = 1; p <= 8; p++) {
    const row = { day, p, t: timeSlots[p - 1], data: {} };
    const usedThisPeriod = new Set();
    
    classes.forEach(cls => {
      // Prioritize teachers with low daily count
      let availableTeachers = allTeachers.filter(t => !usedThisPeriod.has(t.id));
      
      // Sort to pick teachers with the least assignments for today so far
      availableTeachers.sort((a,b) => teacherDailyCounts[a.id] - teacherDailyCounts[b.id]);
      
      const teacher = availableTeachers[0];
      usedThisPeriod.add(teacher.id);
      teacherDailyCounts[teacher.id]++;
      
      const sub = rand(teacher.subjects);
      row.data[cls] = { s: sub, tc: teacher.name };
    });
    fullTimetable.push(row);
  }
});

async function seed() {
  const mongoURI = "mongodb://localhost:27017/schoolDB";
  await mongoose.connect(mongoURI);
  console.log("Connected to MongoDB for seeding...");

  const Teacher = mongoose.model('Teacher', new mongoose.Schema({ id: Number, name: String, subjects: [String], avail: String, email: String, phone: String, exp: Number, dept: String, workload: Number, rating: Number }));
  const Student = mongoose.model('Student', new mongoose.Schema({ id: Number, name: String, cls: String, roll: Number, gender: String, parent: String, phone: String, email: String, attendance: Number, grades: mongoose.Schema.Types.Mixed, status: String }));
  const Absence = mongoose.model('Absence', new mongoose.Schema({ id: Number, teacherId: Number, teacher: String, date: String, subject: String, period: Number, cls: String, status: String, subId: Number, aiSug: mongoose.Schema.Types.Mixed, aiLoad: Boolean }));
  const Leave = mongoose.model('Leave', new mongoose.Schema({ id: Number, teacherId: Number, teacher: String, type: String, from: String, to: String, days: Number, reason: String, status: String, approvedBy: String, applied: String }));
  const Notification = mongoose.model('Notification', new mongoose.Schema({ id: Number, msg: String, type: String, time: String, read: Boolean }));
  const Config = mongoose.model('Config', new mongoose.Schema({ key: String, dark: Boolean, compact: Boolean, notifs: Boolean, email: Boolean, sound: Boolean, autoAI: Boolean, target: Number, maxWL: Number }));
  const User = mongoose.model('User', new mongoose.Schema({ u: String, p: String, name: String, role: String, email: String, type: String, id: Number }));
  const Timetable = mongoose.model('Timetable', new mongoose.Schema({ day: String, p: Number, t: String, data: mongoose.Schema.Types.Mixed }));

  await Teacher.deleteMany({});
  await Teacher.insertMany(allTeachers);
  console.log(`Seeded ${allTeachers.length} Teachers.`);

  await Student.deleteMany({});
  await Student.insertMany(allStudents);
  console.log(`Seeded ${allStudents.length} Students.`);

  await Timetable.deleteMany({});
  await Timetable.insertMany(fullTimetable);
  console.log(`Seeded ${fullTimetable.length} Timetable entries.`);

  // Cleanup other collections
  await Absence.deleteMany({});
  await Leave.deleteMany({});
  await Notification.deleteMany({});

  const getCleanFirst = (name) => {
    const parts = name.split(' ');
    const titles = ['Dr.', 'Mr.', 'Ms.', 'Mrs.', 'Prof.'];
    const first = titles.includes(parts[0]) && parts.length > 1 ? parts[1] : parts[0];
    return first.toLowerCase().replace(/[^a-z]/g, '');
  };

  const coordinatorUsers = [
    { name: 'Ms. Anjali Desai', email: 'anjali@school.edu', type: 'coordinator', role: 'Academic Coordinator' },
    { name: 'Mr. Ramesh Nambiar', email: 'ramesh@school.edu', type: 'coordinator', role: 'Academic Coordinator' },
    { name: 'Ms. Meera Chopra', email: 'meera@school.edu', type: 'coordinator', role: 'Academic Coordinator' },
    { name: 'Mr. Suresh Patel', email: 'suresh@school.edu', type: 'coordinator', role: 'Academic Coordinator' },
    { name: 'Ms. Kavita Rao', email: 'kavita@school.edu', type: 'coordinator', role: 'Academic Coordinator' }
  ];

  const teacherUsers = allTeachers.map(t => {
    const first = getCleanFirst(t.name);
    return {
      u: first, // Username is first name lowercased
      p: first + '123', // Password is firstname123
      name: t.name,
      role: 'Class Teacher',
      email: t.email,
      type: 'teacher',
      id: t.id
    };
  });

  const coordUsers = coordinatorUsers.map((c, idx) => {
    const first = getCleanFirst(c.name);
    return {
      u: first, 
      p: first + '123',
      name: c.name,
      role: c.role,
      email: c.email,
      type: c.type,
      id: 500 + idx
    };
  });

  const initialUsers = [
    { u: 'admin', p: 'admin123', name: 'Administrator', role: 'System Admin', email: 'admin@school.edu', type: 'admin', id: 0 },
    ...teacherUsers,
    ...coordUsers
  ];

  // Map to ensure unique usernames if there are duplicates
  const uniqueUsers = [];
  const uMap = new Set();
  initialUsers.forEach(user => {
    let finalU = user.u;
    let count = 1;
    while(uMap.has(finalU)) {
      finalU = user.u + count;
      count++;
    }
    uMap.add(finalU);
    user.u = finalU;
    uniqueUsers.push(user);
  });

  await User.deleteMany({});
  await User.insertMany(uniqueUsers);
  
  const initialConfig = { key: 'main', dark: false, compact: false, notifs: true, email: true, sound: false, autoAI: false, target: 90, maxWL: 8 };
  await Config.deleteMany({});
  await Config.create(initialConfig);

  console.log("Seeding complete! Closing connection.");
  await mongoose.disconnect();
}

seed().catch(err => console.error(err));
