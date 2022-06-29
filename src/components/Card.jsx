import React from "react";
import "./Card.css"

function Card(props) {

    return   (
        
        <div className="card">
          {/* <img src={props.img} /> */}
          <div className="card-body">
            <h2>{props.name}</h2>
            <p>Lorem ipsum dolaliqua. Ut enim ad minim veniam.</p>
            <h5>{props.author}</h5>
          </div>
        </div>

    )
}

export default Card;
