let express = require('express');
let app = express();
const PORT = 4001;

//Serve static files
app.use(express.static('server/public'));

//spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});