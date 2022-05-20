const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

//this is the partt which sends the email.

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    //email submmission port:58
    //smtp over ssl/tls worrks over port 587
    port:587,
    secure:false,
    auth:{
        user:'1032201412@mitwpu.edu.in',
        pass:'Tanish99@#@#@#'
    }
});






let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        //place all email templates...
        //relattivePath is the the place from where this function is being called.
        path.join(__dirname,'../views/mailers',relativePath),
        data,function(err,template){
            if(err)
            {
                console.log('error in rendering template...',err);
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;

}




module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}
