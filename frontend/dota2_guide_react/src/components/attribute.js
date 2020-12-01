import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js'
import '../style/attribute.css'

const Attribute = (props) => {
    const [firstHeroAttributeData, setFirstHeroAttributeData] = useState([])
    const [secondHeroAttributeData, setSecondHeroAttributeData] = useState([])
    const [keyOfJsonHeroData, setKeyOfJsonHeroData] = useState([])
    const [keyOfStatus, setKeyOfStatus] = useState([]);
    const [firstHeroBaseStatValue, setFirstHeroBaseStatValue] = useState([]);
    const [secondHeroBaseStatValue, setSecondHeroBaseStatValue] = useState([]);
    const [firstHeroGainStatValue, setFirstHeroGainStatValue] = useState([]);
    const [secondHeroGainStatValue, setSecondHeroGainStatValue] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const firstHeroResponse = await fetch(`http://localhost:1337/characters/hero/${props.firstHero}`,{
                method:'GET',
            })
            const secondHeroResponse = await fetch(`http://localhost:1337/characters/hero/${props.secondHero}`,{
                method:'GET',
            })
            const firstHeroAttributeJson = await firstHeroResponse.json();
            const secondHeroAttributeJson = await secondHeroResponse.json();
            const firstHeroValue = Object.values(firstHeroAttributeJson[0]).slice(22,38);
            const secondHeroValue = Object.values(secondHeroAttributeJson[0]).slice(22,38);
            const keyOfHeroJson = Object.keys(firstHeroAttributeJson[0]).slice(22,38);
            let keyStat = []
            let firstHeroGainValue = []
            let firstHeroBaseValue = []
            let secondHeroGainValue = []
            let secondHeroBaseValue = []
            for(let i=0; i<keyOfHeroJson.slice(10,16).length;i++){
                if(i%2 === 0){
                    let calFirstHero = (Math.round((firstHeroValue.slice(10,16)[i] + (firstHeroValue.slice(10,16)[i+1]*props.level)+ Number.EPSILON) * 100)/100);
                    let calSecondHero = (Math.round((secondHeroValue.slice(10,16)[i] + (secondHeroValue.slice(10,16)[i+1]*props.level)+ Number.EPSILON) * 100)/100);

                    firstHeroGainValue.push(calFirstHero)
                    firstHeroBaseValue.push(firstHeroValue.slice(10,16)[i])

                    secondHeroGainValue.push(calSecondHero)
                    secondHeroBaseValue.push(secondHeroValue.slice(10,16)[i])

                    keyStat.push(keyOfHeroJson.slice(10,16)[i].replace('Base',''))
                }
            }
            setFirstHeroAttributeData(firstHeroValue);
            setFirstHeroBaseStatValue(firstHeroBaseValue);
            setFirstHeroGainStatValue(firstHeroGainValue);            

            setSecondHeroAttributeData(secondHeroValue);
            setSecondHeroBaseStatValue(secondHeroBaseValue);
            setSecondHeroGainStatValue(secondHeroGainValue);

            setKeyOfStatus(keyStat)
            setKeyOfJsonHeroData(keyOfHeroJson);
        }
        fetchData()
    },[props.firstHero, props.secondHero, props.level] )

    return (
        <div id="attribute">
            <table>
                <thead>
                    <tr id="tr_2">
                        <th></th>
                        <th>{props.firstHero}</th>
                        <th>Stat diff</th>
                        <th>{props.secondHero}</th>
                    </tr>
                </thead>
                <tbody>
                    {firstHeroAttributeData.map((data, index) => (
                    <tr key={index}>
                        <td>
                            {keyOfJsonHeroData[index]}
                        </td>
                        <td>
                            {data}
                        </td>
                        <td style={{color: ((parseFloat(data) - parseFloat(secondHeroAttributeData[index])) < 0)?"red" :((parseFloat(data) - parseFloat(secondHeroAttributeData[index])) === 0)?"initial": "green"}}>
                            {isNaN(data)? "": (Math.round((parseFloat(data) - parseFloat(secondHeroAttributeData[index]) + Number.EPSILON) * 100) / 100)}
                        </td>
                        <td>
                            {secondHeroAttributeData[index]}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>{props.firstHero}</th>
                        <th>Stat Diff</th>
                        <th>{props.secondHero}</th>
                    </tr>
                </thead>
                <tbody>
                    {keyOfStatus.map((data, index) => (
                        <tr key={index}>
                            <td>{data}</td>
                            <td>{firstHeroGainStatValue[index]}</td>
                            <td style={{color: ((firstHeroGainStatValue[index]-secondHeroGainStatValue[index]) < 0)?"red" :((firstHeroGainStatValue[index]-secondHeroGainStatValue[index]) === 0)?"initial": "green"}}
                            >
                                {(Math.round(((firstHeroGainStatValue[index]-secondHeroGainStatValue[index])+ Number.EPSILON) * 100) / 100)}
                                </td>
                            <td>{secondHeroGainStatValue[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Plot id="statGraph"
                    data={[
                    {
                        x: keyOfStatus,
                        y: firstHeroGainStatValue,
                        type: 'scatter',
                        mode:"lines",
                        marker: {color: 'orange'},
                        name:props.firstHero
                    },
                    {
                        x: keyOfStatus,
                        y: secondHeroGainStatValue,
                        type: 'scatter',
                        mode:"lines",
                        marker: {color: 'blue'},
                        name:props.secondHero
                    },
                    ]}
                    layout={ {width: 620, height: 540, title: 'Stat Chart'} }
                />
        </div>
    )
}
export default Attribute