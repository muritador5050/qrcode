import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [qrimage, setQrimage] = useState(null);
  const [datas, setDatas] = useState({ data: '', color: '' });
  const inputRef = useRef(null);

  function handleOnChange(e) {
    setDatas({ ...datas, [e.target.name]: e.target.value });
    setQrimage(null);
  }

  const handleOnfocus = () => {
    inputRef.current.value = '';
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (datas.data === '') {
      alert('please input a URL');
    }
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${datas.data}&color=${datas.color}&qzone=4&ecc=Q`
      );
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setQrimage(imageUrl);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='container'>
      <header>
        <h1 className='heading-text'>
          <strong>Qr</strong> Code Generator
        </h1>
      </header>
      <div className='flex-container'>
        <div className='qrcode'>
          {qrimage ? (
            <div className='scanner'>
              <img src={qrimage} alt='qr code' />
            </div>
          ) : (
            <div className='rotate'>
              <h3 className='no-qr-yet'>No qrcode yet!</h3>
            </div>
          )}
        </div>
        <div className='url-input'>
          <h3 className='generate'>
            GENERATE HERE <small className='entity-arrow-down'>&darr;</small>{' '}
          </h3>
          <div className='input-group'>
            <input
              type='text'
              name='data'
              value={datas.data || ''}
              onChange={handleOnChange}
              ref={inputRef}
              onFocus={handleOnfocus}
            />
            <label>Data</label>
          </div>
          <div className='select-group'>
            <select
              name='color'
              value={datas.color || ''}
              onChange={handleOnChange}
            >
              <option value='000000'>Black</option>
              <option value='FFFF00'>yellow</option>
              <option value='0000FF'>Blue</option>
              <option value='008000'>Green</option>
              <option value='800080'>Purple</option>
              <option value='FF0000'>Red</option>
              <option value='00FFFF'>Aqua</option>
            </select>
          </div>

          <button onClick={handleSubmit} className='submit'>
            GENERATE QR-CODE
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
