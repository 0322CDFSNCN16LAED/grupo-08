import React from 'react'

export const categoriesInfo = [
    {
      id: 1,
      name: "Muebles", 
      icon: <i className="fas fa-chair"> </i>,
      cantidad: 1540,// me gustaria hacer el pedido a apis aca
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      link: '/categories/muebles'
    },
    {
      id: 2,
      name: "Textiles",
      icon: <i className="fas fa-mitten"></i>,
      cantidad: 800,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      link: '/categories/textiles'


    },
    {
      id: 3, 
      name: "Vajilla", 
      icon: <i className="fas fa-glass-cheers"></i>,
      cantidad: 7754,
      backgroundColor: 'rgba(255, 206, 86, 0.2)' ,
      borderColor: 'rgba(255, 206, 86, 1)',
      link: '/categories/vajilla'

    },
    {
      id: 4, 
      name: "Accesorios", 
      icon: <i className="fas fa-icons"></i>,
      cantidad: 4500,
      backgroundColor:'rgba(75, 192, 192, 0.2)' ,
      borderColor: 'rgba(75, 192, 192, 1)',
      link: '/categories/accesorios'

    },
    {
      id: 5,
      name: "Iluminación", 
      icon: <i className="far fa-lightbulb"></i>,
      cantidad: 2504,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      link: '/categories/iluminacion'

    },
    {
      id: 6,
      name: "Otros",
      icon: <i className="fas fa-box-open"></i>,
      cantidad: 8500,
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      link: '/categories/otros'

    }
  ]
