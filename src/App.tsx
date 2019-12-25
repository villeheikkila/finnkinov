import React from 'react';
import {useFinnkino, Event }from './services/finnkino'

const App = () => {
  const [data] = useFinnkino(1033, "27.12.2019")
  console.log(data)

  return (
    <div>
        {data.map((e: Event) =>  (<div> <a href={e.url} key={e.title}>{e.title}</a></div>))}
    </div>
  );
}

export default App;
