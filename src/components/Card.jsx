import React from "react";
import "./Card.css"

function Card(props) {

  let text = ""
  if (props.status) text = "กรอกไปแล้ว"

  return (

    <div className="card">
      {/* <img src={props.img} /> */}
      <div className="card-body">
        <h2>{props.name}</h2>
        <p>ตอบแบบสอบถามเพื่อรับ 500 SKS</p>
        {props.sp ? <p className="text-[#e6564e]">พิเศษ! ร่วมเป็นพาร์ทเนอร์กับเรา รับเพิ่ม 1,500 SKS</p>
          : ""}
        <h5>{text}</h5>
      </div>
    </div>

  )
}

export default Card;
