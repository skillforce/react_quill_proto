
import './App.css';
import {Modal} from "./Modal/modal";
import {useState} from "react";

function App() {
    const [modalActive,setModalActive]=useState(true)


  return (
    <div className="App">
        <button onClick={()=>setModalActive(true)}>Open PopUp</button>
        <Modal active={modalActive} setActive={setModalActive}/>
    </div>
  );
}

export default App;
