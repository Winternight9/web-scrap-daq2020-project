import React, { useState, useEffect } from 'react';
import '../style/image.css'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

const Image = () => {
    const [heroAgiImg, setHeroAgiImg] = useState([])
    const [heroIntImg, setHeroIntImg] = useState([])
    const [heroStrImg, setHeroStrImg] = useState([])


    useEffect(() => {
        async function fetchData() {
            const heroAgiResponse = await fetch(`http://localhost:1337/characters/hero/attribute/agi`,{
                method:'GET',
            })
            const heroIntResponse = await fetch(`http://localhost:1337/characters/hero/attribute/int`,{
                method:'GET',
            })
            const heroStrResponse = await fetch(`http://localhost:1337/characters/hero/attribute/str`,{
                method:'GET',
            })
            const heroAgi= await heroAgiResponse.json();
            const heroInt = await heroIntResponse.json();
            const heroStr = await heroStrResponse.json();

            await heroAgi.sort(function(a,b){
                a = a.displayName.toLowerCase()
                b = b.displayName.toLowerCase()
                return a<b ? -1 : a>b ? 1 : 0;
            });
            await heroInt.sort(function(a,b){
                a = a.displayName.toLowerCase()
                b = b.displayName.toLowerCase()
                return a<b ? -1 : a>b ? 1 : 0;
            });
            await heroStr.sort(function(a,b){
                a = a.displayName.toLowerCase()
                b = b.displayName.toLowerCase()
                return a<b ? -1 : a>b ? 1 : 0;
            });
            
            setHeroAgiImg(heroAgi)
            setHeroIntImg(heroInt)
            setHeroStrImg(heroStr)
        }
        fetchData();
    }, [])

    return (

        <div id="allImg">
            <Row>
                <Col>
            <div>
                <h1 style={{"color": "white"}}>Agility</h1>
                {heroAgiImg.map((data, index) => (
                    <Link to={`/infomation/${data.displayName}`}  key={index} id={data.displayName}>
                    <img alt={data.displayName} id={`HeroId${data.heroId}`} src={data.img}></img>
                    </Link>
                        )
                    )
                }
            </div>
                </Col>
                <Col>
            <div>
                <h1 style={{"color": "white"}} >Intelligence</h1>
                {heroIntImg.map((data, index) => (
                    <Link to={`/infomation/${data.displayName}`}  key={index} id={data.displayName}>
                    <img alt={data.displayName} id={`HeroId${data.heroId}`} src={data.img}></img>
                    </Link>
                        )
                    )
                }
            </div>
                </Col>
                <Col>
            <div>
                <h1 style={{"color": "white"}}>Strength</h1>
                {heroStrImg.map((data, index) => (
                    <Link to={`/infomation/${data.displayName}`}  key={index} id={data.displayName}>
                    <img alt={data.displayName} id={`HeroId${data.heroId}`} src={data.img}></img>
                    </Link>
                        )
                        )
                    }
            </div>
                </Col>
            </Row>

        </div>
    )
}

export default Image