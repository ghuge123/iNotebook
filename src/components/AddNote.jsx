import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

function AddNote({showAlert}) {
    const context = useContext(NoteContext);
    const {addNotes} = context;
    
    const [note , setNote] = useState({title:"" , description:"" , tag:""});
    let navigate = useNavigate();

    const handleClick = (e)=>{
        e.preventDefault();
        addNotes(note.title , note.description , note.tag);
        setNote({title:"" , description:"" , tag:""});
        navigate('/');
        showAlert("Note Added Successfully" , "success");
    }

    const onChange = (e)=>{
    
        setNote({...note , [e.target.name] : e.target.value}); // whatewere is change is set to there name
    }

  return (
    <div className='container my-3'>
      <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor='title' className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} minLength={5} required></input>
                </div>
                <div className="mb-3">
                    <label htmlFor='Description' className="form-label">Description</label>
                    <input type="text" className="form-control" id="Description" name="description" value={note.description} onChange={onChange}minLength={5} required></input>
                </div>
                <div className="mb-3">
                    <label htmlFor='tag' className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} minLength={3} required></input>
                </div>
                <button className='btn btn-dark' disabled={note.title.length<5 || note.description.length<5 || note.tag<3} onClick={handleClick}>submit</button>
            </form>
    </div>
  )
}

export default AddNote
