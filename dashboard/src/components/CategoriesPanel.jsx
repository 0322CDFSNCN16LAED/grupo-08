import React from "react";
import { Pie } from "react-chartjs-2";
import { categoriesInfo  } from "../consts/categoriesInfo";
import { categoriesPieChart } from '../consts/categoriesPieChart';


export default function CategoriesPanel({
    labels = [categoriesInfo.map((c) => (c.name))],
    datasets = [{
        data: [categoriesPieChart.map((c) => (c.data))],
        backgroundColor : [categoriesPieChart.map((c) => (c.backgroundColor))]
    }]
}) {
  return (
    <div>
    <h4 style={{color: 'green'}}> Soy el componente PANEL DE CATEGORIAS </h4>
    <Pie
      options={{
        width: "400",
        height: "400"
      }}
      data={{
        labels: labels,
        datasets: datasets
      }}
    /> 
    </div>
  );        
}
