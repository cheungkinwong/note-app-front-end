import React, { useState, useEffect } from "react";
import axios from "axios";
const Notes = () => {
     const [notesJson, setNotes] = useState([]);

     useEffect(() => {
          async function fetchData() {
               axios.get("http://127.0.0.1//exercise/becode-database-api/list_note.php").then(res => {
                    setNotes(res.data.notes);
                    console.log(res.data);
               });
          }
          fetchData();
     }, []);

     return (
          <div className="board">
               {notesJson.map(item => (
                    <div key={item.title + item.author + item.last_updated} className="sticky">
                         <div className="button">
                              <button className="edit" onClick={editNote.bind(this, item.title, item.author, item.last_updated)}>
                                   <i class="far fa-edit"></i>
                              </button>
                              <button className="delete" onClick={deleteNote.bind(this, item.title, item.author, item.last_updated)}>
                                   <i class="far fa-trash-alt"></i>
                              </button>
                         </div>
                         <div className="content">
                              <div className="title">{item.title}</div>
                              <div className="note">{item.note}</div>
                         </div>
                         <div className="editor">
                              <div className="author">{item.author}</div>
                              <div className="last_updated">{item.last_updated}</div>
                         </div>
                    </div>
               ))}
          </div>
     );
};

const deleteNote = (title, author, updated) => {
     if (window.confirm("Are you sure you want to delete this note?")) {
          axios.delete(`http://localhost/exercise/becode-database-api/delete_note.php?last_updated=${updated}&title=${title}&author=${author}`).then(res => {
               console.log(res.data, "lol");
          });
     }
};

const editNote = (title, author, updated) => {
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
};
export default Notes;
