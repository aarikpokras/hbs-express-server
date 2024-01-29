const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.json());

const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('main', {
    pageTitle: 'Enter your name',
  });
  console.log('Sent /')
});

app.get('/acct', (req, res) => {
  res.render('page', {
    pageTitle: "All names",
    heading: "Accounts",
  });
  console.log('Sent /acct')
});

app.post('/post', (request, reply) => {
try {
  var xx = request.body.xx;
  console.log("User entered " + xx);
  reply.json({ msg: `${xx}` });
  const fpath = "./views/page.hbs";
  fs.appendFile(fpath, xx+"<br />", (err) => {
    if (err) {
      console.error('ERROR!! ' + err);
    } else {
      console.log('Written to ' + fpath);
    }
  });
} catch(err) {
  console.log(`err is from catch ... ${err}`)
}
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + '/404.html');
  console.log('404 sent, 404 Error!!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
})
