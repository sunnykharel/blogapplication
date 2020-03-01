//sunny followed a tutorial and was driving while aaskar was navigating


const router = require('express').Router();
let Subscription = require('../models/subscription.model');
let Blogpost = require('../models/blogpost.model');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.route('/').get((req, res)=> {
    const twentyfourhours=1000*60*60*24;
    const today = new Date();
    Blogpost.find(function (err, blogpost) {
        if (err) return console.error(err);
        var newposts=[""]
        for(var i = 0; i < blogpost.length; i++){
            console.log(twentyfourhours, today -new Date(blogpost[i]['updatedAt']));
            if( today - new Date(blogpost[i]['updatedAt']) < twentyfourhours){
                newposts.push("<p> "+newposts.length+") '<strong>"+blogpost[i]['title']+"</strong>' by "+blogpost[i]['email']+"</p>");
            } 
        }
        newpostString = "<h3> Here are today's posts!</h3>"+newposts.join('<br>');
        Subscription.find(function (err, subscriptions) {
            if (err) return console.error(err);
            for(var j = 0; j< subscriptions.length; j++){
                var emailAddress = subscriptions[j]['email'];
                if(newposts.length>0){
                    var msg = {
                        to: emailAddress,
                        from: 'sunnykharel@utexas.edu',
                        subject: 'Today\'s overview with A&S Blogging'+ new Date(),
                        text: 'New blogs today',
                        html: newpostString,
                    };
                    sgMail.send(msg);
                }
            }
        });
    })
    .then(()=>res.json("success"))
    .catch(err=> res.status(400).json("error"+err));
});


router.route('/add').post((req,res)=>{
    const email = req.body.email;
    const newSubscription = new Subscription({
        email,
    });
    
    newSubscription.save()
    .then(()=> res.json('Post added!'))
    .catch(err => res.status(400).json('Error: '+err));
    
});

router.route('/delete').post((req,res)=> {
    const _email = req.body.email;  
    Subscription.findOneAndRemove({
        email: _email 
    })
    .then(response => {
        res.json("User removed from subscriptions");
    })
    .catch(err => {
        res.status(400).json('Error: '+err);
    });
});

module.exports = router;