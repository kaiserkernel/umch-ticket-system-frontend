const INQUIRYCATEGORIESEmailTemplates = [
  {
    inquiryCategory: "Applications and Requests",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><p> Please make sure to inform your teachers about the decision and any subsequent steps you need to take.</p><p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },//absence
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><p>You are now in the teaching hospital [requested teaching hospital].</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },// change of teaching hospital
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><p>You are now in study group  no. [requested group].</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },// change of study group
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><p>You  are now demonstator student for [requested subject].</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },// demonstrator student
      {
        accept:
          "<p>Dear [Student's Name]<p><p>We are pleased to inform you that your enrollment certificate has been issued. </p><p>The certificate is valid for the entire academic year.</p>  <p>You can find the certificate attached to this email. Please keep it for your records and use it as needed</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },// enrollment
      {
        accept: `<p>Dear [Student's Name]<p><p>We are pleased to inform you that your request to review your exam has been approved. The exam review for the subject [Subject Name] has been scheduled as follows:</p><p><ul><li ><p>Date: [Date]</p></li><li><p>Time: [Time]</p></li><li><p>Location: [Location]</p></li></ul></p> <p>Please confirm your attendance. If you are unable to attend at the scheduled time, please let us know as soon as possible.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>`,

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },// exam inspection
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><p>The following  subjects can be recognized as shown  [individual list attachment]</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><p>The 1st internship can be recognized</p><br />  <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><p>You can borrow your diploma in the interval of time  [interval of time requested].</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },// short term borrow of diploma
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p>Your request has been approved.</p><br /><p>As soon as your required document is finally issued, you will be informed to pick it up at the student secretariat.</p> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        notify:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><p>Your application to transfer to Targu Mures will be granted on the condition that 120 ECTS have been achieved at the end of the second year of study.</p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      }
    ]
  },
  {
    inquiryCategory: "Book rental UMCH library",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      }// Book rental UMCH library
    ]
  },
  {
    inquiryCategory: "Campus IT",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      }
    ]
  },
  {
    inquiryCategory: "Complaints",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      },
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      }
    ]
  },
  {
    inquiryCategory: "Internship",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      }
    ]
  },
  {
    inquiryCategory: "Medical Abilities",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      }
    ]
  },
  {
    inquiryCategory: "Thesis",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      }
    ]
  },
  {
    inquiryCategory: "Other",
    component: "",
    subCategories: [
      {
        accept:
          "<p>Dear [Student's Name]<p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your request and would like to inform you of the following decision:</p><br/><p><strong>Your request has been approved.</strong></p><br /> <p>If you have any further questions or need additional clarification, feel free to [contact us].</p><br /> <p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>",

        reject:
          "<p>Dear [Student's Name],</p><p>Thank you for your request and for placing your trust in us. We have carefully reviewed your application and would like to inform you of the following decision:</p><br /><p><strong>We regret to inform you that your request has been declined.</strong> We understand this may be disappointing, and we encourage you to reach out if you have any questions about the decision or need further assistance.</p><br /><p>If you have any further questions or need additional clarification, feel free to [contact us]. </p><br /><p>Thank you for your understanding and cooperation.</p><br/><p>Best regards,</p><p>[Your Name]</p><p>[Institution/Organization Name]</p><p> CPE Europe GmbH </p><p>University Targu Mures Medical Campus Hamburg </p><br/><p>+49 40 20934850 81 </p><p>+49 40 2093485 09</p> <p>Albert-Einstein-Ring 11-15, 22761 Hamburg, Germany</p>"
      }
    ]
  }
];

const POSITIONNAMES = [
  "UMCH Study Secretariat",
  "UMFST Administration Board Management (Vice-Rector)",
  "UMFST Administration Office (UMFST Targu Mures)",
  "CPE Board Management",
  "UMCH Finance Department",
  "UMCH Facility Department",
  "UMCH Teaching Hospital Coordination",
  "UMCH IT-SUPPORT",
  "UMFST - Rector (UMFST Targu Mures)",
  "Admin"
];

