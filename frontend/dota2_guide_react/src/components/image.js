import React, { useState, useEffect } from 'react';
import '../style/image.css'
import { Link } from 'react-router-dom'

const Image = () => {
    const [heroImg, setHeroImg] = useState([])

    useEffect(() => {
        async function fetchData() {
            const heroResponse = await fetch(`http://localhost:1337/characters`,{
                method:'GET',
            })
            const allHeroResponse = await heroResponse.json();
            await allHeroResponse.sort(function(a,b){
                a = a.displayName.toLowerCase()
                b = b.displayName.toLowerCase()
                return a<b ? -1 : a>b ? 1 : 0;
            });
            setHeroImg(allHeroResponse)
        }
        fetchData();
    }, [])

    return (

        <div id="allImg">
                {heroImg.map((data, index) => (
                    <Link to={`/infomation/${data.displayName}`}  key={index} id={data.displayName}>
                    <img alt={data.displayName} id={`HeroId${data.heroId}`} src={data.img}></img>
                    </Link>
                        )
                    )
                }

        </div>
    )
}

export default Image