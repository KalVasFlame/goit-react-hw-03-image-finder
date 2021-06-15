import React from "react"

const Button = ({ onBtnClick, text }) => (
  <button type="button" onClick={onBtnClick}>
    {text}
  </button>
)

export default Button
