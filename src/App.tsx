import React from 'react';
import { useFinnkino, Event }from './services/finnkino'
import { Movie } from './components/Movie';

const App = () => {
  const [data] = useFinnkino(1033, "27.12.2019")
  console.log(data)

  return (
    <div>
        {data.map((movie: Event) =>  (<Movie {...movie}/>))}
    </div>
  );
}

export default App;
