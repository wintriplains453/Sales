
import { useState } from 'react';
import Header from './components/header/header';

import './App.scss';
import Content from './components/content/content';

function App() {
  const [time, setTime] = useState(120)

  return (
    <div className='appWrapper'>
      <Header time={time} setTime={setTime}/>
      <Content time={time}/>
    </div>
  );
}

export default App;
