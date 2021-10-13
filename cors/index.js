const cors = require('cors');

const corsOptions = {
    origin: 'https://127.0.0.1',
    optionsSuccessStatus: 200
  };
  
module.exports = cors(corsOptions);