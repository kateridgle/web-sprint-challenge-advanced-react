import React from 'react'
import { useState } from 'react'
import axios from 'axios';

// Suggested initial states
const initialState = {
  initialMessage: '',
  initialEmail: '',
  initialSteps: 0,
  initialIndex: 4
} // the index the "B" is at

export default function AppFunctional(props) {

  const [state, setState] = useState(initialState);
  const [email, setEmail] = useState(initialEmail)
  const [message, setMessage] = useState(initialMessage)
  const [index, setIndex] = useState(initialIndex)
  const [steps, setSteps] = useState(initialSteps)
  // const [x, setX] = useState() unsure if need actual coordinates if index is used
  // const { message, email, steps, index, x, y } = state; // commented out because seems to conflict 

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = (state.index % 3) + 1

    let y
    if (state.index < 3) {
      y = 1
    }
    else if (state.index < 6) {
      y = 2
    }
    else if (state.index < 9) {
      y = 3
    }

    return [x, y];
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return (getXY())
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setState({
      message: "",
      index: 4,
      email: "",
      steps: 0
    })
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    if (evt.target.id === "up") {
      // console.log(evt); it does register click

      if (state.index > 2) {
        setState({
          ...state,
          index: state.index - 3,
          message: "",
          steps: state.steps + 1,
          y: state.y - 1
        })
      } else {
        setState({ ...state, message: "You can't go up" })
      }

    }
    if (evt.target.id === "down") {
      // console.log(evt);

      if (state.index < 6) {
        setState({
          ...state,
          index: state.index + 3,
          message: "",
          steps: state.steps + 1,
          y: state.y + 1
        })
      } else {
        setState({ ...state, message: "You can't go down" })
      }

    }
    if (evt.target.id === "right") {
      // console.log(evt)
      if (state.index === 1 || state.index === 4 || state.index === 7 || state.index === 0 || state.index === 3 ||
        state.index === 6) {
        setState({
          ...state,
          index: state.index + 1,
          message: "",
          steps: state.steps + 1,
          x: state.x + 1
        })

      } else {
        setState({ ...state, message: "You can't go right" })
      }

    }

    if (evt.target.id === "left") {
      // console.log(evt)
      if (state.index === 1 || state.index === 4 || state.index === 7 || state.index === 2 || state.index === 5 ||
        state.index === 8) {
        setState({
          ...state,
          index: state.index - 1,
          message: "",
          steps: state.steps + 1,
          x: state.x - 1
        })
      } else {
        setState({ ...state, message: "You can't go left" })
      }

    }
  }

  function onChange(evt) {
    // console.log(inputText);
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const { x, y, email, message, steps } = payload
    axios.post("http://localhost:9000/api/result", payload)
      .then((res) => setState({ ...state, message: res.data.message, email: "" }))
      .catch((err) => console.error(err))
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
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
        <h3 value={message} id="message">{props.message}</h3>
      </div>
      <div id="keypad">
        <button value={index} onClick={move} id="left">LEFT</button>
        <button value={index} onClick={move} id="up">UP</button>
        <button value={index} onClick={move} id="right">RIGHT</button>
        <button value={index} onClick={move} id="down">DOWN</button>
        <button value={index} onClick={move} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
