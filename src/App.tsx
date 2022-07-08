import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = 'All' | 'Active' | 'Completed';

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "TypeScript", isDone: false}
    ])

    const [filterValue, setFilterValue] = useState('All')

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (id: string) => {
        // tasks=tasks.filter((el)=>el.id!==elId)
        setTasks(tasks.filter((t) => t.id !== id))
        console.log(id)
    }

    let filteredTasks = tasks
    if (filterValue === 'Active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }
    if (filterValue === 'Completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }

    const changeTaskFilter = (nameButton: string) => {
        setFilterValue(nameButton)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskFilter={changeTaskFilter}
            />
        </div>
    );
}

export default App;
