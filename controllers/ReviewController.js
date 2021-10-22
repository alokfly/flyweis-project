const nodemailer = require("nodemailer");

module.exports.addReviewData = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "aloksaxena755@gmail.com",
        pass: "wvkgyirquxcwgqzb",
      },
    });

    var mail = {
      from: req.body.email,
      to: "aloksaxena755@gmail.com",
      subject: `${email} sending review: ${subject}`,
      text: message,
    };

    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    let xhr = new XMLHttpRequest();
    xhr.open("post", "/addReviewData");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
      console.log(xhr.responseText);
    };

    return res.status(200).json({ msg: "Message send successfully" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
