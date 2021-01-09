const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { stringify } = require('querystring');


const app = express();
// to use static files

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', function(req,res){
    
    const currentPath = __dirname;
    const appended_path = "/signup.html"
    const completePath = currentPath + appended_path;
    res.sendFile(completePath);
    
})


app.post('/' , function(req,res){
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    var data = {
        members : [
            {
                email_address: email,
                status : "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/948d3481a3"
    const options = {
        method: "POST",
        auth: "rahul1:2a302ca22ff628d39768e37576f4ac28-us7"
    }

    const request = https.request(url,options, function(response){
        response.on("data" , function(data){
        console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})


app.listen(3000, function(){
    console.log("Server is running on Port 3000");
})


// List ID
// 948d3481a3

// Api Id
// 2a302ca22ff628d39768e37576f4ac28-us7
