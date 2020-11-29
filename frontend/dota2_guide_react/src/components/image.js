import React, { useState, useEffect } from 'react';
import '../style/image.css'

const Image = () => {
    const [heroImg, setHeroImg] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchData(){
            setLoading(true)
            const heroResponse = await fetch(`http://localhost:1337/characters`,{
                method:'GET',
            })
            const allHeroResponse = await heroResponse.json();
            allHeroResponse.sort(function(a,b){
                a = a.displayName.toLowerCase()
                b = b.displayName.toLowerCase()
                return a<b ? -1 : a>b ? 1 : 0;
            });
            setHeroImg(allHeroResponse)
            setLoading(false)
        }
        fetchData()
    })

    return (
        <div id="allImg">
                {heroImg.map((data) => (
                    <a href="/infomation" id={data.displayName}>
                        <img alt={data.displayName} id={`HeroId${data.heroId}`} src={data.img}></img>
                    </a>
                        )
                    )
                }

        </div>
    )
}

export default Image