import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            pisteet: [0,0,0,0,0,0]
        }
    }

    uusiMotto = (anecdotes) => {
        const ii = Math.floor(Math.random() * anecdotes.length)
        return() => {
            this.setState({ selected: ii })
        }

    }
    vote = () => {
        const kopio = this.state.pisteet
        kopio[this.state.selected] += 1
        this.setState({ pisteet: kopio})
        return(
            kopio[this.state.pisteet]
        )
    }
    render() {
        const Winner = {
            points:0,
            index:0
        }
        const MaxVotes = (props) => {
            let max = 0
            let index = 0
            props.array.forEach(element => {
                if(element > max){
                    max = element
                    index = props.array.indexOf(element)
                }
            });
            return(
                <div>
                <p> The best anecdote is <b>{props.array2[index]}</b>!</p>
                <p> It has {max} votes!</p>
                </div>
            )
        }
        const Button = ({clickAction, text}) => {
            return(
            <button onClick={clickAction}>{text}</button>
            )
        }

        return (
            <div>
               <p> {this.props.anecdotes[this.state.selected]}</p>
               <p> Has {this.state.pisteet[this.state.selected]} votes </p>
               <Button clickAction={this.vote} text="Vote"/>
               <Button clickAction={this.uusiMotto (anecdotes)} text="Next anecdote"/>
               <h1>Anecdote with most votes:</h1>
               <MaxVotes array={this.state.pisteet} array2={this.props.anecdotes}/>
            </div>
        )
    }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)