import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App(){

    const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(preNotes => {
      return [...preNotes, newNote];
    });
  }

  function handleDelete(id) {
    setNotes(preNotes => {
      return preNotes.filter((note, index) => {
        return index !== id;
      });
    });
  }

    return(
    <div>
        <Header />  
        <CreateArea onAdd={addNote} />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={handleDelete}
        />
      ))}
        <Footer />
    </div>
    );
}

export default App;