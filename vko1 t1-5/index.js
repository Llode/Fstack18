import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1> {props.kurssi.nimi}</h1>
        </div>
    )
}
const Sisalto = (props) => {
/*     return (
        <div>
            <p> {props.sisalto1}, {props.sisalto2}, {props.sisalto3}</p>
        </div>
    ) */
    return (
        <div>
            <p>{props.sisalto.osat[0].nimi}, {props.sisalto.osat[0].tehtavia}</p>
            <p>{props.sisalto.osat[1].nimi}, {props.sisalto.osat[1].tehtavia}</p>
            <p>{props.sisalto.osat[2].nimi}, {props.sisalto.osat[2].tehtavia}</p>
        </div>
    )
}
//T 1.2
/* const Osa = (props) => {
    return (
        <div>
            <p> {props.sis}, {props.teht} </p>
        </div>
    )
} */
/* const Sisalto2 = (props) => {
    return (
        <div>
            <Osa sis={props.osat} teht={props.tehtavia1}/>
            <Osa sis={props.osa2} teht={props.tehtavia2}/>
            <Osa sis={props.osa3} teht={props.tehtavia3}/>
        </div>
    )
} */
//T.14.
/* const Yhteensa = (props) => {
    let t = 0
    return (
        <div>
            <p> {props.yhteensa.forEach((luku) => {
                t += luku.tehtavia
            }) } {t}</p>
        </div>
    )
} */

const Yhteensa = (props) => {
    let t = 0
    return (
        <div>
            <p> {props.yhteensa.osat.forEach((luku) => {
                t += luku.tehtavia
            }) } {t}</p>
        </div>
    )
}

const App = () => {
    //Tehtävä 1.3
/*     const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    } */
    //T1.4T.1.4
/*     const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14
        }
      ] */
      const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }
    
  return (
    
    <div>
{/* Tehtävä 1.3 */}
{/*         <Otsikko kurssi={kurssi}/>
        <Sisalto sisalto1={osa1.nimi} sisalto2={osa2.nimi} sisalto3={osa3.nimi}/>
        <Yhteensa yhteensa={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia}/>
        <Sisalto2 osa1={osa1.nimi} tehtavia1={osa1.tehtavia}
         osa2={osa2.nimi} tehtavia2={osa2.tehtavia}
         osa3={osa3.nimi} tehtavia3={osa3.tehtavia}/>  */}

{/* T.1.4 */}
{/*         <Otsikko kurssi={kurssi}/>
        <Sisalto sisalto={osat}/>
        <Yhteensa yhteensa={osat}/> */}
        <Otsikko kurssi={kurssi}/>
        <Sisalto sisalto={kurssi}/>
        <Yhteensa yhteensa={kurssi}/> 
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)