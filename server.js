const express         = require('express'),
      app             = express(),
      mongodb         = require('mongodb'),
      mongoClient     = mongodb.MongoClient,
      bodyParser      = require('body-parser'),
      parseJson       = bodyParser.json(),
      dbUri           = 'mongodb://root:1@ds046667.mlab.com:46667/integracionka';
      
/* date */

let date = {
    now: () => {
        let date = new Date();
        let now = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return now;
    } 
}

/* router */

let router = (app, db) => {
    
    const collection = db.collection('locations');
 
    /* rest api */

    app.get('/api/', (req, res) => {
        console.log(req.query)
        if(req.query.state_id) {
            if(req.query.city_id) {
                collection.find(                   
                    {"state_data": {
                            $elemMatch: {"city_id": Number(req.query.city_id)}
                    },
                    "state_id": Number(req.query.state_id)
                },
            {
                "state_name": 1,
                "state_id": 1,
                "state_data": {
                    $elemMatch: {"city_id": Number(req.query.city_id)}
            }
            }).toArray((err, result) => {
                    (err) ? res.status(500).send(err) : res.status(200).send(result);
                });
            } else {
                collection.find({
                    "state_id": Number(req.query.state_id)
                }).toArray((err, result) => {
                    (err) ? res.status(500).send(err) : res.status(200).send(result);
                });
            }

        } else {
            collection.find({},
                {
                    "state_name": 1,
                    "state_id": 1,
                }).toArray((err, result) => {
                (err) ? res.status(500).send(err) : res.status(200).send(result);
            });
        }   
    });

}

/* db connect */

mongoClient.connect(dbUri, (err, db) => {
    router(app, db);
});

/* start server */

app.listen(8889, function () {
    console.log('listen 8889'+ ' at ' + date.now());

});