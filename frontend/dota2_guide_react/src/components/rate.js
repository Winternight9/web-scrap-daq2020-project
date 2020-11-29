import React, { useState, useEffect } from 'react';
import '../style/rate.css'

const Rate = (props) => {
    const [firstHeroWinPickRateData, setFirstHeroWinPickRateData] = useState([])
    const [secondHeroWinPickRateData, setSecondHeroWinPickRateData] = useState([])
    const [keyOfJsonHeroWinPickRate, setKeyOfJsonHeroWinPickRate] = useState([])
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
            setFirstHeroWinPickRateData(firstHeroValue);
            setSecondHeroWinPickRateData(secondHeroValue);
            setKeyOfJsonHeroWinPickRate(keyOfHeroJson);
        }
        fetchData()
    },[props.firstHero, props.secondHero] )

    return (
        <div id="rate">
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
        </div>
    )
}
export default Rate