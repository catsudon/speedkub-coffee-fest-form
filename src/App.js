import React from 'react';
import './App.css';
import Login from './components/Login';
import Popup from './components/Popup';
import { Card, SpeedkubPartner } from './components/Card';

const liff = window.liff
const formUri = ["https://forms.gle/ixinmxm1EdvHmEmj8", "https://forms.gle/irLFamfDrPnBv4tK7", "https://forms.gle/7vLwXLasJwEUGXxG6", "https://forms.gle/cwcHaimtzTu2vwNUA", "https://forms.gle/13aNUggny7TUNC6ZA", "https://forms.gle/1in4eSnv4558AJCR9", "https://forms.gle/ZJifCsiuwfVGcM48A"]
const nameList = ["CitiSoft", "Marketing", "SCAP", "Speedkub", "Sabuy Speed", "TSR", "Vending PLus"]

const App = () => {

  const [uid, setUid] = React.useState('0')


  React.useLayoutEffect(() => {
    initializeLiff()
  }, [])

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
          {
            formUri.map((url, index) =>
              <div onClick={() => {
                liff.openWindow({
                  url: url,
                  external: true
                })}} >
                <Card key={index + "w"} name={nameList[index]} sp={false} />
              </div>
            )}


        </div>


      </section>
    </main >
  );

}

export default App;