const http = require('http');
const fs = require('fs');

http.get('http://localhost:3000/api/all-data', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            const summary = {
                teacherCount: parsed.teachers.length,
                studentCount: parsed.students.length,
                timetableCount: parsed.timetable ? parsed.timetable.length : 'MISSING',
                firstTimetableEntry: parsed.timetable ? parsed.timetable[0] : null
            };
            fs.writeFileSync('api_check.json', JSON.stringify(summary, null, 2));
        } catch (e) {
            fs.writeFileSync('api_check.json', JSON.stringify({ error: 'Parse error', raw: data.substring(0, 100) }));
        }
    });
}).on('error', (err) => {
    fs.writeFileSync('api_check.json', JSON.stringify({ error: err.message }));
});