const TicketTypeStructure = [
  {
    name: "Application and Requests",
    types: [
      "Absence",
      "Change of teaching hospital",
      "Change of study group",
      "Demonstrator student",
      "Enrollment",
      "Exam inspection",
      "Online Catalogue (Solaris)",
      "Recognition of Courses",
      "Recognition of Internship",
      "Short term borrow of Diploma",
      "Syllabus of the academic year",
      "Transcript of Records",
      "Transcript to Targu Mures",
      "Internship",
      "Medical Abilities",
      "Thesis",
      "Other"
    ]
  },
  {
    name: "Book rental UMCH library"
  },
  {
    name: "Campus IT",
    types: [
      "Canvas",
      "Streaming/Panopto"
    ]
  },
  {
    name: "Complaints",
    types: [
      "Campus",
      "Dean's Office",
      "German Teaching Department",
      "Teaching Hospital",
      "Teacher",
      "Online Catalogue (Carnet)",
      "Exam",
      "Other"
    ]
  },
  {
    name: "Other"
  }
]

const TicketTypeList = [
  { "Absence": "" },
  { "Change of teaching hospital": "" },
  { "Change of study group": "" },
  { "Demonstrator student": "" },
  { "Enrollment": "" },
  { "Exam inspection": "" },
  { "Online Catalogue (Solaris)": "" },
  { "Recongnition of Courses": "" },
  { "Recognition of Internship": "" },
  { "Short term borrow of Diploma": "" },
  { "Syllabus of the academic year": "" },
  { "Transcript of Records": "" },
  { "Transfer to Targu Mures": "" },
  { "Book rental UMCH library": "" },
  { "Canvas": "" },
  { "Streaming/Panopto": "" },
  { "Campus": "" },
  { "Dean's office": "" },
  { "German Teaching Department": "" },
  { "Teaching Hospital": "" },
  { "Teacher": "" },
  { "Online Catalogue (Carnet)": "" },
  { "Exam": "" },
  { "Internship": "" },
  { "Medical Abilities": "" },
  { "Thesis": "" },
  { "Other": "" },
]

