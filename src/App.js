import React from 'react'
import Add from './components/Add';
//import Edit from './components/Edit';
// import './App.css';
//import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
//import Edit from './components/Edit';



const App = () => {

 
  return (
    <div >
       <h1 style={{fontSize:60,textAlign:"center",color:'white'}}>Todo App</h1>
       <br/><br/>
          <div className='container'>
            {/* <Search/> */}
            <Add/>
          </div>
          {/* <Router>
        <Routes>
          <Route path='/' element={<Add/>}/>
          <Route path='/edit' element={<Edit/>}/>
        </Routes>
      </Router> */}
          


    </div>
  )
}

export default App