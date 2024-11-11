const INQUIRYCATEGORIESEmailTemplates = [
  {
    inquiryCategory: "Applications and Requests",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p>You are now in the teaching hospital [requested teaching hospital].</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p>You are now in study group  no. [requested group].</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p>You  are now demonstator student for [requested subject].</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>We are pleased to inform you that your enrollment certificate has been issued. </p><p>The certificate is valid for the entire academic year.</p>  <p>You can find the certificate attached to this email. Please keep it for your records and use it as needed</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept: `<p>Dear [Student's Name]<p><p>We are pleased to inform you that your request to review your exam has been approved. The exam review for the subject [Subject Name] has been scheduled as follows:</p><p><ul><li ><p>Date: [Date]</p></li><li><p>Time: [Time]</p></li><li><p>Location: [Location]</p></li></ul>.</p> <p>Button Please confirm  your attendance . If you are unable to attend at the scheduled time, please let us know as soon as possible.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>`,

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p>The following  subjects can be recognized as shown  [individual list attachment]</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p>The following  subjects can be recognized as shown  [individual list attachment]</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><p>You can borrow your diploma in the interval of time  [interval of time requested].</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        notify:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      }
    ]
  },
  {
    inquiryCategory: "Book rental UMCH library",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      }
    ]
  },
  {
    inquiryCategory: "Campus IT",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      }
    ]
  },
  {
    inquiryCategory: "Complaints",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      }
    ]
  },
  {
    inquiryCategory: "Internship",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      }
    ]
  },
  {
    inquiryCategory: "Medical Abilities",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      }
    ]
  },
  {
    inquiryCategory: "Thesis",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      }
    ]
  },
  {
    inquiryCategory: "Other",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placng your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Congratulations! Your request has been approved.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]<p><p>[Institution/Organization Name]<p><p>[Contact Information]</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p>We regret to inform you that your request has been declined. We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><p>Best regards,</p><p>[Your Name]</p><p>[Your Title]</p><p>[Institution/Organization Name]</p><p>[Contact Information]</p>"
      }
    ]
  }
];

const POSITIONNAMES = [
  "UMCH Study Secretariat",
  "UMFST Administration Board Management (Vice-Rector)",
  "UMFST Administration Office (UMFST Targu Mures)",
  "CPE Board Management, UMCH Finance Department",
  "UMCH Facility Department",
  "UMCH Teaching Hospital Coordination",
  "UMCH IT-SUPPORT, UMFST - Rector (UMFST Targu Mures)"
];

const INQUIRYCATEGORIES = [
  {
    inquiryCategory: "Applications and Requests",
    component: "",
    subCategories: [
      { subCategory1: "Absence", component: "Absence" },
      {
        subCategory1: "Change of teaching hospital",
        component: "ChangeTeachingHospital"
      },
      {
        subCategory1: "Change of study group",
        component: "ChangeStudyGroup"
      },
      {
        subCategory1: "Demonstrator student",
        component: "DemonstratorStudent"
      },
      {
        subCategory1: "Enrollment",
        component: "Enrollment"
      },
      {
        subCategory1: "Exam inspection",
        component: "ExamInspection"
      },
      {
        subCategory1: "Online Catalogue (Carnet)",
        component: "OnlineCatalogue"
      },
      {
        subCategory1: "Recognition of Courses",
        component: "RecognitionCourses"
      },
      {
        subCategory1: "Recognition of Internship",
        component: "RecognitionInternship"
      },
      {
        subCategory1: "Short term borrow of Diploma",
        component: "ShotTermBorrowDiploma"
      },
      {
        subCategory1: "Syllabus of the academic year",
        component: "SyllabusAcademic"
      },
      {
        subCategory1: "Transcript of Records",
        component: "TranscriptRecords"
      },
      {
        subCategory1: "Transfer to Targu Mures",
        component: "TransferTarguMures"
      },
      {
        subCategory1: "Other",
        component: "OtherApplicationRequest"
      }
    ]
  },
  {
    inquiryCategory: "Book rental UMCH library",
    component: "",
    subCategories: [
      { subCategory1: "Book rental UMCH library", component: "BookRental" }
    ]
  },
  {
    inquiryCategory: "Campus IT",
    component: "",
    subCategories: [
      { subCategory1: "Canvas", component: "Canvas" },
      { subCategory1: "Streaming / Panopto", component: "Streaming" }
    ]
  },
  {
    inquiryCategory: "Complaints",
    component: "",
    subCategories: [
      { subCategory1: "Campus", component: "Campus" },
      { subCategory1: "Dean’s Office", component: "DeanOffice" },
      {
        subCategory1: "German Teaching Department",
        component: "GermanTeachingDepartment"
      },
      { subCategory1: "Teaching Hospital", component: "TeachingHospital" },
      { subCategory1: "Teacher", component: "Teacher" },
      {
        subCategory1: "Online Catalouge (Carnet)",
        component: "OnlineCatalougeComplaint"
      },
      { subCategory1: "Exam", component: "Exam" },
      { subCategory1: "Other", component: "OtherComplaint" }
    ]
  },
  {
    inquiryCategory: "Internship",
    component: "",
    subCategories: [{ subCategory1: "Internship", component: "Internship" }]
  },
  {
    inquiryCategory: "Medical Abilities",
    component: "",
    subCategories: [
      { subCategory1: "Medical Abilities", component: "MedicalAbilities" }
    ]
  },
  {
    inquiryCategory: "Thesis",
    component: "",
    subCategories: [{ subCategory1: "Thesis", component: "Thesis" }]
  },
  {
    inquiryCategory: "Other",
    component: "",
    subCategories: [{ subCategory1: "Other", component: "Other" }]
  }
];
export { INQUIRYCATEGORIESEmailTemplates, INQUIRYCATEGORIES, POSITIONNAMES };
