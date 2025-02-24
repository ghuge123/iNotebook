import  { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import { useNavigate , Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function Notes({ showAlert }) {
    const context = useContext(NoteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login');
        }
    }, []);

    const {dark} = useContext(ThemeContext);

    const ref = useRef(null);
    const refClose = useRef(null);
    const update = (note) => {
        setNote(note);
        ref.current.click();
    }

    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

    const handleClick = (e) => {
        editNote(note._id, note.title, note.description, note.tag);
        refClose.current.click();
        showAlert("Note upadated Successfully", "success");
    }

    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value }); // whatewere is change is set to there name
    }

    return (
        <div className='row'>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{backgroundColor: dark?'rgb(27, 28, 28)':''}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{color: dark?'white':'black'}}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor='title' className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} style={{backgroundColor: dark?'black':'white' , color: dark?'white':'black'}} required></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='Description' className="form-label">Description</label>
                                    <input type="text" className="form-control" id="Description" name="description" value={note.description} onChange={onChange} style={{backgroundColor: dark?'black':'white', color: dark?'white':'black'}} minLength={5} required></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='tag' className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={3} style={{backgroundColor: dark?'black':'white' , color: dark?'white':'black'}} required></input>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" disabled={note.title.length < 5 || note.description.length < 5 || note.tag < 3} onClick={handleClick}>Update Note</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <h2>Your Notes</h2>
            &nbsp;{notes.length == 0 ? 'Please add a Note' : notes.map((note) => {
                return <NoteItem key={note._id} update={update} note={note} showAlert={showAlert} />;
            })}

            <Link
                to="/addnote" // Change this if you're using a modal
                style={{
                    backgroundColor: '#FFBF00',
                    height: '50px',
                    width: '50px',
                    borderRadius: '50%',
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                    textDecoration: 'none'
                }}
                className="add"
            >
                <i className="fa-solid fa-plus" style={{color:'white'}}></i>
            </Link>

        </div>
    )
}

export default Notes
