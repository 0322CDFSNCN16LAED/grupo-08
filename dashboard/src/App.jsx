import React from 'react'
import { Route, Switch } from 'react-router-dom'; // PROBLEMA : EL SWITCH NO FUNCIONAq

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductsList from './components/ProductsList';
import UsersList from './components/UsersList';
import CategoriesPanel from './components/CategoriesPanel';
import CategoryMuebleList from './components/CategoryMuebleList';


  
function App() {
  return (
      <div className="App" 
      style={{marginLeft: '15rem', marginTop: '12rem' }}>
        <TopBar/> 
        <NavBar/>
        
        <Switch> 
        <Route path='/' exact= {true} component={Home}/>
        <Route path='/users' exact= {true} component={UsersList}/>
        <Route path='/products'exact= {true} component={ProductsList}/>
        <Route path='/categories' exact= {true} component={CategoriesPanel}/> 
        <Route path='/categories/muebles' exact= {true} component={CategoryMuebleList}/> 

        </Switch> 
        
      </div>
  );
}
export default App;