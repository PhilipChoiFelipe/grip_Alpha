const nodemailer = require('nodemailer');
 
exports.sendMail = async (to, subject, html) => {
	const googleTransport = await nodemailer.createTransport({
	  service: "Gmail",
	  auth: {
		  user: "gripandpullup@gmail.com",
		  pass: process.env.EMAIL_SECRET
	  },
	  tls: {
		  rejectUnauthorized: false
	  }
	});
    mailOptions = {
        from: 'GRIP <gripandpull@gmail.com>',
        to,
        subject,
        html
    }
 
    try {
        await googleTransport.sendMail(mailOptions);
        googleTransport.close();
        console.log(`mail have sent to ${ to }`);
    } catch (error) {
        console.error(error);
    }
}
 
