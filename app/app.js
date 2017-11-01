const Koa = require('koa');
const app = new Koa();
// , logger = require('koa-logger')
// , json = require('koa-json')
var views = require('koa-views')
// , onerror = require('koa-onerror');
const log4js = require('log4js');
log4js.configure('log.json');
const log = log4js.getLogger('app');

var index = require('./routes/index');
var users = require('./routes/users');

// error handler
// onerror(app);

// global middlewares
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// app.use(require('koa-bodyparser')());
// app.use(json());
// app.use(logger());

// Response Time Record
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// Static Resources Response
app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
