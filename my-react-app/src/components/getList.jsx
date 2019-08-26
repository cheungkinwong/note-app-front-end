import React, { useState, useEffect } from "react";
import axios from "axios";
const Notes = () => {
     const [hasError, setErrors] = useState(false);
     const [notesJson, setNotes] = useState([]);

     useEffect(() => {
          async function fetchData() {
               axios.get("http://127.0.0.1//exercise/becode-database-api/list_note.php")
                    .then(res => {
                         setNotes(res.data.notes);
                    })
                    .catch(err => {
                         setErrors(err);
                    });
          }
          fetchData();
     }, []);

     return (
          <div className="notes">
               {notesJson.map(item => (
                    <div key={item.title + item.author + item.last_updated}>
                         title:{item.title} author:{item.author} note:{item.note}
                         <button className="delete" onClick={deleteNote.bind(this, item.title, item.author, item.last_updated)}>
                              Delete
                         </button>
                         <button className="edit" onClick={editNote.bind(this, item.title, item.author, item.last_updated)}>
                              edit
                         </button>
                    </div>
               ))}
          </div>
     );
};
function deleteNote(title, author, updated) {
     if (window.confirm("Are you sure you want to delete this note?")) {
          axios.delete(`http://localhost/exercise/becode-database-api/delete_note.php?last_updated=${updated}&title=${title}&author=${author}`).then(res => {
               console.log(res.data, "lol");
          });
     }
}
function editNote(title, author, updated) {
     var prompt = window.prompt("edit note", "new entry");
     if (prompt === null || prompt === "") {
          alert("Cancelled edit");
     } else {
          const promptData = new FormData();
          promptData.set("note", prompt);
          axios({
               method: "post",
               url: `http://localhost/exercise/becode-database-api/update_note.php?last_updated=${updated}&title=${title}&author=${author}`,
               data: promptData,
               config: {
                    headers: { "Content-Type": "multipart/form-data" }
               }
          }).then(res => {
               console.log(res.data);
          });
     }
}

export default Notes;
