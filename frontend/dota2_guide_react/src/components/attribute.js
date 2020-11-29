import React, { useState, useEffect } from 'react';
import '../style/attribute.css'

const Attribute = (props) => {
    const [firstHeroAttributeData, setFirstHeroAttributeData] = useState([])
    const [secondHeroAttributeData, setSecondHeroAttributeData] = useState([])
    const [keyOfJsonHeroData, setKeyOfJsonHeroData] = useState([])
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
            const firstHeroValue = Object.values(firstHeroAttributeJson[0]).slice(22,38);;
            const secondHeroValue = Object.values(secondHeroAttributeJson[0]).slice(22,38);;
            const keyOfHeroJson = Object.keys(firstHeroAttributeJson[0]).slice(22,38);;
            setFirstHeroAttributeData(firstHeroValue);
            setSecondHeroAttributeData(secondHeroValue);
            setKeyOfJsonHeroData(keyOfHeroJson);
        }
        fetchData()
    },[props.firstHero, props.secondHero] )

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
        </div>
    )
}
export default Attribute