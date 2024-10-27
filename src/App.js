import { useRef, useState } from "react";
import "./App.css";
import { QRCodeCanvas } from "qrcode.react";
// import { QRCodeCanvas } from "qrcode.react";
const intialValue = {
  email: "",
  color: "",
  message: "",
};

// const api = "idfddonmhydqvdvsljbnegfzmbnwkhjjzwraqaaq"
function App() {
  const [qrimage, setQrimage] = useState();
  const [datas, setDatas] = useState(intialValue);
  const inputRef = useRef(null);

  function handleOnChange(e) {
    setDatas({ ...datas, [e.target.name]: e.target.value });
  }

  const handleOnfocus = () => {
    inputRef.current.value = "";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x150&data=${datas.email}&color=${datas.color}&qzone=5&ecc=Q`
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
              ref={inputRef}
              onFocus={handleOnfocus}
            />
          </label>{" "}
          <br /> <br />
          <label>
            <h3>Select a Color for your Qr code</h3>
            <select
              name="color"
              value={datas.color || ""}
              onChange={handleOnChange}
            >
              <option value="000000">Black</option>
              <option value="FFFF00">yellow</option>
              <option value="0000FF">Blue</option>
              <option value="008000">Green</option>
              <option value="800080">Purple</option>
              <option value="FF0000">Red</option>
              <option value="00FFFF">Aqua</option>
            </select>
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
