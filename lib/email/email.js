const nodemailer = require('nodemailer');
 
exports.sendMail = async (to, subject, html) => {
    // const
    // googleTransport = await nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         type: 'OAuth2',
    //         user: 'felipechoi97@gmail.com',
    //         clientId: '18744493459-5r3t2ggaeacuglduevpicr5233vd1ujr.apps.googleusercontent.com',
    //         clientSecret: 'XrJTjbSDZP1oVbWyK1TSOjOO',
    //         refreshToken: '1//04e5adEI0OcvDCgYIARAAGAQSNwF-L9IrySQbGvDMUp3ajoku-NtgQ5QCY8jcGXsxPKV2KsicN7ew5Cv2E5PWohevBJADkDUTB3Q',
    //         accessToken: 'ya29.a0Ae4lvC3IntSdx8QtcSjJSMu9VLTctYOL__pnuXTN02FyhCw68aoyhlhInbDkqA01JiaaZt0Xi3uHdylpI0a5m4krQqP_jFVKZs52StA_vi8khli4Zq9-59_E569BdQA44L3oJVTBim58tCRMGiL9bWciGDBCPwN8kqQ',
    //         expires: 3600
    //     }
    // }),
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
 
