const axios = require('axios');
const { render } = require('express/lib/response');


exports.portfolio = (req, res) => {
    res.render('index');
}


exports.login = (req, res) => {
    res.render('login');
}
exports.insights = (req, res) => {
    if (req.header('Referer') == 'http://localhost:5000/login') {
        axios.get('http://localhost:5000/api/views')
            .then(function (response) {
                res.render('insights', { viewscollection: response.data });
            })
            .catch(err => {
                res.send(err);
            })
    } else {
        res.send(`<h3>Unauthorized access</h3><br><a href="http://localhost:5000/login">Go back</a>`);
    }


}
