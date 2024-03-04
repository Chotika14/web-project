const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs')
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/rate', (req, res, next) => {
    let options = {
        root: __dirname,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        }
    };
    res.sendFile('/rate.html', options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent: rate.html');
        }
    });
});
app.post('/api/users/create', (req, res) => {
    let name1 = req.body.name1;
    let name2 = req.body.name2;
    let email = req.body.email;
    let score = req.body.mobile
    let day = new Date()
    let x = day.toLocaleString()
    
        let content = name1 + " " +name2 + " " + email +"\n"+"Date"+ x +"\n"+"Score"+" "+score+"\n";
        fs.appendFile('./user.txt', content ,(err) => {
            if(err){
                console.error(err)
                return
            }
            console.log('File written successfully.');
        })
        res.send([
            '---Success---',
            `Name: ${name1}`,
            `Surname: ${name2}`,
            `Email: ${email}`,
            `Score: ${score}`,
            `Date: ${x}`,
        ].join('<br>'));
    
    // Assume that we save it to db
    console.log('Saved.');
    
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
