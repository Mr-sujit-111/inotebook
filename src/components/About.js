import React from 'react';
import { useContext } from 'react';
import NoteContext from '../context/noteContext';

export default function About() {
  const noteStatedata  = useContext(NoteContext)
  return (
    <div>
      <h3>This is About section</h3>
      <h6>My name is {noteStatedata.name } and this is my email: {noteStatedata.email}</h6>
    </div>
  )
}
