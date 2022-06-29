import React from 'react';
import './App.css';
import Popup from './components/Popup';
import Card from './components/Card';

const liff = window.liff
const w = ["https://forms.gle/5PS29fFXjFdUqW3R9", "https://forms.gle/zXGmdio6htDhWqSL8", "https://forms.gle/9fjwcZANPvVhBo6A8", "https://forms.gle/sPP5EzVUd9eB3nnZ6", "https://forms.gle/FJj21nuEtf39rzrd7", "https://forms.gle/3eEmnUrjXQmU7ntp9"]
const wo = ["https://forms.gle/QBTES8d1tGt377Gw7", "https://forms.gle/MHV5KE9oKhe258Ek9", "https://forms.gle/eeVyNx9M3vmCC7Jc7", "https://forms.gle/VcmRJtxBjrLuMQAs9", "https://forms.gle/rUV8VXQX68eadQY98", "https://forms.gle/7G1GcuiPehpA16VL6"]
const nameList = ["Shipsmile", "Drop-off", "Laundry Bar", "TSR", "CitySoft", "iPower"]

const App = () => {

  const [uid, setUid] = React.useState('0')
  const [plsbind, setPlsbind] = React.useState(false)
  const [answeredNormalQuestion, setAnsweredNormalQuestion] = React.useState(false)


  React.useEffect(() => {
    initializeLiff()
  }, [])

  React.useEffect(() => {
    getInfo()
    const interval = setInterval(() => {
      if (answeredNormalQuestion == false) getInfo()
    }, 5000);
    return () => clearInterval(interval);
  }, [uid])


  const initializeLiff = () => {
    liff
      .init({
        liffId: process.env.REACT_APP_LIFF_ID
      })
      .then(initializeApp)
      .catch((err) => {
        alert(err)
      })

  }

  const getInfo = () => {

    fetch("https://speedkub-backend-dev-n2sgktcxxa-as.a.run.app/api/info?userID=" + uid)
      .then(r => r.json())
      .then(result => {
        console.log(result)
        setAnsweredNormalQuestion(result['answeredNormalQuestion']);
      })
  }

  const initializeApp = () => {
    displayLiffData();
  }

  const displayLiffData = () => {
    liff.getProfile().then(profile => {
      setUid(profile.userId)
    })
  }

  return (
    <main className="App">
      <section>

        <div className='cards'>
          {answeredNormalQuestion ? wo.map((url, index) =>
            <div onClick={() => liff.openWindow({
              url: url,
              external: true
            })} >

              <Card key={index} name={nameList[index]}/>
            </div>
          ) : w.map((url, index) =>
            <div onClick={() => liff.openWindow({
              url: url,
              external: true
            })} >

              <Card key={index + "w"} name={nameList[index]}/>

            </div>
          )
          }
          {uid}
          {"\n"}
          {answeredNormalQuestion ? "answered" : "nope"}
        </div>


        <button onClick={() => setAnsweredNormalQuestion(!answeredNormalQuestion)}></button>


      </section>
    </main >
  );
}

export default App;
