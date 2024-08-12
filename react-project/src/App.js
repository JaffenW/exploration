import logo from './logo.svg';
import './App.css';
import { Input, Select } from 'antd'
import { useState } from 'react';

function App() {
  const [info, setInfo] = useState({});
  const [renderList, setRenderList] = useState([])
  const onChange = (key, value) => {
    if (key === 'type') {
      if (value === '0') {
        setRenderList(items)
      } else {
        setRenderList(item2)
      }
    }
    setInfo({ ...info, [key]: value})
  }
  const items = [
    {
      label: '姓名',
      key: 'name',
      component: <Input value={info.name} onChange={(v) => onChange('name', v)} />
    },
    {
      label: '性别',
      key: 'gender',
      component: <Input value={info.gender} onChange={(v) => onChange('gender', v)} />
    },
    {
      label: '年龄',
      key: 'age',
      component: <Input value={info.age} onChange={(v) => onChange('age', v)}/>
    }
  ];
  const item2 = [
    {
      label: '语文',
      key: 'name',
      component: <Input value={info.chinese} onChange={(v) => onChange('chinese', v)} />
    },
    {
      label: '数学',
      key: 'gender',
      component: <Input value={info.math} onChange={(v) => onChange('math', v)} />
    },
    {
      label: '英语',
      key: 'age',
      component: <Input value={info.english} onChange={(v) => onChange('english', v)}/>
    }
  ];


  const render = () => {
    if (info.type === 0) {
      return items.map(item => <>
        <label>{item.label}</label>
        {item.component}
      </>)
    }
  }

  return (
    <div className="App">
      <Select onChange={(v) => onChange('type', v)}>
        <Select.Option value="0">0</Select.Option>
        <Select.Option value="1">1</Select.Option>
      </Select>
      {
        renderList.map(item => <>
          <label>{item.label}</label>
          {item.component}
        </>)
      }
    </div>
  );
}

export default App;
