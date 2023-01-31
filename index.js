require("dotenv").config();

const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");

(async function () {
  console.log("insertando algo en la DB");
  try {
    const mdbClient = new MongoClient(process.env.MONGODB_URI, {
      connectTimeoutMS: 1000,
      socketTimeoutMS: 500,
    });
    const db = mdbClient.db(process.env.MONGODB_DBNAME);
    await db.collection("users").insertOne({
      email: "test@example.com",
    });
    await mdbClient.close();
  } catch (err) {
    console.log(err.message);
    console.log('did you run "npm run dc:up"?');
    process.exit(1);
  }

  console.log(
    `
  INSERTADO!
  ahora podes abrir el shell ejecutando esto:
  $ mongo ${process.env.MONGODB_URI}
  y luego ejecutar
  > use ${process.env.MONGODB_DBNAME}
  > db.users.find();
`
  );

  console.log("sending an email");
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "tito@gmail.com",
    to: "fabri@example.com.ar",
    subject: "El asunto es este!",
    text: "Y este es el mail", //The texte content of the mail
    html: "<h1>HTML</h1><p>Here is the text in a paragraph for the test email</p>", // The html content
  };

  await transporter.sendMail(mailOptions);
  console.log(
    `
  Enviado!
  ahora podes ver los emails enviados en
  http://localhost:1080
`
  );
})();
