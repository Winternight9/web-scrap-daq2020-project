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
    const [totalGameNumber,setTotalGameNumber] = useState(0)
    const [winCountNumber, setWinCountNumber] = useState(0)
    const [pickCountNumber, setPickCountNumber] = useState(0)

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

            console.log(matchJson);
            let lateGameCount = 0;
            let earlyGameCount = 0;
            let midGameCount = 0;
            let winCount = 0;
            let pickCount =0;

            for(let i = 0 ; i  < matchJson.length ; i++) {
                let duration = matchJson[i]['durations'].replace(":","");
                let matchresult = matchJson[i]['result']
                let matchWinnerHeroes = matchJson[i][matchresult.toLowerCase()].split(",")
                

                for(let j = 0; j < 5 ; j++){
                    if(matchWinnerHeroes[j] == props.name ){
                        if(parseInt(duration) > 4000 ){
                            lateGameCount += 1;
                            winCount +=1;
                        }
                        else if(parseInt(duration) >2500){
                            midGameCount += 1;
                            winCount +=1;
                        }
                        else if(parseInt(duration)> 0){
                            earlyGameCount += 1;
                            winCount +=1;
                        }
                    break;
                }
            }
            }
            for(let i = 0 ; i  < matchJson.length ; i++) {
                let matchDireHeroes = matchJson[i]['dire'].split(",")
                let matchRadiantHeroes = matchJson[i]['radiant'].split(",")
                
                for(let j = 0; j < 5 ; j++){
                    if(matchDireHeroes[j] == props.name ){
                       pickCount +=1;
                       break;
                        }
                    else if(matchRadiantHeroes[j] == props.name ){
                        pickCount +=1;
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
            setTotalGameNumber(matchJson.length)
            setPickCountNumber(pickCount)
            setWinCountNumber(winCount)

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
            <table id="winDurationTable">
                <thead>
                <tr id="trhead1">
                    <th></th>
                        <th>{props.name}
                        </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Total Analyze Game</td>
                    <td>{totalGameNumber}</td>
                </tr>
                    <td>Total Pick</td>
                    <td>{pickCountNumber}</td>
                <tr>
                    <td>Total Win</td>
                    <td>{winCountNumber} </td>
                </tr>
                 <tr>
                   <td> EarlyGameWin 00:00 - 25:00</td> 
                   <td>{keyOfDurationEarlyGame}</td>
                </tr>    
                <tr>
                   <td> MidGameWin 25:01 - 40:00</td>
                   <td>{keyOfDurationMidGame}</td>
                </tr>    
                <tr>
                   <td> LateGameWin 40:01 - </td> 
                   <td>{keyOfDurationLateGame}</td>
                </tr>    
                
                </tbody>
            </table>
        </div>
    )
}
export default Infomation