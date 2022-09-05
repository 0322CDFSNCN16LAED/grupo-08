import React from 'react'
import { Route, Switch } from 'react-router-dom'; // PROBLEMA : EL SWITCH NO FUNCIONAq

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductsList from './components/ProductsList';
import UsersList from './components/UsersList';
import CategoriesList from './components/CategoriesList';
//        <TopBar/> 
  
function App() {
  return (
      <div className="App" 
      style={{marginLeft: '15rem', marginTop: '12rem' }}>
       
        <NavBar/>

        <Route path='/categories' component={CategoriesList}/> 
        <Route path='/' component={Home}/>
        <Route path='/users'  component={UsersList}/>
        <Route path='/products' component={ProductsList}/>        
        
      </div>
  );
}
export default App;