const EmailTemplateDescription = {
  "Absence": (
    <>
      <p>
        -Reason for absence ( "[reasonForAbsence]" )
      </p>
      <p>
        -Time: Absence From ( "[timeFromAbsence]" )
      </p>
      <p>
        -Time: Absence To ( "[timeToAbsence]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Change of study group": (
    <>
      <p>
        -Changing partner ( "[changePartner]" )
      </p>
      <p>
        -Study group: From ( "[currentStudyGroup]" )
      </p>
      <p>
        -Study group: To ( "[switchStudyGroup]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Change of teaching hospital": (
    <>
      <p>
        -Changing partner ( "[changePartner]" )
      </p>
      <p>
        -Hospital: From ( "[changeFromHospitalName]" )
      </p>
      <p>
        -Hospital: To ( "[changeToHospitalName]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Demonstrator student": (
    <>
      <p>
        -Subject ( "[subject]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Enrollment": (
    <>
      <p>
        -Nationality ( "[nationality]" )
      </p>
      <p>
        -Current year of study ( "[currentYearOfStudy]" )
      </p>
      <p>
        -Date of Birth ( "[birthday]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Exam inspection": (
    <>
      <p>
        -Subject ( "[subject]" )
      </p>
      <p>
        -Exam Date ( "[examDate]" )
      </p>
      <p>
        -Specification of exam ( "[examSpecification]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Online Catalogue (Solaris)": (
    <>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Recongnition of Courses": (
    <>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Recognition of Internship": (
    <>
      <p>
        -Recognition of 1st medical internship ( "[recognitionMedicalInternship]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Short term borrow of Diploma": (
    <>
      <p>
        -Date of diploma collection ( "[diplomaCollectionDate]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Syllabus of the academic year": (
    <>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Transcript of Records": (
    <>
      <p>
        -Date of Birth ( "[birthday]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Transfer to Targu Mures": (
    <>
      <p>
        -Date of Birth ( "[birthday]" )
      </p>
      <p>
        -Current year of study ( "[currentYearOfStudy]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Book rental UMCH library": (
    <>
      <p>
        -Title of the book ( "[bookTitle]" )
      </p>
      <p>
        -Period of time from ( "[periodFromTime]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Canvas": (
    <>
      <p>
        -Request ( "[request]" )
      </p>
    </>
  ),
  "Streaming/Panopto": (
    <>
      <p>
        -Room ( "[room]" )
      </p>
      <p>
        -Modules ( "[modules]" )
      </p>
      <p>
        -Date of Lecture/PA ( "[dateOfLecture]" )
      </p>
      <p>
        -Time of Lecture/PA ( "[timeOfLecture]" )
      </p>
      <p>
        -Request ( "[request]" )
      </p>
    </>
  ),
  "Campus": (
    <>
      <p>
        -Section ( "[section]" )
      </p>
      <p>
        -Complaint Comment ( "[complaintComment]" )
      </p>
    </>
  ),
  "Dean's office": (
    <>
      <p>
        -Complaint Comment ( "[complaintComment]" )
      </p>
    </>
  ),
  "German Teaching Department": (
    <>
      <p>
        -Complaint Comment ( "[complaintComment]" )
      </p>
    </>
  ),
  "Teaching Hospital": (
    <>
      <p>
        -Teaching Hospital ( "[teachingHospital]" )
      </p>
      <p>
        -Complaint Comment ( "[complaintComment]" )
      </p>
    </>
  ),
  "Teacher": (
    <>
      <p>
        -Teacher name ( "[teacherName]" )
      </p>
      <p>
        -Subject ( "[subject]" )
      </p>
      <p>
        -Complaint Comment ( "[complaintComment]" )
      </p>
    </>
  ),
  "Online Catalogue (Carnet)": (
    <>
      <p>
        -Complaint Comment ( "[complaintComment]" )
      </p>
    </>
  ),
  "Exam": (
    <>
      <p>
        -Exam Date ( "[examDate]" )
      </p>
      <p>
        -Exam Subject ( "[subject]" )
      </p>
      <p>
        -Teacher Name ( "[teacherName]" )
      </p>
      <p>
        -Module ( "[module]" )
      </p>
      <p>
        -Complaint [ "[complaintComment]" ]
      </p>
    </>
  ),
  "Internship": (
    <>
      <p>
        -Name of Teaching Hospital ( "[hospitalName]" )
      </p>
      <p>
        -Country of internship ( "[country]" )
      </p>
      <p>
        -Interval time: from ( "[timeFrom]" )
      </p>
      <p>
        -Interval time: to ( "[timeTo]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Medical Abilities": (
    <>
      <p>
        -Name of teaching hospital ( "[hospital]" )
      </p>
      <p>
        -Comments ( "[comment]" )
      </p>
    </>
  ),
  "Thesis": (
    <>
      <p>
        -Title of the Thesis ( "[titleOfThesis]" )
      </p>
      <p>
        -Subject/Department ( "[subject]" )
      </p>
      <p>
        -Coordinator of your Teaching Hospital ( "[coordinatorOfHospital]" )
      </p>
      <p>
        -Coordinator of UMFST Faculty ( "[coordinatorOfFaculty]" )
      </p>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  ),
  "Other": (
    <>
      <p>
        -Comment ( "[comment]" )
      </p>
    </>
  )
}

export {
  INQUIRYCATEGORIESEmailTemplates,
  POSITIONNAMES,
  TicketTypeList,
  EmailTemplateDescription,
  TicketTypeStructure
};
