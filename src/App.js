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
  const [a, setA] = React.useState(false)
  const [b, setB] = React.useState(false)
  const [c, setC] = React.useState(false)
  const [d, setD] = React.useState(false)
  const [e, setE] = React.useState(false)
  const [f, setF] = React.useState(false)
  const [chg, setChg] = React.useState(false)

  React.useEffect(() => {
    initializeLiff()
  }, [])

  React.useEffect(() => {
    getInfo()
  }, [uid])


  React.useEffect(() => {
    if (answeredNormalQuestion == false) {
      const interval = setInterval(() => {
        console.log(answeredNormalQuestion)
      }, 7000);
      return () => clearInterval(interval);
    }

  }, []);


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

    fetch("https://speedkub-backend-dev-n2sgktcxxa-as.a.run.app/api/info?userID=test" + uid)
      .then(r => r.json())
      .then(result => {
        console.log(result)
        setA(result['a']);
        setB(result['b']);
        setC(result['c']);
        setD(result['d']);
        setE(result['e']);
        setF(result['f']);
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



  const handleCloseLIFFAppButton = () => {
    if (!liff.isInClient()) {
      sendAlertIfNotInClient()
    } else {
      liff.closeWindow();
    }
  }

  const handleOpenExternalWindowButton = (uri) => {

    liff.openWindow({
      url: uri,
      external: true
    });
  }



  const sendAlertIfNotInClient = () => {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
  }

  return (
    <main className="App">
      <section>
        {/* <Popup trigger={plsbind} setTrigger={setPlsbind}>
          <h2>
            กรุณาผูกไลน์กับ speedkub ก่อน
          </h2>
        </Popup>
        <button onClick={() => setPlsbind(!plsbind)}></button> */}

        <div className='cards'>
          {answeredNormalQuestion ? wo.map((url, index) =>

            <Card key={index} name={nameList[index]} onClick={() => {
              liff.openWindow({ url: url, external: true })
            }
            } />

          ) : w.map((url, index) =>
            <Card key={index} name={nameList[index]} onClick={() => {
              liff.openWindow({ url: url, external: true })
            }
            } />
          )
          }
        </div>


        <button onClick={() => setAnsweredNormalQuestion(!answeredNormalQuestion)}></button>


      </section>
    </main>
  );
}

export default App;
