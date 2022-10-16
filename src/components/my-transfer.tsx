import { useState } from 'react';
import "./my-transfer.css"

export interface IArrayModel
{
   value: number;
   label: string;
}

interface InputChangeInterface {
    target: HTMLInputElement;
  }

  
export default function MyTransfer(props:any) {
    const listSize = props.size??10
    const dataSource : IArrayModel[] = props.dataSource as IArrayModel[] ;
    const selectedDataKeys : number[]= props.selectedDataKeys;

    let sourceDataSource : IArrayModel[] = dataSource;
    let targetDataSource : IArrayModel[] = [];
    selectedDataKeys.forEach(i=> {
        const data = sourceDataSource.filter(f=> f.value === i)[0]
        targetDataSource.push(data)
        sourceDataSource = sourceDataSource.filter(f => f.value !== i )
    })
    
    const [sourceSelected, setSourceSelected] = useState<string[]>([]);
    const [targetSelected, setTargetSelected] = useState<string[]>([]);

    const handleSourceChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        sourceSelected.length > 0 && sourceSelected.includes(e.target.value) ? 
            sourceSelected.length == 1 ? setSourceSelected([]) : 
                setSourceSelected(sourceSelected.filter(k=> k!== e.target.value))
        :
            setSourceSelected([...sourceSelected, e.target.value])
        ;
    }

    const handleTargetChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        targetSelected.length > 0 && targetSelected.includes(e.target.value) ? 
            targetSelected.length == 1 ? setTargetSelected([]) : 
                setTargetSelected(targetSelected.filter(k=> k!== e.target.value))
        :
            setTargetSelected([...targetSelected, e.target.value])
        ;
    }

    const sourceToTarget = () => {
        let newSelection = selectedDataKeys 
        sourceSelected.map(k=> newSelection.push(parseInt(k)))
        setSourceSelected([])
        props.setSelectedDataKeys(newSelection)
    }

    const targetToSource = () => {
        let newSelection = selectedDataKeys.filter(k=> !targetSelected.includes(k.toString()))
        setTargetSelected([])
        props.setSelectedDataKeys(newSelection)
    }
       

    return(<>
        <div className="transfer">
            <div className="transferSource">
                 <div>{props.sourceTitle}</div>
                <select  
                    size={listSize}  
                    multiple={true}
                    onChange={handleSourceChange }
                    value={sourceSelected}
                >
                    {sourceDataSource.map(i=> <option value={i.value} key={i.value}>{i.label}</option>)}
                </select>
            </div>
            <div className="transferButtons">
                <button disabled={sourceSelected.length < 0} onClick={sourceToTarget}> &gt; </button>
                <button disabled={targetSelected.length < 0} onClick={targetToSource}> &lt; </button>
            </div>
            <div className="transferTarget">
                <div>{props.targetTitle}</div>
                <select 
                    size={listSize} 
                    multiple={true}
                    onChange={handleTargetChange }
                    value={targetSelected}
                    
                >
                    {targetDataSource.map(i=> <option value={i.value} key={i.value}>{i.label}</option>)}
                </select>
            </div>
        </div>
    </>
    )
}