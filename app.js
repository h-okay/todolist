let express = require('express');
let app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Global Variables
const today = new Date();
let day = today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
let items = [];

/*
    * GET /
    * @desc: Renders the list.ejs file
    * @params: None
    * @return: None
*/
app.get('/', (_, res) => {
    res.render('list', { day: day, items: items });
});

/*
    * POST /
    * @desc: Adds the new item to the list
    * @params: None
    * @return: None
    * @redirect: /
*/
app.post("/", (req, res) => {
    let item = req.body.newItem;
    (!(item === "")) ? items.push(item) : null;
    res.redirect("/");
});

// Server
app.listen(3000, () => console.log('Example app listening on port 3000!\nhttp://localhost:3000'));
