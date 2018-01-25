import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1> {props.kurssi}</h1>
        </div>
    )
}
const Sisalto = (props) => {
    return (
        <div>
            <p> {props.sisalto1}, {props.sisalto2}, {props.sisalto3}</p>
        </div>
    )
}
const Osa = (props) => {
    return (
        <div>
            <p> {props.sis}, {props.teht} </p>
        </div>
    )
}
const Sisalto2 = (props) => {
    return (
        <div>
            <Osa sis={props.osa1} teht={props.tehtavia1}/>
            <Osa sis={props.osa2} teht={props.tehtavia2}/>
            <Osa sis={props.osa3} teht={props.tehtavia3}/>
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p> {props.yhteensa}</p>
        </div>
    )
}
const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    //  Tehtävä 1
    <div>

        <Otsikko kurssi={kurssi}/>
        <Sisalto sisalto1={osa1} sisalto2={osa2} sisalto3={osa3}/>
        <Yhteensa yhteensa={tehtavia1 + tehtavia2 + tehtavia3}/>
        <Sisalto2 osa1={osa1} tehtavia1={tehtavia1}
         osa2={osa2} tehtavia2={tehtavia2}
         osa3={osa3} tehtavia3={tehtavia3}/>

    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)