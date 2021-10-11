const express = require('express');
const knex = require('../db/client');
const router = express.Router();

// replace faker demo image with  unsplash
router.get('/demo/:id', function (req, res) { 
    if(req.params.id==0){        
        knex("cohorts")
        .min('id')     
        .then(data => {
            //console.log(data[0]);
            res.render('../db/seeds/demo',{ id: data[0]['min'] } );
        })
    }else{
          res.render('../db/seeds/demo',{ id:  req.params.id } );
    }     
});

router.patch('/input_demo_image/:id', (req, res) => {   
    //console.log(req.body);
    //console.log(req.params);
    knex("cohorts")
    .where("id", req.params.id)
    .update(      
        {  
            logoUrl: req.body.imgurl
        }    
    ).then(() => {
        knex("cohorts")
        .max('id')     
        .then(data => {
            console.log(data[0]['max']);
            next_id = parseInt(req.params.id)+1;
            console.log(next_id);
            if(next_id>data[0]['max']){ 
                res.redirect("/cohorts");
            }else{                
                res.redirect(`/cohorts/demo/${next_id}`);                
            }
        })
    })        
});


module.exports = router;