import React from 'react'

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
 state = initialState;

  getXY = () => {
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = (this.state.index % 3) +1
    
    let y 
    if(this.state.index<3 ){
      y=1
    }
    else if (this.state.index<6){
      y=2
    }
    else if(this.state.index<9){
      y=3
    }

    return[x,y];

  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    // ?determine where the avaible spaces to move are and if the limit is reached in the grid to stop the event?

   const [x,y] = this.getXY();

   return `Coordinates (${x},${y})`;


    
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // ? set state of cursor?

    // if the remainder of the index modulo 3 is equal to 0 return the index, otherwise index minus 1 (left)or +1 (right)

    // if the index is less than 3 return the index, otherwise index minus 3(up)

    // if the index is greater than 5 return the index, otherwise index +3 (down)
    if(this.state.index % 3 === 0){
      return(this.state.index-1)  //how to get left and right together and or else
    } else if(this.state.index % 3 < 3){
      return(this.state.index-3)
    } else if(this.state.index > 5){
      return(this.state.index+3)
    }


  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    // const [state, setState] = cursor;
    // ?if button is on [x,x] coordinate it can move to avaible coordinate up down left or right, assuming it is not at the edge of the grid?
    
    if(evt.target.id==="up"){
      // console.log(evt);
      
      if(this.state.index > 2) {
        this.setState({
          ...this.state, 
          index: this.state.index -3,
          message: "", 
          steps: this.state.steps + 1
        })
      } else {
        this.setState({...this.state, message: "You can't go up"})
      }

    }
    if(evt.target.id==="down"){
      console.log(evt);
      
      if(this.state.index < 6) {
          this.setState({
          ...this.state,
          index: this.state.index + 3,
          message: "",
          steps: this.state.steps + 1
          })
      } else {
        this.setState({...this.state, message: "You can't go down"})
      }

    }
    // if (evt.target.id==="right"){


    // }
    
    // if (evt.target.id==="left"){

    // }



  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    console.log(this.state)
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
          <h3  id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
