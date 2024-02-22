const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//create the middleware for the parsing requested bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//define to the server that the static files are stored inside the public
app.use(express.static('public'));

//defining the route 
app.get('/',(req,res)=>
{
    res.sendFile(__dirname+'/public/send-email.html');
})

//configure nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'nishatperwez331@gmail.com', // your particular mailid
        pass: 'wypj ezyr lrte kzvb'
    }
});

app.post('/send-email',(req,res)=>{
    const{to,subject,message} =req.body;

    const mailOptions = {
        to,
        subject,
        message,
    };

transporter.sendMail(mailOptions,(error,infor)=>
{
    if(error){
        console.error(error);
        res.status(500).send('error in sending mail')
    } else{
        console.log('email sent:'+ infor.response);
        res.send('email send successfully');
    }
});

});

app.listen (port,()=>
{
    console.log(`server is running on port ${port}`)
});

