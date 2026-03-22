const mongoose = require('mongoose');
(async () => {
    try {
        console.log('Connecting...');
        await mongoose.connect('mongodb://localhost:27017/schoolDB', { serverSelectionTimeoutMS: 2000 });
        console.log('Connected.');
        const User = mongoose.model('User', new mongoose.Schema({ u: String, type: String }), 'users'); // collection name 'users'
        const count = await User.countDocuments();
        console.log('USER_COUNT:' + count);
        const allUsers = await User.find({}, { u: 1, type: 1, _id: 0 });
        console.log('USERS:' + JSON.stringify(allUsers));
    } catch (e) {
        console.error('ERROR:' + e.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
})();
