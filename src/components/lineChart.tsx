import { HIstoryData } from '@/controllers/uttils';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export const UserData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 10,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 333300,
    userLost: 234,
  },
  {
    id: 6,
    year: 2021,
    userGain: 10000,
    userLost: 823,
  },
  {
    id: 345,
    year: 2022,
    userGain: 25677,
    userLost: 345,
  },
  {
    id: 432,
    year: 2023,
    userGain: 58888,
    userLost: 555,
  },
  {
    id: 23424,
    year: 2024,
    userGain: 93000,
    userLost: 4555,
  },
  {
    id: 23432,
    year: 2025,
    userGain: 4300,
    userLost: 234,
  },
];

interface Props {
  Data: HIstoryData[]
}


export const LineChart = ({ Data }: Props) => {
  const [userData, setUserData] = useState<any>();


  useEffect(() => {
    setUserData(() => {
      return {
        labels: Data.map((data) => data.time),
        datasets: [
          {
            data: Data.map((data) => data.floor_price),
            borderColor: '#FD346E',
            borderWidth: 1,
          },
        ],
      }
    })
  }, [Data])

  return (

    <>
      {userData ?
        <Line
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            scales: {
              y: {
                display: false,
              },
              x: {
                display: false,
              },
            },
          }}
          aria-label=""
          style={{
            height: '100%',
            maxWidth: '100%',
          }}
          data={userData && userData}
        /> : "loading"
      }
    </>
  );
};
