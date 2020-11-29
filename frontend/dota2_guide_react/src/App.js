import './App.css';
import Image from './components/image'
import Rate from './components/rate'
import Attribute from './components/attribute'
import Infomation from './components/infomation'
import Navigation from './components/navigation'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div id="app" className="App">
    <Navigation />
      <Route path="/image" component={Image}/>
      <Route path="/rate" >
        <Rate firstHero="Anti-Mage" secondHero="Bane"/>
      </Route>
      <Route path="/attribute">
        <Attribute firstHero="Anti-Mage" secondHero="Bane"/>
      </Route>
      <Route path="/infomation">
        <Infomation name="Anti-Mage" />
      </Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
