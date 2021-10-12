const cors = require('cors');

const corsOptions = {
    origin: ['https://127.0.0.1', 'https://mybank.com'],
    optionsSuccessStatus: 200
  };
  
module.exports = cors(corsOptions);