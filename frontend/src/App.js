import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const input = useRef(null);
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios.get('/api/values')
    .then((res) => {
      setLists(res.data);
    })
    const inputElem = input.current;
    inputElem.focus();
  }, []);

  function changeHandler({ currentTarget }) {
    setValue(currentTarget.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    axios.post('/api/value', { value })
    .then((res) => {
      if(res.data.success) {
        setLists([...lists, {value: res.data.value}]);
        setValue('');
        input.current.focus();
      } else {
        alert('실패..');
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {lists.length !== 0 && 
        <ul>
          {lists.map((list, idx) => {
            return <li key={idx}>{list.value}</li>
          })}
        </ul>
        }
        <form className="form" onSubmit={submitHandler}>
          <div className="container">
            <input ref={input} type="text" placeholder="입력해주세요" value={value} onChange={changeHandler}/>
            <button type="submit">입력</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
