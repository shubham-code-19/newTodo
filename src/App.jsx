import React, { useState } from 'react'
import "./App.css"
const App = () => {
    const [task, setTask] = useState("")
    const [item, setItem] = useState([])


    const[isEdit,setIsEdit]=useState(true)
    const [editID,setEditID]=useState(null)


    const add = () => {
        if (!task) {
            alert("please add something")
        }
        else if(task && !isEdit){
            setItem(item.map((elm)=>{
                if(editID===elm.id){
                    return {...elm,name:task}
                }
                return elm;
            }))
            setIsEdit(true)
            setTask("")
            setEditID(null)
            
        }
        else {
            const addNewTask={id:new Date().getTime().toString(),name:task,completed: false }
            setItem([...item, addNewTask])
            console.log(item)
            setTask("")
        }
    }

 
    const cutLine=(userID)=>{
       
        setItem(item.map((elm)=>{
            if(userID===elm.id){
                  return { ...elm, completed: !elm.completed };
            }
            return elm
        }))

        

      

    }

    const edit=(userID)=>{
        const editItem=item.find((elm)=>{
            return userID===elm.id
        })
        
        setTask(editItem.name)
        setEditID(userID)
        setIsEdit(false)
        
    }

    const parmaDelete = (userID) => {
        setItem(item.filter((elm) => {
            return userID !== elm.id
        }))
    }

    return (
        <>
            <div className="container">
                <div className="Todo">
                    <h4 className='todoNAme'>Todo</h4>
                    <div className="getInputBox">
                        <input type="text" className='getValue' value={task} onChange={(e) => { setTask(e.target.value) }} />
                     {isEdit?<i className="ri-add-large-fill add" onClick={add}></i>:<i  className="ri-pencil-line parmaDelete" onClick={add}></i>}   
                    </div>

                    <div className="outputBox">


                        {item.map((elm, index) => {
                            return (
                                
                                    <div key={elm.id} className="ouputValesParent">
                                        <h4 className='outputName' style={{ textDecoration:  elm.completed ? "line-through" : "none" }}>{elm.name}      </h4>
                                        <i className="ri-subtract-line subtact " onClick={()=>{cutLine(elm.id)}}></i>
                                        <i  className="ri-pencil-line parmaDelete" onClick={()=>{edit(elm.id)}}></i>
                                        <i className="ri-close-large-fill parmaDelete" onClick={() => { parmaDelete(elm.id) }}></i>
                                    </div>
                               
                            )
                        })}




                    </div>
                </div>


            </div>
        </>
    )
}

export default App


