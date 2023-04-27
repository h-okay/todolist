const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Global Variables
const items = [];
const workItems = [];

/*
 * GET /
 * @desc: Renders the list.ejs file with the items list
 * @params: None
 * @return: None
 */
app.get("/", (_, res) => {
  let day = date.getDate();
  res.render("list", { listHeader: day, items: items, nextList: "/work" });
});

/*
 * POST /
 * @desc: Adds a new item to the relevant list
 * @params: None
 * @return: None
 * @redirect: / or /work
 * @body: newItem, list
 */
app.post("/", (req, res) => {
  let item = req.body.newItem;
  let listType = req.body.list;

  if (listType === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

/*
 * GET /work
 * @desc: Renders the list.ejs file with the work list
 * @params: None
 * @return: None
 * @redirect: None
 */
app.get("/work", (_, res) => {
  res.render("list", {
    listHeader: "Work List",
    items: workItems,
    nextList: "/",
  });
});

/*
 * POST /remove
 * @desc: Removes an item from the relevant list
 * @params: None
 * @return: None
 * @redirect: / or /work
 */
app.post("/remove", (req, res) => {
  let item = req.body.item;
  let listType = req.body.list;

  if (listType === "Work") {
    workItems.splice(workItems.indexOf(item), 1);
    res.redirect("/work");
  } else {
    items.splice(items.indexOf(item), 1);
    res.redirect("/");
  }
});

// Server
app.listen(3000, () => console.log(`Server started on port ${PORT}`));
