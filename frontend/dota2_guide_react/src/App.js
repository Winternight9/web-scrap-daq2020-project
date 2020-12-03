// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Image from './components/image'
import Rate from './components/rate'
import Attribute from './components/attribute'
import Infomation from './components/infomation'
import Navigation from './components/navigation'
import React, { useState, useEffect } from 'react';


import { BrowserRouter, Route} from 'react-router-dom';

function App() {
  const [firstHeroName, setFirstHeroName] = useState("Anti-Mage");
  const [secondHeroName, setSecondHeroName] = useState("Anti-Mage");
  const [allLevel, setAllLevel] = useState([]);
  const [level, setLevel] = useState(1);
  const [HeroesName, setHeroesName] = useState([]);
  useEffect (() =>{
    async function fetchData() {
      const heroResponse = await fetch(`http://localhost:1337/characters`,{
        method:'GET',
      });
      const heroDataJson = await heroResponse.json();
      let levelList = [];
      for(let i =1;i<31; i++){
        levelList.push(i)
      }
      setAllLevel(levelList)
      setHeroesName(heroDataJson)
    }
    fetchData();
  }, [])

  function handleChangeFirstHero(event) {
    setFirstHeroName(event.target.value)
  }
  function handleChangeSecondHero(event) {
    setSecondHeroName(event.target.value)
  }
  function handleChangeLevel(event) {
    setLevel(event.target.value)
  }
  return (
    <BrowserRouter>
    <div id="app" className="App">
      
    <Navigation />
      <Route path="/" exact component={Image}/>
      <Route path="/rate" >
      <select name="firstHero" id="selecFirstHero" onChange={handleChangeFirstHero}>
        {HeroesName.map((data) => (
            <option 
              value={data.displayName} 
              key={data.displayName} 
            >
              {data.displayName}
            </option>
          ))
        }
      </select>
      <select name="secondHero" id="selecSecondHero" onChange={handleChangeSecondHero}>
        {HeroesName.map((data) => (
            <option 
              value={data.displayName} 
              key={data.displayName} 
            >
              {data.displayName}
            </option>
          ))
        }
      </select>
        <Rate firstHero={firstHeroName} secondHero={secondHeroName}/>
      </Route>
      <Route path="/attribute">
      <select name="firstHero" id="selecFirstHero" onChange={handleChangeFirstHero}>
        {HeroesName.map((data) => (
            <option 
              value={data.displayName} 
              key={data.displayName} 
            >
              {data.displayName}
            </option>
          ))}
      </select>
      <select name="secondHero" id="selecSecondHero" onChange={handleChangeSecondHero}>
        {HeroesName.map((data) => (
            <option 
              value={data.displayName} 
              key={data.displayName} 
            >
              {data.displayName}
            </option>
          ))
        }
      </select>
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
        <Attribute level={level} firstHero={firstHeroName} secondHero={secondHeroName}/>
      </Route>
      <Route path="/infomation/:name" level={level} component={Infomation}>
      </Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
