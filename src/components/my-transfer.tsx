import { useState } from 'react';
import "./my-transfer.css"

export interface IArrayModel
{
   value: number;
   label: string;
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
    
    const [sourceSelected, setSourceSelected] = useState(-1);
    const [targetSelected, setTargetSelected] = useState(-1);

    const sourceToTarget = () => {
        let newSelection = selectedDataKeys 
        newSelection.push(sourceSelected)
        setSourceSelected(-1)
        props.setSelectedDataKeys(newSelection)
    }

    const targetToSource = () => {
        let newSelection = selectedDataKeys.filter(k=>k !== targetSelected)
        setTargetSelected(-1)
        props.setSelectedDataKeys(newSelection)
    }
       

    return(<>
        <div className="transfer">
            <div className="transferSource">
                 <div>{props.sourceTitle}</div>
                <select  size={listSize} onChange={(event) =>setSourceSelected(parseInt(event.target.value)) }>
                    {sourceDataSource.map(i=> <option value={i.value} key={i.value}>{i.label}</option>)}
                </select>
            </div>
            <div className="transferButtons">
                <button disabled={sourceSelected < 0} onClick={sourceToTarget}> &gt; </button>
                <button disabled={targetSelected < 0} onClick={targetToSource}> &lt; </button>
            </div>
            <div className="transferTarget">
                <div>{props.targetTitle}</div>
                <select size={listSize} onChange={(event) =>setTargetSelected(parseInt(event.target.value)) }>
                    {targetDataSource.map(i=> <option value={i.value} key={i.value}>{i.label}</option>)}
                </select>
            </div>
        </div>
    </>
    )
}