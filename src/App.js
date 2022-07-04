import React from 'react';
import './App.css';
import Login from './components/Login';
import Card from './components/Card';

const liff = window.liff
const w = ["https://forms.gle/5PS29fFXjFdUqW3R9", "https://forms.gle/zXGmdio6htDhWqSL8", "https://forms.gle/9fjwcZANPvVhBo6A8", "https://forms.gle/sPP5EzVUd9eB3nnZ6", "https://forms.gle/FJj21nuEtf39rzrd7", "https://forms.gle/3eEmnUrjXQmU7ntp9"]
const wo = ["https://forms.gle/QBTES8d1tGt377Gw7", "https://forms.gle/MHV5KE9oKhe258Ek9", "https://forms.gle/eeVyNx9M3vmCC7Jc7", "https://forms.gle/VcmRJtxBjrLuMQAs9", "https://forms.gle/rUV8VXQX68eadQY98", "https://forms.gle/7G1GcuiPehpA16VL6"]
const nameList = ["Shipsmile", "Drop-off", "Laundry Bar", "TSR", "CitySoft", "iPower"]

const App = () => {

  const [l, sl] = React.useState(true)
  const [uid, setUid] = React.useState('0')
  const [plsbind, setPlsbind] = React.useState(false)
  const [answeredNormalQuestion, setAnsweredNormalQuestion] = React.useState(false)
  const [kurikuShita, settoKurikuShita] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const lastClick = React.useRef(0)
  const passedonce = React.useRef(false)
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  React.useLayoutEffect(() => {
    initializeLiff()
  }, [])

  React.useLayoutEffect(() => {
    setTimeout(() => {setCounter(counter + 1)}, 1000);
  }, [counter]);

  React.useLayoutEffect(() => {
    setTimeout(() => {
      if ((answeredNormalQuestion ||  passedonce.current) == false) getInfo()
      sl(!l)
      console.log(plsbind)
    }, 5000);
  }, [l])

  React.useLayoutEffect(() => {
    getInfo()
    sl(!l)
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

    fetch("https://speedkub-line-bot-3kuvjve3ma-et.a.run.app/api/info?userID=" + uid)
      .then(r => r.json())
      .then(result => {
        console.log(result)
        if(result['status'] == "-1") setPlsbind(true);
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

        <Login trigger={plsbind} setTrigger={setPlsbind} uid={uid} kb={isKeyboardVisible}/>

        <div className='cards'>
          {answeredNormalQuestion || ((kurikuShita && counter - lastClick.current >= 60) || passedonce.current) ? passedonce.current = true && wo.map((url, index) =>
            <div onClick={() => {
              liff.openWindow({
                url: url,
                external: true
              })
              settoKurikuShita(true)
            }
            
            } >
              {index < 3 ? <Card key={index} name={nameList[index]} sp={true}/> 
              : <Card key={index} name={nameList[index]} sp={false}/>} 

            </div>
          ) : w.map((url, index) =>
            <div onClick={() => {
              liff.openWindow({
                url: url,
                external: true
              })
              settoKurikuShita(true)
              lastClick.current = counter
            }
            } >
              {index < 3 ? <Card key={index + "w"} name={nameList[index]} sp={true}/> 
              : <Card key={index + "w"} name={nameList[index]} sp={false}/>}
              

            </div>
          )
          }
        </div>
          {/* {lastClick.current}
          ":"
          {counter} */}
          

      </section>
    </main >
  );
}

export default App;
