import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Button from "./Components/Button/Button";
import Input from "./Components/Input/Input";
import ClearButton from "./Components/ClearButton/ClearButton";
import Results from "./Components/Results/Results";
import Header from "./Components/Header/Header";
import * as math from "mathjs";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

export default class App extends Component {
  state = {
    input: "",
    messages: [],
  };

  componentDidMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.type === "message") {
        this.setState((state) => ({
          messages: [
            {
              msg: dataFromServer.msg,
            },
            ...state.messages,
          ],
        }));
        // this.setState({
        //   messages: this.state.messages.unshift(dataFromServer.msg),
        // });
      }
    };
  }

  sendCalc = (value) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg: value,
      })
    );
    this.setState({ input: "" });
  };

  concatInput = (val) => {
    this.setState({
      input: this.state.input + val,
    });
  };

  handleEqual = () => {
    const results = math.evaluate(this.state.input);
    this.sendCalc(`${this.state.input} = ${results}`);
  };

  render() {
    return (
      <>
        <Header />
        <div className="grid-container">
          <div className="calc-wrapper grid-item">
            <Input input={this.state.input} />
            <div className="row">
              <Button handleClick={this.concatInput}>7</Button>
              <Button handleClick={this.concatInput}>8</Button>
              <Button handleClick={this.concatInput}>9</Button>
              <Button handleClick={this.concatInput}>/</Button>
            </div>
            <div className="row">
              <Button handleClick={this.concatInput}>4</Button>
              <Button handleClick={this.concatInput}>5</Button>
              <Button handleClick={this.concatInput}>6</Button>
              <Button handleClick={this.concatInput}>*</Button>
            </div>
            <div className="row">
              <Button handleClick={this.concatInput}>1</Button>
              <Button handleClick={this.concatInput}>2</Button>
              <Button handleClick={this.concatInput}>3</Button>
              <Button handleClick={this.concatInput}>+</Button>
            </div>
            <div className="row">
              <Button handleClick={this.concatInput}>.</Button>
              <Button handleClick={this.concatInput}>0</Button>
              <Button handleClick={() => this.handleEqual()}>=</Button>
              <Button handleClick={this.concatInput}>-</Button>
            </div>
            <div className="row">
              <ClearButton handleClear={() => this.setState({ input: "" })}>
                Clear
              </ClearButton>
            </div>
          </div>
          <div className="results-wrapper grid-item">
            <Results messages={this.state.messages} />
          </div>
        </div>
      </>
    );
  }
}
