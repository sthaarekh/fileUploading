const os = require('os');

const getLocalIpAddress = () => {
    const interfaces = os.networkInterfaces();
    for (let name in interfaces) {
        for (let networkInterface of interfaces[name]) {  // Changed variable name
            // Check for IPv4 and non-internal IP address
            if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
                return networkInterface.address;
            }
        }
    }
    return 'localhost'; // Fallback to localhost
};
module.exports = getLocalIpAddress();
