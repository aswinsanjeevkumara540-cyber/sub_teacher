const { exec } = require('child_process');
const mongoose = require('mongoose');

async function restartStatus() {
  console.log('Attempting to stop existing server process on port 3000...');
  exec('powershell -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force"', (err) => {
    // Error is expected if port is not in use
    console.log('Starting server...');
    const server = exec('node server.js');
    server.stdout.on('data', d => console.log('SERVER OUT:', d));
    server.stderr.on('data', d => console.log('SERVER ERR:', d));
    
    setTimeout(() => {
        console.log('Check if port is actually listening...');
        exec('powershell -Command "Get-NetTCPConnection -LocalPort 3000"', (e, stdout) => {
            console.log(stdout || 'Port not listening');
            process.exit(0);
        });
    }, 5000);
  });
}

restartStatus();
