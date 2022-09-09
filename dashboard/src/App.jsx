import React from 'react'
import { Route, Switch } from 'react-router-dom'; // PROBLEMA : EL SWITCH NO FUNCIONAq

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductsList from './components/ProductsList';
import UsersList from './components/UsersList';
import CategoriesList from './components/CategoriesList';

  
function App() {
  return (
      <div className="App" 
      style={{marginLeft: '15rem', marginTop: '12rem' }}>
        <TopBar/> 
        <NavBar/>
        
        <Switch> 
        <Route path='/categories' exact= {true} component={CategoriesList}/> 
        <Route path='/' exact= {true} component={Home}/>
        <Route path='/users' exact= {true} component={UsersList}/>
        <Route path='/products'exact= {true} component={ProductsList}/>             
        </Switch> 
        
      </div>
  );
}
export default App;