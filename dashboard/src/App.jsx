import React from 'react'
import { Route, Switch } from 'react-router-dom'; // PROBLEMA : EL SWITCH NO FUNCIONAq

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductsList from './components/ProductsList';
import UsersList from './components/UsersList';
import CategoriesPanel from './components/CategoriesPanel';

  
function App() {
  return (
      <div className="App" 
      style={{marginLeft: '15rem', marginTop: '12rem' }}>
       <h2 style={{color: 'green'}}> Se monto APP  </h2>
        <TopBar/>
        <NavBar/>

          <Route path='/' component={Home}/>
          <Route path='/users'  component={UsersList}/>
          <Route path='/products' component={ProductsList}/>
          <Route path='/categories' component={CategoriesPanel}/> 
      </div>
  );
}

export default App;