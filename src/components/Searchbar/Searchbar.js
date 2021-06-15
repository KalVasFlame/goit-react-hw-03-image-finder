import React, { Component } from "react"
// import PropTypes from "prop-types"

export default class Searchbar extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  state = {
    searchQuery: "",
  }

  onSearchInputChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    })
  }

  onSearchFromSubmit = (e) => {
    e.preventDefault()

    this.props.onFormSubmit(this.state.searchQuery)
    this.setState({ searchQuery: "" })
  }

  render() {
    const { searchQuery } = this.state
    return (
      <div>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.onSearchFromSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              value={searchQuery}
              onChange={this.onSearchInputChange}
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    )
  }
}
