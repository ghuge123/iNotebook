import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { ThemeContext } from '../context/ThemeContext';

function NoteItem({ note , update , showAlert}) {
    const context = useContext(NoteContext);
    const {deleteNote , editNote} = context;

    const {dark} = useContext(ThemeContext);

    return (
        <div className='col-md-3 my-3'>
            <div className={`card ${dark?`bg-dark border border-light-subtle`:`bg-light border`}`}>
                    <div className="card-body">
                        <h5 className="card-title " style={{color: dark?'white':'black'}}>{note.title}</h5>
                        <p className="card-text " style={{color: dark?'white':'black'}}>{note.description}</p>
                        <i className="fa-solid fa-trash mx-2 " style={{cursor:'pointer' , color: dark?'white':'black'}} onClick={()=>{deleteNote(note._id); showAlert("Note Deleted Successfully" , "success");}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2 " style={{cursor:'pointer' ,color: dark?'white':'black' }} onClick={()=>{update(note)}}></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
