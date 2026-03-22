const mongoose = require('mongoose');
const fs = require('fs');

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/schoolDB');
        const Timetable = mongoose.model('Timetable', new mongoose.Schema({ day: String, p: Number, t: String, data: mongoose.Schema.Types.Mixed }));
        
        const count = await Timetable.countDocuments();
        const firstEntry = await Timetable.findOne();
        
        const result = {
            count: count,
            firstEntry: firstEntry
        };
        
        fs.writeFileSync('db_check.json', JSON.stringify(result, null, 2));
        console.log('Results written to db_check.json');
    } catch (e) {
        fs.writeFileSync('db_check.json', JSON.stringify({ error: e.message }));
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
})();
