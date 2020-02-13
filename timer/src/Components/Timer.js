import React, { Component } from "react";

export default class App extends Component {
  state = {
    timems: 0,
    interval: null
  };
  timeenms = ms => {
    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;

    const hours = Math.floor(ms / msPerHour);
    const hoursRest = ms % msPerHour;
    const minutes = Math.floor(hoursRest / msPerMinute);
    const minutesRest = hoursRest % msPerMinute;
    const seconds = Math.floor(minutesRest / msPerSecond);

    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0")
    );
  };
  start = () => {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: 0 });
    } else {
      const interval = setInterval(() => {
        this.setState({ timems: this.state.timems + 1000 });
      }, 1000);
      this.setState({ interval });
    }
  };

  reset = () => {
    clearInterval(this.state.interval);
    this.setState({
      timems: 0,
      interval: null
    });
  };
  render() {
    return (
      <div className="time-container">
        <div className="time-inner-container">
          <div className="time-digits">{this.timeenms(this.state.timems)}</div>
          <div className="time-text">
            <div className="time-text-item">Hour</div>
            <div className="time-text-item">Minute</div>
            <div className="time-text-item">Second</div>
          </div>
        </div>
        <br />
        <br />
        <input
          className="btn"
          type="button"
          value={this.state.interval ? "Pause" : "Start"}
          onClick={this.start}
        />

        <input
          className="btn"
          type="button"
          value="Reset"
          onClick={this.reset}
        />
      </div>
      
    );
  }
}
