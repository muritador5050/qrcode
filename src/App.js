import { useState } from "react";
import "./App.css";
import { QRCodeCanvas } from "qrcode.react";
const intialValue = {
  email: "",
  subject: "",
  message: "",
};
function App() {
  const [datas, setDatas] = useState(intialValue);
  function handleOnChange(e) {
    setDatas({ ...datas, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(datas);
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
            GENERATE QR CODE
          </button>
        </form>
        <div className="qrcode">
          <h4>Scan Me</h4>
          <QRCodeCanvas
            value={"https://github.com/muritador5050/crud_operation"}
            size={200}
            minVersion={3}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
