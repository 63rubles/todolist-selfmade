import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (newTitle: string) => void
    changeTaskFilter: (nameButton: string) => void
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId)
    }

    // const changeTaskFilterAll = () => {props.changeTaskFilter('All')}
    // const changeTaskFilterActive = () => {props.changeTaskFilter('Active')}
    // const changeTaskFilterCompleted = () => {props.changeTaskFilter('Completed')}

    const tsarChangeFilter = (valueFilter: FilterValueType) => {
        props.changeTaskFilter(valueFilter)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map((el) => {

                // const removeTaskHandler = () => {
                //     props.removeTask(el.id)
                // }

                return (
                    <li key={el.id}>
                        <button onClick={()=>removeTaskHandler(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=>tsarChangeFilter('All')}>All</button>
            <button onClick={()=>tsarChangeFilter('Active')}>Active</button>
            <button onClick={()=>tsarChangeFilter('Completed')}>Completed</button>
        </div>
    </div>
}
