import './App.css';
import Navbar from "./components/Navbar";
import TextForm from './components/TextForm';
// import About from './components/About';
import React , { useState } from "react";
import Alert from './components/Alert';
//! Github pr host krne ke liye sb router wala cheez hataya gya h
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {


  const [mode , setMode] =useState('light')
  const [alert, setAlert] = useState(null);

  const showAlert =(message ,type)=>{
      setAlert({
        msg:message,
        type:type

      })
      setTimeout(() => {
        setAlert(null);
      }, 1500);

  }

  

  const toggleMode =()=>{
    let switchText = document.getElementById('switchText')
    switchText.style.color='black';

    if(mode==='light'){
      setMode('dark')
      showAlert("Shifted to Dark Mode" , "success")
      switchText.style.color='white';
      document.body.style.backgroundColor='#9d9fa1';
      document.title='TextUtils - Dark Mode';

      //*Blinking title
      /*
      setInterval(() => {
      document.title='TextUtils is amazing';
      }, 2000);
      
      setInterval(() => {
      document.title="Install TextUtils";
      }, 1500);
    */
    }
    else{
      switchText.style.color='black';
      document.body.style.backgroundColor='white';
      showAlert("Shifted to Light Mode" , "success")
      document.title='TextUtils - Light Mode';



      setMode('light')
    }  
  }


  const makeBlue=()=>{
    document.body.style.backgroundColor='blue'
    document.body.style.color='white'
  }

  const makeGreen=()=>{
    document.body.style.backgroundColor='green'
    document.body.style.color='white'
  }

  const makeRed=()=>{
    document.body.style.backgroundColor='coral'
    document.body.style.color='white'
  }
  return (
    <>
  <Navbar  makeBlue={makeBlue} makeGreen={makeGreen} makeRed={makeRed} title="Text_Utils" mode={mode}  myText="About Us" toggleMode={toggleMode}/>
  <Alert alert={alert}/>
  <TextForm showAlert={showAlert} heading="Enter the text to analyze"/>


 {/* Router ko hataya gya h , github pr host krne k liye */}
{/* 
    <Router>
  <Navbar  makeBlue={makeBlue} makeGreen={makeGreen} makeRed={makeRed} title="Text_Utils" mode={mode}  myText="About Us" toggleMode={toggleMode}/>
    <Alert alert={alert}/>
  <div className="container my-3">

    <Routes>
      <Route exact path="/about" element={<About/>} />
      <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter the text to analyze"/>}/>  
      </Routes>      

  </div>
 </Router> */}
    </>
  );
}

export default App;
