import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from "./components/Input";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function removeTask(todolistId: string,taskId: string) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].filter(fl=>fl.id !== taskId)} )
    }
    function addTask(todolistId: string,title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
    }
    function changeStatus(todolistId: string, id: string, newIsDone: boolean) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map(el=>el.id === id ? {...el, isDone:newIsDone} : el)})
    }
    function changeFilter(todolistId: string,filterValue: FilterValuesType) {
        setTodolists(todolists.map(el=>el.id === todolistId ? {...el, filter:filterValue} : el))
    }
    function removeTodolist(todolistId: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[todolistId]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }
    const addTodolist = (newTitle: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title: newTitle, filter: "all"}
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks,[newTodolistId]:[]})
    }
    const changeTask = (todolistId: string, taskId: string, currentTitle: string) => {
            setTasks( {...tasks, [todolistId] : tasks[todolistId].map(el=>el.id===taskId ? {...el, title:currentTitle} : el)})
    }
    const editTodolist = (todolistId: string, currentTitle: string) => {
        setTodolists(todolists.map(el=>el.id === todolistId ? {...el, title:currentTitle} : el))
    }

    return (
        <div className="App">
            <Input callBack={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTask={changeTask}
                        editTodolist={editTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
