import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import '../style/infomation.css'

const Infomation = (props) => {
    const [heroAttributeData, setHeroAttributeData] = useState([])
    const [heroWinPickRateData, setHeroWinPickRateData] = useState([])
    const [keyOfJsonWinPickRateData, setKeyOfJsonWinPickRateData] = useState([])
    const [keyOfJsonAttributeData, setKeyOfJsonAttributeData] = useState([])
    const [keyOfCalculateStatus, setKeyOfCalculateStatus] = useState([]);
    const [baseStatValue, setBaseStatValue] = useState([]);
    const [gainStatValue, setGainStatValue] = useState([]);
    const [allLevel, setAllLevel] = useState([]);
    const [level, setLevel] = useState(1);
    const [heroGainStatValue, setHeroGainStatValue] = useState([]);
    const [keyOfStatus, setKeyOfStatus] = useState([]);
    const { name } = useParams()
    useEffect(() => {
        async function fetchData(){
            const heroRateResponse = await fetch(`http://localhost:1337/characteristics/hero/${name}`,{
                method:'GET',
            })
            const heroAttributeResponse = await fetch(`http://localhost:1337/characters/hero/${name}`,{
                method:'GET',
            })
            const heroRateJson = await heroRateResponse.json();
            const heroAttributeJson = await heroAttributeResponse.json();
            const heroRateValue = Object.values(heroRateJson[0]).slice(2,12);
            const heroAttributeValue = Object.values(heroAttributeJson[0]).slice(22,38);
            const keyOfHeroRateJson = Object.keys(heroRateJson[0]).slice(2,12);
            const keyOfHeroAttributeJson = Object.keys(heroAttributeJson[0]).slice(22,38);
            let levelList = [];
            for(let i =1;i<31; i++){
                levelList.push(i)
            }
            let keyStat = []
            let heroGainValue = []
            for(let i=0; i<keyOfHeroAttributeJson.slice(10,16).length;i++){
                if(i%2 === 0){
                    let cal = (Math.round((heroAttributeValue.slice(10,16)[i] + (heroAttributeValue.slice(10,16)[i+1]*level)+ Number.EPSILON) * 100)/100);
                    heroGainValue.push(cal)
                    keyStat.push(keyOfHeroAttributeJson.slice(10,16)[i].replace('Base',''))
                }
            }

            setHeroGainStatValue(heroGainValue);

            setKeyOfStatus(keyStat)
            setAllLevel(levelList)
            setHeroWinPickRateData(heroRateValue)
            setHeroAttributeData(heroAttributeValue)
            setKeyOfJsonWinPickRateData(keyOfHeroRateJson)
            setKeyOfJsonAttributeData(keyOfHeroAttributeJson) 
        }
        fetchData()
    },[props.name, props.level] )
    function handleChangeLevel(event) {
        setLevel(event.target.value)
      }

    return (
        <div id="specificHero">
            <select name="level" id="lvl" onChange={handleChangeLevel}>
                {allLevel.map((data) => (
                    <option 
                    value={data} 
                    key={data} 
                    >
                    {data}
                    </option>
                ))
                }
            </select>
           <table id="rateTable">
                <thead>
                <tr id="tr_1">
                    <th></th>
                    <th>{name}</th>
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
                        <th>{name}</th>
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
            <table id="calculateStatTable">
                <thead>
                    <tr>
                        <th></th>
                        <th>{name}</th>
                    </tr>
                </thead>
                <tbody>
                    {keyOfStatus.map((data, index) => (
                        <tr key={index}>
                            <td>{data}</td>
                            <td>{heroGainStatValue[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Infomation