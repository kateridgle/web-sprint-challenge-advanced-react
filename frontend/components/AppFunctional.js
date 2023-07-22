import React from 'react'
import { useState } from 'react'
import axios from 'axios';

// Suggested initial states
// const initialState = {
//   initialMessage: '',
//   initialEmail: '',
//   initialSteps: 0,
//   initialIndex: 4
// } // the index the "B" is at

export default function AppFunctional(props) {
  const initialState = {
    initialMessage: '',
    initialEmail: '',
    initialSteps: 0,
    initialIndex: 4
  }

  const [state, setState] = useState({
    x: 2,
    y: 2,
    steps: 0,
    email: "",
    message: "",
  });
  // const [email, setEmail] = useState(initialEmail)
  // const [message, setMessage] = useState(initialMessage)
  // const [index, setIndex] = useState(initialIndex)
  // const [steps, setSteps] = useState(initialSteps)
  // unsure if need actual coordinates if index is used
  // const [x, setX] = useState() 
  const { message, email, steps, index, x, y } = state; // removing this breaks the code 

  const getXY = (index) => {
    const x = (index % 3) + 1;

    let y;
    if (index < 3) {
      y = 1;
    } else if (index < 6) {
      y = 2;
    } else if (index < 9) {
      y = 3;
    }

    return [x, y];
  };

  const getXYMessage = (index) => {
    const [x, y] = getXY(index);
    return `Coordinates (${x},${y})`;
  };

  function reset() {

    setState({
      message: "",
      index: 4,
      email: "",
      steps: 0
    })
  }

  function getNextIndex(direction) {
  }

  function move(evt) {

    if (evt.target.id === "up") {
      // console.log(evt)
      if (state.index > 2) {
        setState((prevState) => ({
          ...prevState,
          index: prevState.index - 3,
          message: "",
          steps: prevState.steps + 1,
          y: prevState.y - 1
        }));
      } else {
        setState((prevState) => ({ ...prevState, message: "You can't go up" }));
      }
    }
    if (evt.target.id === "down") {
      if (state.index < 6) {
        setState((prevState) => ({
          ...prevState,
          index: prevState.index + 3,
          message: "",
          steps: prevState.steps + 1,
          y: prevState.y + 1
        }));
      } else {
        setState((prevState) => ({ ...prevState, message: "You can't go down" }));
      }
    }
    if (evt.target.id === "right") {
      if (
        state.index === 1 ||
        state.index === 4 ||
        state.index === 7 ||
        state.index === 0 ||
        state.index === 3 ||
        state.index === 6
      ) {
        setState((prevState) => ({
          ...prevState,
          index: prevState.index + 1,
          message: "",
          steps: prevState.steps + 1,
          x: prevState.x + 1
        }));
      } else {
        setState((prevState) => ({ ...prevState, message: "You can't go right" }));
      }
    }
    if (evt.target.id === "left") {
      if (
        state.index === 1 ||
        state.index === 4 ||
        state.index === 7 ||
        state.index === 2 ||
        state.index === 5 ||
        state.index === 8
      ) {
        setState((prevState) => ({
          ...prevState,
          index: prevState.index - 1,
          message: "",
          steps: prevState.steps + 1,
          x: prevState.x - 1
        }));
      } else {
        setState((prevState) => ({ ...prevState, message: "You can't go left" }));
      }
    }
  }

  const onChange = (evt) => {
    setState({
      ...state,
      email: evt.target.value,
    });
  };

  const onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    console.log(state.x, state.y, state.steps, state.email);
    const payload = { x: state.x, y: state.y, steps: state.steps, email: state.email };
    axios.post('http://localhost:9000/api/result', payload)
      .then(res => {
        console.log(res.data);
        setState({ ...state, message: res.data.message, email: "" });
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {state.steps} time{state.steps !== 1 ? 's' : ''}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div value={steps} key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 value={message} id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button value={index} onClick={move} id="left">LEFT</button>
        <button value={index} onClick={move} id="up">UP</button>
        <button value={index} onClick={move} id="right">RIGHT</button>
        <button value={index} onClick={move} id="down">DOWN</button>
        <button value={index} onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input value={state.email} onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
