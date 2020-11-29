import React, { useState, useEffect } from 'react';
import '../style/infomation.css'

const Infomation = (props) => {
    const [heroAttributeData, setHeroAttributeData] = useState([])
    const [heroWinPickRateData, setHeroWinPickRateData] = useState([])
    const [keyOfJsonWinPickRateData, setKeyOfJsonWinPickRateData] = useState([])
    const [keyOfJsonAttributeData, setKeyOfJsonAttributeData] = useState([])
    const [keyOfDurationEarlyGame, setKeyOfDurationEarlyGame] = useState(0)
    const [keyOfDurationMidGame, setKeyOfDurationMidGame] = useState(0)
    const [keyOfDurationLateGame, setKeyOfDurationLateGame] = useState(0)
    const [heroImage, setHeroImage] = useState("") 

    useEffect(() => {
        async function fetchData() {
            const heroRateResponse = await fetch(`http://localhost:1337/characteristics/hero/${props.name}`,{
                method:'GET',
            })
            const heroAttributeResponse = await fetch(`http://localhost:1337/characters/hero/${props.name}`,{
                method:'GET',
            })
            const matchResponse = await fetch('http://localhost:1337/matches',{
                method:'GET',
            })

            
            const heroRateJson = await heroRateResponse.json();
            const heroAttributeJson = await heroAttributeResponse.json();
            const matchJson = await matchResponse.json();
            const heroRateValue = Object.values(heroRateJson[0]).slice(2,12);
            const heroAttributeValue = Object.values(heroAttributeJson[0]).slice(22,38);
            const keyOfHeroRateJson = Object.keys(heroRateJson[0]).slice(2,12);
            const keyOfHeroAttributeJson = Object.keys(heroAttributeJson[0]).slice(22,38);

            let lateGameCount = 0;
            let earlyGameCount = 0;
            let midGameCount = 0;
            
            for(let i = 0 ; i  < matchJson.length ; i++) {
                let duration = matchJson[i]['durations'].replace(":","");
                let matchresult = matchJson[i]['result']
                let matchWinnerHeroes = matchJson[i][matchresult.toLowerCase()].split(",")
                

                for(let j = 0; j < 5 ; j++){
                    if(matchWinnerHeroes[j] == props.name ){
                        if(parseInt(duration) > 4000 ){
                            lateGameCount += 1;
                        }
                        else if(parseInt(duration) >2500){
                            midGameCount += 1;
                        }
                        else if(parseInt(duration)> 0){
                            earlyGameCount += 1;
                        }
                    break;
                }
            }
            
            }
            setKeyOfDurationEarlyGame(earlyGameCount)
            setKeyOfDurationMidGame(midGameCount)
            setKeyOfDurationLateGame(lateGameCount)
            setHeroWinPickRateData(heroRateValue)
            setHeroAttributeData(heroAttributeValue)
            setKeyOfJsonWinPickRateData(keyOfHeroRateJson)
            setKeyOfJsonAttributeData(keyOfHeroAttributeJson)
            setHeroImage(heroAttributeJson[0]['img'])

        }
        fetchData()

    },[props.name] )

    return (
        <div id="specificHero">
            
           <table id="rateTable">
                <thead>
                <tr id="tr_1">
                    <th><img src= {heroImage}></img></th>
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
            {keyOfDurationEarlyGame}
            {keyOfDurationMidGame}
            {keyOfDurationLateGame}
        </div>
    )
}
export default Infomation