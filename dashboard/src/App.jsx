import './App.css';
import BigCard from './components/BigCard';
import MiniCard from './components/Minicards';
import Weather from './components/Weather';
import logo from './logo.png';

const miniCards = [
  {
      id: "1", // id para que?
      title: "Total de productos en venta",
      color: 'pink',//color c44cb4 no funciona
      value: "5236",
      icon: "fa-gifts",
  },
  {
      id: "2",
      title: "Total de usuarios registrados",
      color: "pink",
      value: "739",
      icon: "fa-users",
  }
];  

//  
function App() {
  return (
      <div>
      <header className="" >
        <img src={logo} alt="logo" />
        Aca me gustaria el weather a la derecha <Weather/>
      </header>   

        <div className="row">
          {/* <!-- Minicard con totales de prductos y usuarios --> */}
          {miniCards.map((data) => {
            return <MiniCard {...data} key={data.id} />;
            })}
        </div>
     
        <BigCard/> <BigCard/> 
      </div>

  );
}

export default App;
