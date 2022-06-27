import React, {useState} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(elId: number)=>void
    changeTaskFilter:(nameButton: string)=>void
}

export function Todolist(props: PropsType) {

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((el)=>{
                return(
                    <li key={el.id}>
                        <button onClick={()=>props.removeTask(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=>props.changeTaskFilter('All')}>All</button>
            <button onClick={()=>props.changeTaskFilter('Active')}>Active</button>
            <button onClick={()=>props.changeTaskFilter('Completed')}>Completed</button>
        </div>
    </div>
}
