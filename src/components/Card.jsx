import React from "react";
import "./Card.css"

function Card(props) {

  let text = ""
  if (props.status) text = "กรอกไปแล้ว"

  return (

    <div className="card">
      {/* <img src={props.img} /> */}
      <div className="card-body">
        <h2 className="text-4xl">{props.name}</h2>
        <p className="text-[#777]">ตอบแบบสอบถามเพื่อรับ 500 SKS</p>
        {props.sp ?<React.Fragment>
          <p className="text-[#777]"><mark>พิเศษ!</mark>  ร่วมเป็นพาร์ทเนอร์กับเรา รับเพิ่ม 1,500 SKS</p>
        </React.Fragment> 
          : ""}
        <h5>{text}</h5>
        <div className="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
                        <p className="text-[#BB000E] text-xs font-medium">คลิกเลย</p>
                    </div>
      </div>
    </div>

  )
}

function SpeedkubPartner(props) {

  return (

    <div className="card">
      <div className="card-body">
        <h2>ร่วมเป็นPartnerกับSpeedkub</h2>
        <div className="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
                        <p className="text-[#BB000E] text-xs font-medium">คลิกเลย</p>
                    </div>
      </div>
    </div>

  )
}

export {Card, SpeedkubPartner};
