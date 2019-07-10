import React, { Component } from "react";
import "./card-style.css";

const Card = props => {
  return (
    <div id="card-id" className="card text-center">
      <div className="overflow">{props.imgsrc}</div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <p className="card-title">
                  <b>{props.title}</b>
                </p>
              </td>

              <td>
                <div className="card-video-link">
                  <a href={props.link} className={props.className}>
                    {props.resource}
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Card;
