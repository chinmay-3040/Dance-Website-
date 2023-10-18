const express = require("express");
const path = require("path");
const fs = require("fs")
const app = express();
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

//mongoose connecting
main().catch(err=>
    console.log(err)
)
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance')
}
main().then(()=>{
    console.log("MongoDB connected 2")
})


//Defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email : String,
    address : String,
    concern : String
});

//Defining model / Creating the collection
const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded()) //to save the posted data (app.post)

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
})

app.get('/home', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res)=>{
    const params = {};
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res)=>{
    const params = {};
    res.status(200).render('services.pug', params);
})
app.get('/thankyou', (req, res) => {
    const params = {};
    res.status(200).render('thankyou.pug', params);
});


//Older post request code
// app.post('/contact', (req, res)=>{
//     let name = req.body.name
//     let phone = req.body.phone
//     let email = req.body.email
//     let address = req.body.address
//     let more = req.body.concern

//     //Writing the matter on file:
//     let outputToWrite = `the name of the client is ${name} , ${phone} is contact no, ${email}, residing at ${address}. More about him/her: ${more} \n`;
//     fs.appendFileSync('output.txt', outputToWrite);
//     // console.log(req.body);
//     const params = {'message': 'Your form has been submitted successfully'}
//     // res.status(200).render('index.pug', params);


//     //redirecting you to thank you page
//     res.redirect('/thankyou');

// });


//New post request code
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save()
        .then(() => {
            res.redirect('/thankyou');
        })
        .catch(() => {
            res.status(400).send("Item was not saved to the database");
        })
});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
