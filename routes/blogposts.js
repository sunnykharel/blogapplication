//sunny followed a tutorial and was driving while aaskar was navigating


const router = require('express').Router();
let Blogpost = require('../models/blogpost.model');

router.route('/').get((req, res) => {
    
    
    console.log("reached here");
    
    
    Blogpost.find()
        .then(blogposts => res.json(blogposts))
        .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/add').post((req, res) => {
    const email = req.body.email;
    const title = req.body.title;
    const date = req.body.date;
    const post = req.body.post;
    
    const newBlogpost = new Blogpost({
        email,
        title,
        date,
        post,
    });
    
    newBlogpost.save()
    .then(()=> res.json('Post added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;