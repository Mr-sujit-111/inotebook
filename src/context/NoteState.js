import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const baseUrl = "http://localhost:5000";
  const token = localStorage.getItem("token");
  const allNotes = [];
  const [notes, setNotes] = useState(allNotes);
  const [profileImage, setProfileImage] = useState("");
  const [data, setData] = useState("");
  const getAllNotes = async () => {
    var url = baseUrl + "/api/notes/list";
    const response = await fetch(url, {
      method: "GET",
      headers: { token: token },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add note //
  const addNewNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call
    let url = baseUrl + "/api/notes/addNote";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete note using its id //
  const deleteNote = async (id) => {
    // fetch API for delete note from mongodb //
    var url = baseUrl + "/api/notes/deleteNote/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit existing note //
  const editNote = async (id, title, description, tag) => {
    let url = baseUrl + "/api/notes/updateNote/" + id;
    // API Call
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // get registerd users data //
  const avatarUrl = (data) => {
    setProfileImage(data.avatar_url);
    localStorage.setItem("image", data.avatar_url);
  };

  // get loggied users data //
  const loginUser = (loginData) => {
    setProfileImage(loginData.user.avatar);
    localStorage.setItem("image", loginData.user.avatar);
    setData(loginData);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNewNote,
        deleteNote,
        getAllNotes,
        editNote,
        profileImage,
        avatarUrl,
        loginUser,
        data,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
