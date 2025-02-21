import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  Checkbox,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import btnD from './assets/trash-svgrepo-com 1.png'
import btnE from './assets/Vector (7).png'

function TodoList() {
  const initialData = [
    { id: 1, title: "Study", description: "revise topics", status: false },
    { id: 2, title: "Note2", description: "Complete the task", status: true },
    { id: 3, title: "Note3", description: "Do this task finish", status: true },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentNote, setCurrentNote] = useState(null);

  function openModal() { setIsModalOpen(true); }
  function closeModal() { setIsModalOpen(false); resetForm(); }
  function openEditModal(note) { setIsEditModalOpen(true); setTitle(note.title); setDescription(note.description); setCurrentNote(note); }
  function closeEditModal() { setIsEditModalOpen(false); resetForm(); }
  function resetForm() { setTitle(""); setDescription(""); }
  
  function saveNote() {
    let newOne = { id: Date.now(), title, description, status: false };
    setData([...data, newOne]);
    closeModal();
  }

  function updateUser() {
    setData(data.map((e) => e.id === currentNote.id ? { ...e, title, description } : e));
    closeEditModal();
  }

  function deleteUser(id) {
    setData(data.filter((e) => e.id !== id));
  }

  function checkk(e) {
    let updatedData = data.map((el) => el.id === e.id ? { ...el, status: !el.status } : el);
    setData(updatedData);
  }

  function filterIt(event) {
    setFilter(event.target.value);
  }

  let filteredData = data
    .filter((el) => (filter === "Done" ? el.status : filter === "Not Done" ? !el.status : true))
    .filter((el) => JSON.stringify(el).toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box sx={{ maxWidth: "500px", margin: "20px auto", textAlign: "center", background: "rgba(201, 197, 197, 0.64)", padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h4" sx={{ color: "black", marginBottom:"20px"}}>Get Things Done!</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField label="Search" variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Select value={filter} onChange={filterIt} size="small">
          <MenuItem value="All">All Notes</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
          <MenuItem value="Not Done">Not Done</MenuItem>
        </Select>
        <Button variant="contained" sx={{ backgroundColor: "black" }} onClick={openModal}>Add</Button>
      </Box>

      {filteredData.length > 0 ? (
        filteredData.map((e) => (
          <Card key={e.id} sx={{ marginTop: "10px" }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
              <Checkbox checked={e.status} onChange={() => checkk(e)} />
              <Box>
                <Typography variant="h6" sx={{ textAlign: "start" }}>{e.title}</Typography>
                <Typography>{e.description}</Typography>
              </Box>
              <Button variant="contained" sx={{ backgroundColor: e.status ? "darkgreen" : "red", padding: "2px 5px", height: "fit-content" }}>
                {e.status ? "Active" : "Inactive"}
              </Button>
              <Box sx={{ display: "flex" }}>
                <Button onClick={() => deleteUser(e.id)}>
                  <img src={btnD} alt="Delete" />
                </Button>
                <Button onClick={() => openEditModal(e)}>
                  <img src={btnE} alt="Edit" />
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6" sx={{ color: "red", textAlign: "center", marginTop: "20px" }}>Not Found</Typography>
      )}

      <Dialog open={isModalOpen} onClose={closeModal}>
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h5">Add New Note</Typography>
          <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ marginBottom: "10px" }} />
          <TextField label="Description" fullWidth variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button onClick={saveNote} variant="contained" sx={{ backgroundColor: "black", marginTop: "10px" }}>Save Note</Button>
          <Button onClick={closeModal} variant="outlined" color="secondary" sx={{ marginLeft: "10px", marginTop: "10px" }}>Close</Button>
        </Box>
      </Dialog>

      <Dialog open={isEditModalOpen} onClose={closeEditModal}>
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h5">Edit Note</Typography>
          <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ marginBottom: "10px" }} />
          <TextField label="Description" fullWidth variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button onClick={updateUser} variant="contained" sx={{ backgroundColor: "black", marginTop: "10px" }}>Update Note</Button>
          <Button onClick={closeEditModal} variant="outlined" color="secondary" sx={{ marginLeft: "10px", marginTop: "10px" }}>Close</Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default TodoList;
