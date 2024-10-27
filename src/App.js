import { useState } from "react";
import "./App.css";
import { QRCodeCanvas } from "qrcode.react";
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x150&data=${datas.email}&color=${datas.subject}`
      );
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setQrimage(imageUrl);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Qr Code Generator</h1>
      </header>
      <div className="App">
        <form className="email-form">
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
            Select a Color for your Qr code
            <select name="color">
              <option value="" >Black</option>
              <option value="" >yellow</option>
              <option value="" >Blue</option>
              <option value="" >Green</option>
              <option value="" >Purple</option>
              <option value="" >Red</option>
              <option value="" >olive</option>
            </select>
            {/* <input
              placeholder="Enter Email Subject"
              type="text"
              name="subject"
              value={datas.subject || ""}
              onChange={handleOnChange}
            /> */}
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
          <button type="submit" className="submit" onClick={handleSubmit}>
            <img
              src="https://qrapi.s3.us-east-2.amazonaws.com/Media/email_2_1729956460420.png"
              alt="mail"
              className="mail-img"
            />{" "}
            GENERATE QR CODE
          </button>
        </form>
        <div className="qrcode">
          {/* <QRCodeCanvas value={` ${datas}`} size={200} minVersion={3} /> */}
          {qrimage ? (
            <small>
              <img src={qrimage} alt="Guido Van Rossum" /> <br />
              <h4>Scan Me</h4>
            </small>
          ) : (
            "Display Qr code here"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
