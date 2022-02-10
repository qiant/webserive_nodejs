const express = require('express');
const PORT = 8080;
const app = new express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

// read home
app.get('/', (req, res) => {
    res.status(200).json({
        success: true, 
        msg: 'Welcome to resume web service.'
    });
});

require("./routes/resume.routes.js")(app);

app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}.`)
})