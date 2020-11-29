var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get('/:hero', function(req, res, next) {
    let name = req.params.hero;
    async function info(){
        let resp_attribute = await fetch(`http://localhost:1337/characters/hero/${name}`,{
               method:'GET',
           })
       let resp_rate = await fetch(`http://localhost:1337/characteristics/hero/${name}`,{
               method:'GET',
           })
       let rate = await resp_rate.json();
       let attribute = await resp_attribute.json();
       return res.render('hero_info', { title: 'Express' , name:name, rate:rate, attribute:attribute});
    }
    info()
});

module.exports = router;
