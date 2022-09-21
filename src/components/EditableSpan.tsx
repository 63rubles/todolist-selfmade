import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (currentTitle: string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [edit,setEdit] = useState(false)
    let [currentTitle, setCurrentTitle] = useState(props.title)

    const changeEdit = () => {
        setEdit(!edit)
        addTask()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }

    const addTask = () => {
        let newTitle = currentTitle.trim();
            props.callBack(newTitle);
    }
    return (
        edit
            ? <input value={currentTitle} onChange={onChangeHandler} onBlur={changeEdit} autoFocus/>
            : <span onDoubleClick={changeEdit}>{props.title}</span>
    );
};