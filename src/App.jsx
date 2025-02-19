import "./App.css";
import { useState } from "react";
import searchIcon from "./assets/Vector (6).png";
import edit from "./assets/Vector (7).png";
import trash from "./assets/trash-svgrepo-com 1.png";
import add from "./assets/Add button.png";

function TodoList() {
  const initialData = [
    {
      id: 1,
      title: "Note1",
      description: "do this thing",
      status: false 
    },
    {
      id: 2,
      title: "Note2",
      description: "do this thing",
      status: true 
    },
    { id: 3,
      title: "Note3",
      description: "do this thing",
      status: true 
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isEdit,setEdit] = useState(false)
  const [currentNote, setCurrentNote] = useState(null); // Store the note being edited
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter,setFilter] = useState("All notes")
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setEdit(false)
    resetForm();
  }
  function resetForm() {
    setTitle("");
    setDescription("");
  }
  const saveNote = () => {
        const newNote = {
          title,
          description,
          status: true,
        };
        setData((prevData) => [...prevData, newNote]);
        resetForm();
        closeModal();
  } 
  function openModalE(txt){
    setEdit(true)
    setTitle(txt.title)
    setDescription(txt.description)
    setCurrentNote(txt)
    openModal()
  }
  let updateTxt = () =>{
    setData((prevData) => 
    prevData.map((txt) => txt.id == currentNote.id
    ? {...txt, title, description}
    : txt
  ))
  resetForm()
  closeModal()
  }
  // Search  
  // Delete
  function deleteUser(id) {
    setData(data.filter((e) => e.id !== id));
  }
  // filter
  function filterchange(event){
    let value = event.target.value
    setFilter(value)

    if(value === 'All notes'){
      setData(initialData)
    } else if(value === 'Active'){
      setData(initialData.filter((todo) => todo.status === true))
    }else if(value === 'Inactive'){
      setData(initialData.filter((todo) => todo.status === false))
    }
  }
  function checkboxChange(id) {
    setData(prevData =>
      prevData.map(todo => 
        todo.id === id 
          ? { ...todo, status: !todo.status } 
          : todo
      )
    );
  }
  const filteredData = data.filter((el) =>
    JSON.stringify(el).toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="main">
    
      <h1>Get Things Done!</h1>
      <div className="first">
        <div className="searchh">
          <input
            type="search"
            placeholder="Search note..."
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
          />
          <img src={searchIcon} alt="Search" />
        </div>
        <img onClick={()=>openModal()} src={add} className="add" alt="Add" />
        <select onChange={(event) => filterchange(event)} value={filter}>
          <option>All notes</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div>
       {filteredData.length > 0 ? (
      filteredData.map((e) => (
        <div key={e.id} className="line">
          <div className="dd">
            <input
              type="checkbox"
              className="checkbox"
              checked={e.status}
              onChange={() => checkboxChange(e.id)}
            />
            <div>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
            </div>
          </div>
          <div>
            <button className={`btnA ${e.status ? "active" : "inactive"}`}>
              {e.status ? "Active" : "Inactive"}
            </button>
            <img src={edit} alt="Edit" onClick={() => openModalE(e)} />
            <img src={trash} alt="Delete" onClick={() => deleteUser(e.id)} />
          </div>
        </div>
      ))
    ) : (
      <h2 style={{ textAlign: "center" }}>Not found</h2>
    )}
  </div>

      {isModalOpen && (
        <dialog open>
          <div className="content">
            <h2>Add New Note</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
            />
            <div>
              <button onClick={saveNote}>Save Note</button>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </dialog>
      )}
       {isEdit && (
        <dialog open>
          <div className="content">
            <h2>Edit Note</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
            />
            <div>
              <button onClick={updateTxt}>Update Note</button>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>


  );
}

export default TodoList;
