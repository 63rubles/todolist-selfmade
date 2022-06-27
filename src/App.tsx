import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "TypeScript", isDone: false}
    ])

    const [filterValue, setFilterValue]=useState('All')

    const removeTask = (elId: number) => {
        // tasks=tasks.filter((el)=>el.id!==elId)
        setTasks(tasks.filter((el) => el.id !== elId))
        console.log(elId)
    }

    let filteredTasks=tasks
    if (filterValue==='Active'){
        filteredTasks = tasks.filter(el=>!el.isDone)
    }
    if (filterValue==='Completed'){
        filteredTasks = tasks.filter(el=>el.isDone)
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
                changeTaskFilter={changeTaskFilter}
            />
        </div>
    );
}

export default App;
