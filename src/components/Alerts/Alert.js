import React from 'react'
import { useAlert } from 'react-alert'
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const MyAlert = () => {
  const alert = useAlert()

  

  return (
    <button
      onClick={() => {
        alert.show('Oh look, an alert!')
      }}
    >
      Show Alert
    </button>
  )
}

export default MyAlert