type credentialType = {
  applicant_name: string;
  job_title: string;
  company_name: string;
  company_created_at: string | Date;
  company_city: string;
  company_country: string;
  company_email: string;
};

export const createHtmlTemplate = (credentials: credentialType) => {
  const {
    applicant_name,
    job_title,
    company_name,
    company_created_at,
    company_city,
    company_country,
    company_email,
  } = credentials;
  const htmlTemplate = `
  <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f6f6f6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .header img {
            width: 100px;
        }
        .content {
            padding: 20px;
        }
        .content h1 {
            color: #333333;
        }
        .content p {
            color: #666666;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            color: #999999;
            font-size: 12px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
  
        <div class="content">
            <h1>Thank You for Applying!</h1>
            <p>Dear ${applicant_name},</p>
            <p>Thank you for applying for the ${job_title} position at ${company_name}. We have received your application and our team is currently reviewing your qualifications.</p>
            <p>If your profile matches our requirements, we will contact you for the next steps in the recruitment process. We appreciate your interest in joining our team and wish you the best of luck.</p>
            <p>In the meantime, you can track the status of your application by logging into your account on our <a href="https://company-website.com">website</a>.</p>
          
        </div>
        <div class="footer">
            <p>&copy; ${company_created_at} ${company_name}. All rights reserved.</p>
            <p>${company_city},${company_country} | ${company_email}</p>
            <p> Company Created At ${new Date().getFullYear()}</p>
        </div>
    </div>
</body>
</html>
`;
  return htmlTemplate;
};
