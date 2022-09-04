import React from 'react'
import { Switch, Route } from 'react-router-dom'; //PROBLEMA : No me deja usar Switch

import AppBar from './components/AppBar';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductsList from './components/ProductsList';
import UsersList from './components/UsersList';
import CategoriesPanel from './components/CategoriesPanel';

  
function App() {
  return (
      <div className="App" 
      style={{marginLeft: '19rem'}}>
       <h2 style={{color: 'green'}}> Se monto APP  </h2>
        <header>
          <AppBar/>
        </header>
        <NavBar/>
        
        <Switch>
          <Route path='/' component={Home}/>
          <Route path='/users'  component={UsersList}/>
          <Route path='/products' component={ProductsList}/>
          <Route path='/categories' component={CategoriesPanel}/> 

                 
        </Switch>              
        
      </div>

  );
}

export default App;