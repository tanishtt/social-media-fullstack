const nodeMailer=require('../config/nodemailer');

//this is another way to export a method
exports.newComment=(comment)=>{
    console.log('inside newComment mailer',comment);


    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:'1032201412@mitwpu.edu.in',
        to: comment.user.email,
        subject:"new commentt added...",
        html:htmlString

    },(err,info)=>{
        if(err)
        {
            console.log('error in sending mail',err);
            return;
        }

        console.log('message sent',info);
    });
}
//we will call this mailer whenever there is a new comment made.





