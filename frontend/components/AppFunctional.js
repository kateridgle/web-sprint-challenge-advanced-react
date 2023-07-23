import React from 'react'
import { useState } from 'react'
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {


  // const [state, setState] = useState({
  //   index: 4,
  //   steps: 0,
  //   email: "",
  //   message: "",
  // });
  const [email, setEmail] = useState(initialEmail)
  const [message, setMessage] = useState(initialMessage)
  const [index, setIndex] = useState(initialIndex)
  const [steps, setSteps] = useState(initialSteps)
  // unsure if need actual coordinates if index is used
  // const [x, setX] = useState() 
  // removing this breaks the code 

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

  const getXYMessage = () => {

    return `Coordinates ${getXY(index)}`;
  };

  function reset() {
    setIndex(initialIndex)
    setMessage(initialMessage)
    setSteps(initialSteps)
    setEmail(initialEmail)
  }

  function getNextIndex(direction) {
    if (evt.target.id === "up") {
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

  function move(evt) {
     // console.log(evt)
    const direction = evt.target.id
    const nextIndex = getNextIndex(direction)
  }

  function onChange(evt) {
    const { value } = evt.target
    setEmail(value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    console.log(state.x, state.y, state.steps, state.email);
    const [x, y] = getXY()
    let message
    axios.post('http://localhost:9000/api/result', { email, steps, x, y })
      .then(res => {
        message = res.data.message
      })
      .catch(err => {
        message = err.response.data.message
      })
      .finally(() => {
        setMessage(message)
        setEmail(initialEmail)
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage(index)}</h3>
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
        <h3 value={message} id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button value={index} onClick={move} id="left">LEFT</button>
        <button value={index} onClick={move} id="up">UP</button>
        <button value={index} onClick={move} id="right">RIGHT</button>
        <button value={index} onClick={move} id="down">DOWN</button>
        <button value={index} onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
