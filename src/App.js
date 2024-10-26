import { useState } from "react";
import "./App.css";
// import { QRCodeCanvas } from "qrcode.react";
const intialValue = {
  email: "",
  subject: "",
  message: "",
};

// const api = "idfddonmhydqvdvsljbnegfzmbnwkhjjzwraqaaq"
function App() {
  const [qrimage, setQrimage] = useState();
  const [datas, setDatas] = useState(intialValue);

  function handleOnChange(e) {
    setDatas({ ...datas, [e.target.name]: e.target.value });
  }

  const options = {
    url: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${datas.email}&color=ff0000&ecc=H`,
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${datas.email}&color=ff0000`
    );
    const result = await response.blob();
    setQrimage(result);
  }

  return (
    <div className="container">
      <header>
        <h1>Qr Code Generator</h1>
      </header>
      <div className="App">
        <form className="email-form" onSubmit={handleSubmit}>
          <h3>Email Qr Code</h3>
          <label>
            <h3>Email:</h3>
            <input
              placeholder="Your Email"
              type="email"
              name="email"
              value={datas.email || ""}
              onChange={handleOnChange}
            />
          </label>{" "}
          <br /> <br />
          <label>
            <h3>Subject:</h3>
            <input
              placeholder="Enter Email Subject"
              type="text"
              name="subject"
              value={datas.subject || ""}
              onChange={handleOnChange}
            />
          </label>{" "}
          <br />
          <br />
          <label>
            <h3>Message:</h3>
            <textarea
              placeholder="Enter Your Message"
              name="message"
              value={datas.message || ""}
              onChange={handleOnChange}
            />
          </label>
          <br />
          <br />
          <button type="submit" className="submit">
            <img
              src="https://qrapi.s3.us-east-2.amazonaws.com/Media/email_2_1729956460420.png"
              alt="mail"
              className="mail-img"
            />{" "}
            GENERATE QR CODE
          </button>
        </form>
        <div className="qrcode">
          <h4>Scan Me</h4>
          {/* <QRCodeCanvas value={` ${datas}`} size={200} minVersion={3} /> */}
          {qrimage && <img src={options.url} alt="qrcode" />}
          {/* <img
            src=" https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=muritador5050@gmail.com"
            alt="qr"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
