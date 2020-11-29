import React, { useState, useEffect } from 'react';
import '../style/infomation.css'

const Infomation = (props) => {
    const [heroAttributeData, setHeroAttributeData] = useState([])
    const [heroWinPickRateData, setHeroWinPickRateData] = useState([])
    const [keyOfJsonWinPickRateData, setKeyOfJsonWinPickRateData] = useState([])
    const [keyOfJsonAttributeData, setKeyOfJsonAttributeData] = useState([])
    useEffect(() => {
        async function fetchData(){
            const heroRateResponse = await fetch(`http://localhost:1337/characteristics/hero/${props.name}`,{
                method:'GET',
            })
            const heroAttributeResponse = await fetch(`http://localhost:1337/characters/hero/${props.name}`,{
                method:'GET',
            })
            const heroRateJson = await heroRateResponse.json();
            const heroAttributeJson = await heroAttributeResponse.json();
            const heroRateValue = Object.values(heroRateJson[0]).slice(2,12);
            const heroAttributeValue = Object.values(heroAttributeJson[0]).slice(22,38);
            const keyOfHeroRateJson = Object.keys(heroRateJson[0]).slice(2,12);
            const keyOfHeroAttributeJson = Object.keys(heroAttributeJson[0]).slice(22,38);
            setHeroWinPickRateData(heroRateValue)
            setHeroAttributeData(heroAttributeValue)
            setKeyOfJsonWinPickRateData(keyOfHeroRateJson)
            setKeyOfJsonAttributeData(keyOfHeroAttributeJson)
        }
        fetchData()
    },[props.name] )

    return (
        <div id="specificHero">
           <table id="rateTable">
                <thead>
                <tr id="tr_1">
                    <th></th>
                    <th>{props.name}</th>
                </tr>
                </thead>
                <tbody>
                    {heroWinPickRateData.map((data, index) => (
                <tr key={index}>
                    <td>
                        {keyOfJsonWinPickRateData[index]}
                    </td>
                    <td>
                        {data}
                    </td>
                </tr>
                    ))}
                </tbody>
            </table>
            <table id="attributeTable">
                <thead>
                    <tr id="tr_2">
                        <th></th>
                        <th>{props.name}</th>
                    </tr>
                </thead>
                <tbody>
                    {heroAttributeData.map((data, index) => (
                    <tr key={index}>
                        <td>
                            {keyOfJsonAttributeData[index]}
                        </td>
                        <td>
                            {data}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Infomation