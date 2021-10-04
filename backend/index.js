const express = require('express');

const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/values', (req, res, next) => {
    db.pool.query('SELECT * FROM lists;', (err, results, field) => {
        if(err) {
            console.log(err);
            next(err);
        } else {
            return res.json(results);
        }
    })
})

app.post('/api/value', (req, res, next) => {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}");`, (err, results, field) => {
        if(err) next(err);
        else {
            return res.json({ success: true, value: req.body.value });
        }
    });
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
      message: err.message || 'Server Error!',
      status: err.status,
      ok: err.ok || false,
    });
  });

app.listen(5000, () => {
    console.log('5000번 포트로 서버 실행 완료');
})