const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { stringify } = require('querystring');
const api_key = process.env.API_KEY;
const list_id = process.env.List_id;


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
    const url = "https://us7.api.mailchimp.com/3.0/lists/" +  list_id.toString();
    const options = {
        method: "POST",
        auth: "rahul:" + api_key.toString()
        
    }
    const request = https.request(url,options, function(response){
        response.on("data" , function(data){
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");    
        }
        else{
            
                res.sendFile(__dirname + "/failure.html")
            
             }
        
        })
    })
    request.write(jsonData);
    request.end();
    
})
app.post("/failure", function(req,res){
    res.redirect("/");
    res.end;
})





app.listen(3000, function(){
    console.log("Server is running on Port 3000");
})

