import { useState } from 'react';
import './App.css';
import MyTransfer, { IArrayModel } from './components/my-transfer';



function App() {
  // Data Source
  // All data goes here
  let data : IArrayModel[] = [
    {value:1, label:"test 1"},
    {value:2, label:"test 2"},
    {value:3, label:"test 3"},
    {value:4, label:"test 4"},
    {value:5, label:"test 5"},
    
  ]
  // Selected Keys 
  let selectedKeys : number[] = [];
  // if 3 and 5 are selected it should be like 
  selectedKeys = [3, 5];

  const [selectedDataKeys, setSelectedDataKeys] = useState<number[]>(selectedKeys);

  return (
    <div className="App">
      My Transfer Component
      <MyTransfer 
          dataSource={data} 
          selectedDataKeys={selectedDataKeys} 
          setSelectedDataKeys={setSelectedDataKeys}
          sourceTitle="Source"
          targetTitle="Target"
          size={8}  // size of the listboxes 
        />
        {selectedDataKeys.map(k=> <label>{k}</label>)}
    </div>
  );
}

export default App;
