import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}



export default class AppClass extends React.Component {
  constructor(props) {
    super()
    this.state = {
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
      x: 2,
      y: 2
    }


  }

  getXY = () => {
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

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    // ?determine where the avaible spaces to move are and if the limit is reached in the grid to stop the event?

    const [x, y] = this.getXY();

    return `Coordinates (${x},${y})`;



  }

  reset = (evt) => {
    if (evt.target.id === "reset") {
      this.setState(initialState)
    }

  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // ? set state of cursor?

    // if the remainder of the index modulo 3 is equal to 0 return the index, otherwise index minus 1 (left)or +1 (right)

    // if the index is less than 3 return the index, otherwise index minus 3(up)

    // if the index is greater than 5 return the index, otherwise index +3 (down)
    // if (this.state.index % 3 === 0) {
    //   return (this.state.index - 1)  //how to get left and right together and or else
    // } else if (this.state.index % 3 < 3) {
    //   return (this.state.index - 3)
    // } else if (this.state.index > 5) {
    //   return (this.state.index + 3)
    // }
    // console.log(this.state.x, this.state.y)
    // if(direction==="left"){

    //   this.setState({
    //     index: this.state.index-1,
    //     steps: this.state.steps +1,
    //     x: this.state.x -1
    //   })

    // }


  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    // const [state, setState] = cursor;
    // ?if button is on [x,x] coordinate it can move to avaible coordinate up down left or right, assuming it is not at the edge of the grid?

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
        this.setState({
          ...this.state,
          index: this.state.index - 1,
          message: "",
          steps: this.state.steps + 1,
          x: this.state.x - 1
        })
      } else {
        this.setState({ ...this.state, message: "You can't go left" })
      }

    }



  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    this.setState({message: this.state.message})
    const payload = { x: this.state.x, y: this.state.y, steps: this.state.steps, email: this.state.email }
    axios.post('http://localhost:9000/api/result', payload)
      .then(res => {
        console.log(res.data)

      })
      .catch(err => {
        console.error(err)
      })
  

  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} time{this.state.steps !== 1 ? 's' : ''}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
