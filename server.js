const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Health Check
app.get('/api/ping', (req, res) => res.json({ status: 'ok', time: new Date() }));

// =====================
// MongoDB Connection
// =====================
const mongoURI = "mongodb://localhost:27017/schoolDB";
mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB via Mongoose"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));

// =====================
// Mongoose Models
// =====================

const TeacherSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  subjects: [String],
  avail: String,
  email: String,
  phone: String,
  exp: Number,
  dept: String,
  workload: Number,
  rating: Number
});
const Teacher = mongoose.model('Teacher', TeacherSchema);

const StudentSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  cls: String,
  roll: Number,
  gender: String,
  parent: String,
  phone: String,
  email: String,
  attendance: Number,
  grades: mongoose.Schema.Types.Mixed,
  status: String
});
const Student = mongoose.model('Student', StudentSchema);

const AbsenceSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  teacherId: Number,
  teacher: String,
  date: String,
  subject: String,
  period: mongoose.Schema.Types.Mixed,
  cls: String,
  status: String,
  subId: Number,
  aiSug: mongoose.Schema.Types.Mixed,
  aiLoad: Boolean
});
const Absence = mongoose.model('Absence', AbsenceSchema);

const LeaveSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  teacherId: Number,
  teacher: String,
  type: String,
  from: String,
  to: String,
  days: mongoose.Schema.Types.Mixed,
  reason: String,
  status: String,
  approvedBy: String,
  applied: String
});
const Leave = mongoose.model('Leave', LeaveSchema);

const NotifSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  msg: String,
  type: String,
  time: String,
  read: Boolean
});
const Notification = mongoose.model('Notification', NotifSchema);

const ConfigSchema = new mongoose.Schema({
  key: { type: String, default: 'main', unique: true },
  dark: Boolean,
  compact: Boolean,
  notifs: Boolean,
  email: Boolean,
  sound: Boolean,
  autoAI: Boolean,
  target: Number,
  maxWL: Number,
  lvLocked: { type: Boolean, default: false }
});
const Config = mongoose.model('Config', ConfigSchema);

const UserSchema = new mongoose.Schema({
  u: { type: String, unique: true },
  p: String,
  name: String,
  role: String,
  email: String,
  type: String, // 'admin', 'coordinator', 'teacher'
  id: Number
});
const User = mongoose.model('User', UserSchema);

const TimetableSchema = new mongoose.Schema({
  day: String,
  p: Number,
  t: String,
  data: mongoose.Schema.Types.Mixed // Will store class IDs as keys and { s, tc } as values
});
const Timetable = mongoose.model('Timetable', TimetableSchema);


// =====================
// API Routes
// =====================

// Initial Load: Fetch everything
app.get('/api/all-data', async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ id: 1 });
    const students = await Student.find().sort({ id: 1 });
    const absences = await Absence.find().sort({ id: -1 });
    const leaves = await Leave.find().sort({ id: -1 });
    const notifs = await Notification.find().sort({ id: -1 });
    const config = await Config.findOne({ key: 'main' });
    const rawUsers = await User.find();
    const timetable = await Timetable.find().sort({ day: 1, p: 1 });
    
    // Group users as expected by frontend
    const users = { admin: [], coordinator: [], teacher: [] };
    rawUsers.forEach(u => {
      if (users[u.type]) users[u.type].push(u);
    });

    res.json({ teachers, students, absences, leaves, notifs, config, users, timetable });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generic Save/Update Routes
async function handleSave(model, req, res) {
  try {
    const data = req.body;
    if (data.id) {
      const updated = await model.findOneAndUpdate({ id: data.id }, data, { upsert: true, new: true });
      res.json(updated);
    } else {
      const newItem = new model(data);
      await newItem.save();
      res.json(newItem);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

app.post('/api/teachers', (req, res) => handleSave(Teacher, req, res));
app.post('/api/students', (req, res) => handleSave(Student, req, res));
app.post('/api/absences', (req, res) => handleSave(Absence, req, res));
app.post('/api/leaves', (req, res) => handleSave(Leave, req, res));
app.post('/api/notifications', (req, res) => handleSave(Notification, req, res));
app.post('/api/timetable', async (req, res) => {
  try {
    const data = req.body;
    if (Array.isArray(data)) {
      await Timetable.deleteMany({});
      const result = await Timetable.insertMany(data);
      res.json(result);
    } else if (data.day && data.p) {
      // Handle single row update
      const updated = await Timetable.findOneAndUpdate(
         { day: data.day, p: data.p }, 
         data, 
         { upsert: true, new: true }
      );
      res.json(updated);
    } else {
      res.status(400).json({ error: "Expected an array or single row with day and p" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/config', async (req, res) => {
  try {
    const updated = await Config.findOneAndUpdate({ key: 'main' }, req.body, { upsert: true, new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bulk Notification updates
app.post('/api/notifications/mark-all-read', async (req, res) => {
  try {
    await Notification.updateMany({}, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/notifications/clear-all', async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Management
app.post('/api/users', async (req, res) => {
  try {
    const data = req.body;
    const updated = await User.findOneAndUpdate({ u: data.u }, data, { upsert: true, new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static files AFTER routes
app.use(express.static(__dirname));

// =====================
// Homepage
// =====================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'EduAI_Pro_v3.html'));
});

// =====================
// Start Server
// =====================
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});