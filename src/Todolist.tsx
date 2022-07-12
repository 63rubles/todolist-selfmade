import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import style from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeIsDone: (newId: string, value: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<string|null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const onChangeHandlerForCheckBox = (newId: string, checkBoxValue: boolean) => {
        props.changeIsDone(newId, checkBoxValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? style.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={style.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeIsDone(t.id, event.currentTarget.checked)
                    // }


                    return <li key={t.id} className={t.isDone ? style.isDone : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={(event)=>onChangeHandlerForCheckBox(t.id, event.currentTarget.checked)}
                        />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter==='all'? style.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter==='active'? style.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter==='completed'? style.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
