var router = require('koa-router')();

router.get('/', async (ctx) => {
  let title = 'Hello Koa2'
  await ctx.render('index', { title })
})

router.get('/foo', function* (next) {
  yield this.render('index', {
    title: 'Hello World foo!'
  });
});

module.exports = router;
