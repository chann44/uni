import { useState } from 'react';
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
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

export const LineChart = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        data: UserData.map((data) => data.userGain),
        borderColor: '#FD346E',
        borderWidth: 1,
      },
    ],
  });

  return (
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
      data={userData}
    />
  );
};
