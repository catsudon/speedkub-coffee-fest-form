import React from "react";
import "./Popup.css"

function Login(props) {


    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errMsg, setErrMsg] = React.useState('')


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const sign_in = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(`https://speedkub-line-bot-3kuvjve3ma-et.a.run.app/api/login?username=${username}&password=${password}&userID=${props.uid}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const status = data.status
                if (status == "1") {
                    console.log("success!")
                    props.setTrigger(false)
                    return "success"
                }
                else return data.message;
            });
    }

    const handleConfirm = (event) => {
        event.preventDefault();
        sign_in()
            .then((res) => setErrMsg(res))

        return 200;
    }

    if (props.trigger)
        return (

            <div className="popup">
                <div className="popup-inner border-2 border-[#e6564e]">
                    <div className="popup-inner flex flex-col items-center">
                        <label className="font-light text-2xl mb-4 text-[#e6564e] font-medium font-bold ">กรุณาผูกไลน์กับ Speedkub</label>
                        
                        <form onSubmit={handleConfirm} >
                            <div className="form-control">
                                <label className="label"><span className="text-cyan-50 label-text text-left text-sm px-1">เบอร์โทร</span></label>

                                <input onChange={handleUsernameChange} name="user" autoComplete="phone" type="text" placeholder="เบอร์โทร" data-lpignore="true" value={username}
                                    className="w-64 h-12 input input-bordered border-2 border-[#de4037] text-[#141519] bg-[#F2F2F2] btn-outline hover:bg-white hover:text-black py-3 px-4 mb-3" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="text-cyan-50 label-text text-left text-sm px-1">รหัสผ่าน</span></label>

                                <input onChange={handlePasswordChange} name="pass" type="password" placeholder="รหัสผ่าน" autoComplete="current-password" value={password}
                                    className="w-64 h-12 input input-bordered border-2 border-[#de4037] text-[##de4037] bg-[#F2F2F2] btn-outline hover:bg-white hover:text-black py-3 px-4 mb-3" />
                            </div>
                            <p className="text-right mb-4 text-gray-400 text-sm ">{errMsg}   </p>
                            <button type="submit" className="my-6 rounded-full w-64 h-12 rounded-lg bg-[#e6564e] text-gray-100 uppercase font-semibold hover:bg-[#cf3521] text-gray-100 transition mb-2" >เข้าสู่ระบบ</button>
                        </form>
                    </div>
                </div>
            </div>



        )
    else return "";
}

export default Login;
