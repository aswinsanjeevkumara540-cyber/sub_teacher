const http = require('http');
const fs = require('fs');

http.get('http://localhost:3000/api/all-data', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            const tt = parsed.timetable || [];
            const byDay = {};
            tt.forEach(r => { byDay[r.day] = (byDay[r.day] || 0) + 1; });
            const summary = {
                counts: byDay,
                total: tt.length
            };
            fs.writeFileSync('api_check_days.json', JSON.stringify(summary, null, 2));
        } catch (e) {
            fs.writeFileSync('api_check_days.json', JSON.stringify({ error: e.message }));
        }
    });
});
