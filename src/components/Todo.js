import React, { useState,useEffect } from 'react';
import "./style.css";

const getLocalData = () =>{
  const lists = localStorage.getItem("myTodoList");
  if(lists){
    return JSON.parse(lists);

  }else{
    return [];
  }

};


const Todo = () => {
    const [inputdata,setInputData]=useState("");
    const [items,setItems] = useState(getLocalData());
    const [isEditItem,setIsEditItem] = useState(null);
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () =>{
      if(!inputdata) {
        alert('plz fill the data');
      }
      else if(inputdata && toggleButton){
      setItems(
        items.map((currElem)=>{
          if(currElem.id===isEditItem){
            return {...currElem,name:inputdata};
          }
          return currElem;
          
        })
      ); 
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);       
      }
      else{
        const myNewInputData = {
          id:new Date().getTime().toString(),
          name: inputdata,
        };
       setItems([...items, myNewInputData]);
        setInputData("");
      } 
    };

    const editItem = (index)=>{
      const Itemedited = items.find((currElem)=>{
        return currElem.id ===index;
      });
      setInputData(Itemedited.name);
      setIsEditItem(index);
      setToggleButton(true);
    };



    //how to delete item
    const deleteItem = (index)=>{
      const updatedItems = items.filter((currElem)=>{
        return currElem.id !==index;
      });
      setItems(updatedItems);
    };

    const removeAll = ()=>{
      setItems([]);
    };

    useEffect(() => {
     localStorage.setItem("myTodoList", JSON.stringify(items));
    }, [items])
    


  return (
    <>  
       
        <div className="main-div" > 
        <div className="heading"><h1>To Do List</h1>
            <div className="div1">
                <figure>
                    <img src='https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_1280.png' alt="todologo" />
                    <figcaption>Add your List here 🤩</figcaption>
                </figure>
                <div className="addItems">
                  <input 
                    type="text"
                    placeholder='Add Item ✍️'
                    className='form-control' 
                    value={inputdata }
                    onChange={(event) => setInputData(event.target.value) }
                    />

                    {toggleButton ? (
                       <i className='far fa-edit add-btn' onClick={addItem}></i>

                    ):( <i className='fas fa-plus add-btn' onClick={addItem}></i>)}

                          
                </div>
                <div className="showItems">
                      {
                        items.map((currElem) => {
                          return (
                            <div className="eachItem" key={currElem.id}>
                      <h3>{currElem.name}</h3>
                      <div className="todo-btn">
                      <i className='far fa-edit add-btn ' onClick={()=>editItem(currElem.id)}></i> 
                      <i className='far fa-trash-alt add-btn ' onClick={()=>deleteItem(currElem.id)}></i> 
                      </div>
                  </div>
                          )

                        })
                      }
                  
                </div>

                <div className="showItems">
                  <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                </div>
                
            </div>

        </div>
        </div>
    </>
  )
}

export default Todo