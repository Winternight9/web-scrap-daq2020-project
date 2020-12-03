import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js'
import { Row, Col } from 'react-bootstrap'
import '../style/rate.css'


const Rate = (props) => {
    const [firstHeroWinPickRateData, setFirstHeroWinPickRateData] = useState([])
    const [secondHeroWinPickRateData, setSecondHeroWinPickRateData] = useState([])
    const [keyOfJsonHeroWinPickRate, setKeyOfJsonHeroWinPickRate] = useState([])
    const [firstHeroWinRateFolatValue, setFirstHeroWinRateFolatValue] = useState([])
    const [secondHeroWinRateFolatValue, setSecondHeroWinRateFolatValue] = useState([])
    const [firstHeroPickRateFolatValue, setFirstHeroPickRateFolatValue] = useState([])
    const [secondHeroPickRateFolatValue, setSecondHeroPickRateFolatValue] = useState([])
    const [keyOfJsonHeroWinRate, setKeyOfJsonHeroWinRate] = useState([])
    const [keyOfJsonHeroPickRate, setKeyOfJsonHeroPickRate] = useState([])


    useEffect(() => {
        async function fetchData(){
            const firstHeroResponse = await fetch(`http://localhost:1337/characteristics/hero/${props.firstHero}`,{
                method:'GET',
            })
            const secondHeroResponse = await fetch(`http://localhost:1337/characteristics/hero/${props.secondHero}`,{
                method:'GET',
            })
            const firstHeroWinPickRateJson = await firstHeroResponse.json();
            const secondHeroWinPickRateJson = await secondHeroResponse.json();
            const firstHeroValue = Object.values(firstHeroWinPickRateJson[0]).slice(2,12);
            const secondHeroValue = Object.values(secondHeroWinPickRateJson[0]).slice(2,12);
            const keyOfHeroJson = Object.keys(firstHeroWinPickRateJson[0]).slice(2,12);
            let firstHeroWinFloatValue = [];
            let secondHeroWinFloatValue = [];
            let firstHeroPickFloatValue = [];
            let secondHeroPickFloatValue = [];
            let keyWordPickRate = [];
            let keyWordWinRate = [];
            for(let index =0; index < keyOfHeroJson.length;index++){
                if(index%2 === 0){
                    firstHeroPickFloatValue.push(parseFloat(firstHeroValue[index]))
                    secondHeroPickFloatValue.push(parseFloat(secondHeroValue[index]))
                    keyWordPickRate.push(keyOfHeroJson[index])
                }else{
                    firstHeroWinFloatValue.push(parseFloat(firstHeroValue[index]))
                    secondHeroWinFloatValue.push(parseFloat(secondHeroValue[index]))
                    keyWordWinRate.push(keyOfHeroJson[index])
                }
            }
            setKeyOfJsonHeroWinRate(keyWordWinRate)
            setFirstHeroWinRateFolatValue(firstHeroWinFloatValue)
            setSecondHeroWinRateFolatValue(secondHeroWinFloatValue)

            setKeyOfJsonHeroPickRate(keyWordPickRate)
            setFirstHeroPickRateFolatValue(firstHeroPickFloatValue)
            setSecondHeroPickRateFolatValue(secondHeroPickFloatValue)

            setFirstHeroWinPickRateData(firstHeroValue);
            setSecondHeroWinPickRateData(secondHeroValue);
            setKeyOfJsonHeroWinPickRate(keyOfHeroJson);
        }
        fetchData()
    },[props.firstHero, props.secondHero] )

    return (
        <div id="rate">
            <Row>
                <Col>
            <table id="table">
                <thead>
                <tr id="tr_1">
                    <th></th>
                    <th>{props.firstHero}</th>
                    <th>diff%</th>
                    <th>{props.secondHero}</th>
                </tr>
                </thead>
                <tbody>
                    {firstHeroWinPickRateData.map((data, index) => (
                <tr key={index}>
                    <td>
                        {keyOfJsonHeroWinPickRate[index]}
                    </td>
                    <td>
                        {data}
                    </td>
                    <td style={{color: ((parseFloat(data) - parseFloat(secondHeroWinPickRateData[index])) < 0)?"red" :((parseFloat(data) - parseFloat(secondHeroWinPickRateData[index])) === 0)?"initial": "green"}}>
                        {`${(Math.round((parseFloat(data) - parseFloat(secondHeroWinPickRateData[index]) + Number.EPSILON) * 100) / 100)}%`}
                    </td>
                    <td>
                        {secondHeroWinPickRateData[index]}
                    </td>
                </tr>
                    ))}
                </tbody>
            </table>
                </Col>
            </Row>
           <Row>
           <Plot id="winRateGraph"
                    data={[
                    {
                        x: keyOfJsonHeroWinRate,
                        y: firstHeroWinRateFolatValue,
                        type: 'scatter',
                        mode:"lines + markers",
                        marker: {color: 'orange'},
                        name:props.firstHero
                    },
                    {
                        x: keyOfJsonHeroWinRate,
                        y: secondHeroWinRateFolatValue,
                        type: 'scatter',
                        mode:"lines + markers",
                        marker: {color: 'blue'},
                        name:props.secondHero
                    },
                    ]}
                    layout={ {width: 620, height: 540, title: 'WinRate Chart'} }
                />
                <Plot id="pickRateGraph"
                    data={[
                    {
                        x: keyOfJsonHeroPickRate,
                        y: firstHeroPickRateFolatValue,
                        type: 'scatter',
                        mode:"lines + markers",
                        marker: {color: 'orange'},
                        name:props.firstHero
                    },
                    {
                        x: keyOfJsonHeroPickRate,
                        y: secondHeroPickRateFolatValue,
                        type: 'scatter',
                        mode:"lines + markers",
                        marker: {color: 'blue'},
                        name:props.secondHero
                    },
                    ]}
                    layout={ {width: 620, height: 540, title: 'PickRate Chart'} }
                />
            </Row>
        </div>
    )
}
export default Rate