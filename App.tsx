import {Splash} from '@/components';
import {Main} from '@/screens';
import React, {useState} from 'react';

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return loaded ? <Main /> : <Splash setLoaded={setLoaded} />;
};

export default App;
