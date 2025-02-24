import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { data } from "react-router-dom";

const NoteState = (props)=>{
  const host = 'http://localhost:5000'
    const notesInitial = [];
    const [notes , setNote] = useState(notesInitial);

    //get all Note
    const getNotes = async()=>{
      // API calls
      const url = `${host}/api/notes/fetchallnotes`;
      const response = await fetch(url , {
        method:'GET',
        headers :{
          'Content-Type' : 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
      })
      const json = await response.json();
      setNote(json);
    }
    //Add Note
    const addNotes = async(title , description , tag)=>{
      // API calls
      const url = `${host}/api/notes/addnote`;
      const response = await fetch(url , {
        method:'POST',
        headers :{
          'Content-Type' : 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        body : JSON.stringify({title , description , tag})
      })
      const json = await response.json();
        setNote(notes.concat(json));
    }
    //delete Note
    const deleteNote = async(id)=>{
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url , {
        method:'DELETE',
        headers :{
          'Content-Type' : 'application/json',
          'auth-token' : localStorage.getItem('token')
        }
      })
      const json = await response.json();
        const newNote = notes.filter((note)=>{
          return note._id != id;
        })
        setNote(newNote);
    }
    //edit Note
    const editNote = async (id , title , description , tag)=>{
      // API calls
      const url = `${host}/api/notes/updatenote/${id}`;
      const response = await fetch(url , {
        method:'PUT',
        headers :{
          'Content-Type' : 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        body : JSON.stringify({title , description , tag})
      })
      const json = await response.json();
      const newNote = JSON.parse(JSON.stringify(notes));

        for(let i=0; i<newNote.length; i++){
          const element = newNote[i];
          if(element._id == id){
            element.title = title;
            element.description = description;
            element.tag = tag;
            break;
          }
        }
        setNote(newNote);
    }

    return(
        <NoteContext.Provider value={{notes , addNotes , deleteNote , editNote , getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;