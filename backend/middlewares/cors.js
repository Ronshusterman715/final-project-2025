const cors = require('cors');

const corsMiddleware = cors({
    origin: [
        "http://localhost:5173",
        "https://final-project-2025-1-kmjy.onrender.com",
    ]
});

module.exports = corsMiddleware;