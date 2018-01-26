import React from 'react';
import ReactDOM from 'react-dom';


// const Statistiikka = (props) => {
//     return(
//         <div>
//             <h1>Statistiikkaa</h1>
//             <p>Hyva {props.hyva}</p>
//             <p>OK {props.ok}</p>
//             <p>Huono {props.huono}</p>
//         </div>
//     )
// }

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hyva: 0,
            ok: 0,
            huono: 0
        }
    }
    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva +1
        })
    }
    klikOk = () => {
        this.setState({
            ok: this.state.ok +1
        })
    }
    klikHuono = () => {
        this.setState({
            huono: this.state.huono +1
        })
    }
    asetaArvo = (nimi) => {
        return() => {
            this.setState({ 
                [nimi]: this.state[nimi] +1
            })
            console.log(nimi)
        }
    }

    render() {
        const positiiviset =  this.state.hyva / (this.state.huono + this.state.ok + this.state.hyva) *100
        const ka = (this.state.hyva - this.state.huono) / (this.state.huono + this.state.ok + this.state.hyva)
        
        const Statistics = () => {
            if(this.state.hyva === 0 && this.state.huono === 0 && this.state.ok === 0){
                return(
                    <div>
                        <h1>Statistiikkaa</h1>
                        <p>Ei vielä palautteita.</p>
                    </div>
                )
            }
            return(
                <div>
                    <h1>Statistiikkaa</h1>
                    <table>
                        <tbody>
                        <tr><td><Statistic nimi="Hyvä:" sisalto={this.state.hyva}/></td></tr>
                        <tr><td><Statistic nimi="OK:" sisalto={this.state.ok}/></td></tr>
                        <tr><td><Statistic nimi="Huono:" sisalto={this.state.huono}/></td></tr>
                        <tr><td><Statistic nimi="Keskiarvo:" sisalto={ka}/></td></tr>
                        <tr><td><Statistic nimi="Positiivisia:" sisalto={positiiviset}/></td></tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        const Button = ({clickAction, text}) => {
            return(
            <button onClick={clickAction}>{text}</button>
            )
        }
        const Statistic = (props) => {
            if(props.sisalto === positiiviset) {
                return (
                    <div>{props.nimi}: {props.sisalto}%</div>
                )
            }
            return(
                <div>
                    {props.nimi}: {props.sisalto}
                </div>
            )
        }
        return(
            <div>
                <h1>Anna palautetta</h1>
                <Button clickAction={this.asetaArvo('hyva')} text= "Hyvä" />
                <Button clickAction={this.asetaArvo('ok')} text="OK"/>
                <Button clickAction={this.asetaArvo('huono')} text="Huono"/>
                <Statistics/>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
