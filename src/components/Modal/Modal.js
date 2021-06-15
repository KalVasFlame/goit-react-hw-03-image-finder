import React, { Component } from "react"

export default class Modal extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="Overlay">
        <div className="Modal">{children}</div>
      </div>
    )
  }
}
