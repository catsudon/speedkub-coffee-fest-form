import React from "react";
import "./Popup.css"

function Popup(props) {

    if(props.trigger)  
    return   (
        
        <div className="popup">
            <div className="popup-inner">
                <button className="close-button" onClick={() => props.setTrigger(false)}>ปิดหน้าต่าง</button>
                { props.children }
            </div>
        </div>

    ) 
    else return "";
}

export default Popup;
