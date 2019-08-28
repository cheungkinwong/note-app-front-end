import React, { useState } from "react";
import axios from "axios";
const useSubmitForm = () => {
     const [inputs, setInputs] = useState({ title: "", author: "", note: "" });
     const handleInputChange = event => {
          event.persist();
          setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
     };

     const handleSubmit = event => {
          event.preventDefault();
          const data = new FormData(event.target);
          axios({
               method: "post",
               url: `http://localhost/exercise/becode-database-api/add_note.php`,
               data: data
          }).then(res => {
               console.log(res.data);
          });
     };

     return (
          <div className="AddNote">
               <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor="title" className="title">
                         Title:
                         <br />
                         <input name="title" onChange={handleInputChange} value={inputs.title} required />
                    </label>
                    <br />
                    <label htmlFor="author" className="title">
                         Author:
                         <br />
                         <input name="author" onChange={handleInputChange} value={inputs.author} required />
                    </label>
                    <br />
                    <label htmlFor="note" className="title">
                         Note:
                         <br />
                         <textarea name="note" onChange={handleInputChange} value={inputs.note} required />
                    </label>
                    <br />
                    <input type="submit" id="submitBtn" />
               </form>
          </div>
     );
};
export default useSubmitForm;
