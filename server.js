const koa = require("koa");

let app = new koa();
app = require("./app")(app);
const port = process.env.PORT || 3000;
app.listen(port);
