import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js'
import { useParams } from 'react-router-dom'
import { Pie } from 'react-chartjs-2'
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
    const [allLevel, setAllLevel] = useState([]);
    const [level, setLevel] = useState(1);
    const [heroGainStatValue, setHeroGainStatValue] = useState([]);
    const [keyOfStatus, setKeyOfStatus] = useState([]);
    const { name } = useParams()
    const [pickRate, setPickRate] = useState([])
    const [winRate, setWinRate] = useState([])
    const [keyWordPickRate, setKeyWordPickRate] = useState([])
    const [keyWordWinRate, setKeyWordWinRate] = useState([])

    const gameAnalyzeDataPieChart = {
        labels:['EarlyGameWin', 'MidGameWin', 'LateGameWin'],
        datasets:[
            {
                data: [keyOfDurationEarlyGame,keyOfDurationMidGame,keyOfDurationLateGame],
                backgroundColor:[
                    'green',
                    'orange',
                    'red'
                ]
            }
        ]
    };

    const statusPieChart = {
        labels:keyOfStatus,
        datasets:[
            {
                data: heroGainStatValue,
                backgroundColor:[
                    'red',
                    'cyan',
                    'green',
                ]
            }
        ]
    };


    useEffect(() => {
        async function fetchData() {
            const heroRateResponse = await fetch(`http://localhost:1337/characteristics/hero/${name}`,{
                method:'GET',
            })
            const heroAttributeResponse = await fetch(`http://localhost:1337/characters/hero/${name}`,{
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

            let winRate = []
            let pickRate = []
            let keyOfWinRate = []
            let keyOfPickRate = []

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
                    if(matchWinnerHeroes[j] === name ){
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
            for(let index =0; index < heroRateValue.length;index++){
                if(index%2 === 0){
                    pickRate.push(parseFloat(heroRateValue[index]))
                    keyOfPickRate.push(keyOfHeroRateJson[index])
                }
                else{
                    winRate.push(parseFloat(heroRateValue[index]))
                    keyOfWinRate.push(keyOfHeroRateJson[index])
                }
            }


      
            for(let i = 0 ; i  < matchJson.length ; i++) {
                let matchDireHeroes = matchJson[i]['dire'].split(",")
                let matchRadiantHeroes = matchJson[i]['radiant'].split(",")
                
                for(let j = 0; j < 5 ; j++){
                    if(matchDireHeroes[j] === name ){
                       pickCount +=1;
                       break;
                        }
                    else if(matchRadiantHeroes[j] === name ){
                        pickCount +=1;
                        break;
                    }
                }
            }
            
            
            setHeroGainStatValue(heroGainValue);
            setKeyOfStatus(keyStat)
            setAllLevel(levelList)

            setHeroWinPickRateData(heroRateValue)
            setHeroAttributeData(heroAttributeValue)

            setKeyOfJsonWinPickRateData(keyOfHeroRateJson)
            setKeyOfJsonAttributeData(keyOfHeroAttributeJson)
  

            setKeyOfDurationEarlyGame(earlyGameCount)
            setKeyOfDurationMidGame(midGameCount)
            setKeyOfDurationLateGame(lateGameCount)
            setHeroImage(heroAttributeJson[0]['img'])
            setTotalGameNumber(matchJson.length)
            setPickCountNumber(pickCount)
            setWinCountNumber(winCount)


            // Graph
            setPickRate(pickRate)
            setWinRate(winRate)
            setKeyWordPickRate(keyOfPickRate)
            setKeyWordWinRate(keyOfWinRate)
        }
        fetchData()
    },[props.name, level])
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
                    <th><img src= {heroImage}></img></th>
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
             <Pie
                        data={statusPieChart}
                        options={{
                            title: {
                                display: true,
                                text: `Status Of ${name}`,
                            },
                        }}
                    />
             </table>

            <table id="winDurationTable">
                <thead>
                <tr id="trhead1">
                    <th></th>
                        <th>{name}
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
                <Pie
                    data={gameAnalyzeDataPieChart}
                    options={{
                        title: {
                            display: true,
                            text: `Total Win of ${name} in ${totalGameNumber} matches`,
                        },
                    }}
                    width={0.5}
                    height={0.25}
                />
            </table>
            <Plot id="pickRateGraph"
                    data={[
                    {
                        x: keyWordPickRate,
                        y: pickRate,
                        type: 'scatter',
                        mode:"lines + markers",
                        marker: {color: 'orange'},
                        name: name
                    },
                   
                    ]}
                    layout={ {width: 640, height: 540, title: 'PickRate Chart'} }
                />

            <Plot id="winRateGraph"
                    data={[
                    {
                        x: keyWordWinRate,
                        y: winRate,
                        type: 'scatter',
                        mode:"lines + markers",
                        marker: {color: 'blue'},
                        name: name
                    },
                   
                    ]}
                    layout={ {width: 640, height: 540, title: 'WinRate Chart'} }
                />
                
        </div>
        
    )
}
export default Infomation