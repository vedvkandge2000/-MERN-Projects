import React, {useState} from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {

  const [isExpanded, setIsExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setNote(preNote => {
      return {
        ...preNote,
        [name]: value
      };
    });
  }

  function handleClick(event) {
    props.onAdd(note);
    setNote({ title: "", content: "" });
    event.preventDefault();
  }

  function handleExpand(){
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note">

      {isExpanded && <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={note.title} /> 
      }

        <textarea
          onChange={handleChange}
          onClick={handleExpand}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={note.content}>
          </textarea>

        <Zoom in={isExpanded}>
          <Fab onClick={handleClick}><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
