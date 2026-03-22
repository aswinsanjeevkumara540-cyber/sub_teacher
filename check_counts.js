const mongoose = require('mongoose');
(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/schoolDB');
        const Teacher = mongoose.model('Teacher', new mongoose.Schema({ id: Number }));
        const Student = mongoose.model('Student', new mongoose.Schema({ id: Number }));
        const Timetable = mongoose.model('Timetable', new mongoose.Schema({ day: String }));
        
        console.log('Teachers:', await Teacher.countDocuments());
        console.log('Students:', await Student.countDocuments());
        console.log('Timetable Entries:', await Timetable.countDocuments());
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
})();
