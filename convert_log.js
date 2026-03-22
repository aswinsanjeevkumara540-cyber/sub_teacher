const fs = require('fs');
try {
    const content = fs.readFileSync('server.log', 'utf16le');
    fs.writeFileSync('server_utf8.log', content, 'utf8');
} catch (e) {
    console.error(e);
}
