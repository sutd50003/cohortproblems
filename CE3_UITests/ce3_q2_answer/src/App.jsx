import './App.css';
import { useState } from 'react';
import Dept from './Dept';
import Staff from './Staff';



function App() {
  const url = `http://localhost:3000`;
  const DEPT = 0;
  const STAFF = 1;
  const [tab, setTab] = useState(STAFF);

  const Child = tab === DEPT ? Dept : Staff;
  return (
    <div>
      <div>
          {/* <span onClick={() => {setTab(DEPT);}}>DEPARTMENT</span> &nbsp; | &nbsp;  */} 
          <span onClick={() => {setTab(STAFF);}}>STAFF</span> 
      </div>
      <hr/>
      <Child http_addr={url}/>    
    </div>
  );
}

export default App;
