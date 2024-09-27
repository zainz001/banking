"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const Doughnutchat = ({accounts}:DoughnutChartProps) => {
  const data={
    datasets:[{
      label:'Banks',
      data:[1213,1243,5454],
      backgroundColor:['#0747b6','#2265d8','#2f91fa']
    }] ,
    labels:['Bank1','Bank2','Bank3']
  }
  return <Doughnut data={data} 
  options={{
    cutout:'60%',
    plugins:{
      legend:{
        display:false
      }
    }
  }}
  />; 
      

}

export default Doughnutchat
