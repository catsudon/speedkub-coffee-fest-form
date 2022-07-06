import React from "react";
import "./Popup.css"

function Popup(props) {

    if (props.trigger)
        return (

            <div className="popup">
                <div className="popup-inner border-2 border-[#e6564e]">
                    <div className="popup-inner flex flex-col items-center">
                        <label className="font-light text-2xl mb-4 text-[#e6564e] font-medium font-bold ">เราได้บันทึกข้อมูลของคุณไว้แล้ว</label>


                        
                        <button type="submit" className="my-6 rounded-full w-64 h-12 rounded-lg bg-[#e6564e] text-gray-100 uppercase font-semibold hover:bg-[#cf3521] text-gray-100 transition mb-2" onClick={() => liff.openWindow({
                            url: "https://i.ibb.co/VNB6bqd/Picture4.jpg",
                            external: true
                        })}>เรียนรู้เพิ่มเติม</button>
                        <button type="submit" className="my-6 rounded-full w-64 h-12 rounded-lg bg-[#e6564e] text-gray-100 uppercase font-semibold hover:bg-[#cf3521] text-gray-100 transition mb-2" onClick={() => props.setTrigger(false)}>ปิดหน้าต่าง</button>
                    </div>
                </div>
            </div>

        )
    else return "";
}

export default Popup;
