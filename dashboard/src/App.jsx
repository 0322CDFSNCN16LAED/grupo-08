import React from 'react'
import { Route, Switch } from 'react-router-dom'; 

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductsList from './components/ProductsList';
import UsersList from './components/UsersList';
import CategoriesPanel from './components/CategoriesPanel';


  
function App() {
  return (
      <div className="App" 
      style={{marginLeft: '13rem', marginTop: '11rem', backgroundColor: '#ebebeb' }}>
        <TopBar/> 
        <NavBar/>
        
        <Switch> 
        <Route path='/' exact= {true} component={Home}/>
        <Route path='/users' exact= {true} component={UsersList}/>
        <Route path='/products'exact= {true} component={ProductsList}/>
        <Route path='/categories' exact= {true} component={CategoriesPanel}/> 
        </Switch> 
        
      </div>
  );
}
export default App;