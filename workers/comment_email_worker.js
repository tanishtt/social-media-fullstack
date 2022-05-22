//each queue must have an worker.
//one worker might operate many queues.
//queues are set(array) of similar works.

const queue=require('../config/kue');

const commentsMailer=require('../mailers/comments_mailer');

//every worker have a process function...
//the process function tells the worker that whever new task is added to your queue, you need to run the process.

queue.process('emails',function(job,done){
   //jobs-> what's it need to do.
   //1.the function is need to be run inside it.
   //2.data
   console.log('emails workers is processing a job',job.data);
   commentsMailer.newComment(job.data);

   done();
})
