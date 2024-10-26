import { useState } from "react";
import "./App.css";
import { QRCodeCanvas } from "qrcode.react";
const intialValue = {
  email: "",
  subject: "",
  message: "",
};


// const curl = curl -X 'GET' \
// 'https://qrapi.io/v2/qrcode/email?address=muritador5050%40gmail.com&size=m&quite_zone=8&error_correction=M&data_pattern=RECT&eye_pattern=RECT_RECT&data_gradient_style=None&data_gradient_start_color=%23000000&data_gradient_end_color=%23000000&eye_color_inner=%23000000&eye_color_outer=%23000000&background_color=%23FFFFFF&logo.size=15&logo.excavated=true&logo.angle=0&logo.cache=true&poster.left=50&poster.top=50&poster.size=40&poster.eyeshape=ROUND_RECT&poster.dataPattern=ROUND&format=png' \
// -H 'accept: image/png'
// const api = "idfddonmhydqvdvsljbnegfzmbnwkhjjzwraqaaq"
function App() {
  const [mail, setMail] = useState();
  const [datas, setDatas] = useState(intialValue);
  function handleOnChange(e) {
    setDatas({ ...datas, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(datas);
  }

  async function fetching() {
    const res = await fetch(
      "https://qrapi.io/v2/qrcode"
    );
    const dat = await res.blob();
    console.log(dat);
  }
 fetching()

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
           <img src="https://qrapi.s3.us-east-2.amazonaws.com/Media/email_2_1729956460420.png" alt="mail" className="mail-img"/>  GENERATE QR CODE
          </button>
        </form>
        <div className="qrcode">
          <h4>Scan Me</h4>
          <QRCodeCanvas value={` ${datas}`} size={200} minVersion={3} />
        </div>
      </div>
    </div>
  );
}

export default App;
