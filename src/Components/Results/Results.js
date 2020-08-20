import React from "react";

export default function Results(props) {
  return (
    <div>
      <h2>Recent Results</h2>
      <div>
        {props.messages.slice(0, 10).map((message) => (
          <p key={message.msg}>{message.msg}</p>
        ))}
      </div>
    </div>
  );
}
