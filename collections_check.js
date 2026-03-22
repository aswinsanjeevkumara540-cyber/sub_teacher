const mongoose = require('mongoose');
const fs = require('fs');

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/schoolDB');
        const collections = await mongoose.connection.db.listCollections().toArray();
        const names = collections.map(c => c.name);
        
        fs.writeFileSync('collections_check.json', JSON.stringify(names, null, 2));
    } catch (e) {
        fs.writeFileSync('collections_check.json', JSON.stringify({ error: e.message }));
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
})();
