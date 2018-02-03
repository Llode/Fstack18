import React from 'react'

const Yhteensa = (props) => {
    let t = 0
    props.forEach((luku) => {
        t += luku.tehtavia
    })
    return (
        t

    )
}

const Kurssi = (props) => {
    console.log('kurssiprops', props)
    const t = props.osat
    console.log('kurssit', t)
    const result = t.map(osa => osa.tehtavia)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return (
        <div>
            <h1>{props.nimi}</h1>
            {t.map(osa => <p key={osa.nimi}>{osa.nimi} {osa.tehtavia}</p>)}
            <p>Yhteensä {result.reduce(reducer)} tehtävää</p>
        </div>
    )
}

const Kurssit = (props) => {
    const kurssit = props.kurssit.map(kurssi => kurssi)
    console.log('eka', kurssit)
    return (
        kurssit.map(kurssi => <div key={kurssi.id}>{Kurssi(kurssi)}</div>)

    )
}

export default Kurssit