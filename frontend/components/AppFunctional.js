import React from 'react'
import { useState } from 'react'

// Suggested initial states
const initialState = {
initialMessage: '',
initialEmail: '',
initialSteps: 0,
initialIndex: 4
} // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState("")
  const [inputText, setInputText] = useState("")

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = (this.state.index % 3) + 1

    let y
    if (this.state.index < 3) {
      y = 1
    }
    else if (this.state.index < 6) {
      y = 2
    }
    else if (this.state.index < 9) {
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
    setState("")
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
      // console.log(evt);

      if (this.state.index > 2) {
        this.setState({
          ...this.state,
          index: this.state.index - 3,
          message: "",
          steps: this.state.steps + 1,
          y: this.state.y - 1
        })
      } else {
        this.setState({ ...this.state, message: "You can't go up" })
      }

    }
    if (evt.target.id === "down") {
      // console.log(evt);

      if (this.state.index < 6) {
        this.setState({
          ...this.state,
          index: this.state.index + 3,
          message: "",
          steps: this.state.steps + 1,
          y: this.state.y + 1
        })
      } else {
        this.setState({ ...this.state, message: "You can't go down" })
      }

    }
    if (evt.target.id === "right") {
      // console.log(evt)
      if (this.state.index === 1 || this.state.index === 4 || this.state.index === 7 || this.state.index === 0 || this.state.index === 3 ||
        this.state.index === 6) {
        this.setState({
          ...this.state,
          index: this.state.index + 1,
          message: "",
          steps: this.state.steps + 1,
          x: this.state.x + 1
        })

      } else {
        this.setState({ ...this.state, message: "You can't go right" })
      }

    }

    if (evt.target.id === "left") {
      // console.log(evt)
      if (this.state.index === 1 || this.state.index === 4 || this.state.index === 7 || this.state.index === 2 || this.state.index === 5 ||
        this.state.index === 8) {
        setState({
          ...state,
          index: state.index - 1,
          message: "",
          steps: state.steps + 1,
          x: this.state.x - 1
        })
      } else {
        setState({ ...this.state, message: "You can't go left" })
      }

    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    // console.log(inputText);
    setInputText(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
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
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{props.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={move} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
