import Searchbar from "./components/Searchbar/Searchbar"

import React, { Component } from "react"
import ImageGallery from "./components/ImageGallery"
import ServiseApi from "./service/ImageApi"
import Button from "./components/Button"
import Modal from "./components/Modal"

export default class App extends Component {
  state = {
    query: "",
    page: 1,
    perPage: 12,
    pictures: [],
    loader: false,
    currentPictures: "",
    openModal: false,
  }

  OnLoadMore = () => {
    this.setState((prev) => ({
      page: prev.page + 1,
    }))
  }

  toggleModal = () => {
    this.setState((prev) => ({
      openModal: !prev.openModal,
    }))
  }

  onImgClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return
    }
    this.setState({
      currentPictures: e.target.dataset.img,
    })
    this.toggleModal()
  }

  fetchPictures = () => {
    const settings = {
      query: this.state.query,
      page: this.state.page,
      perPage: this.state.perPage,
    }
    this.setState({ loader: true })
    return ServiseApi.getImages(settings).then((hits) => {
      this.setState((prev) => ({
        pictures: [...prev.pictures, ...hits],
      }))
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page, pictures } = this.state
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchPictures()
        .then(() => {
          if (pictures.length > 10) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            })
          }
        })
        .finally(
          this.setState({
            loader: false,
          })
        )
    }
  }

  onSubmit = (searchQuery) => {
    this.setState({
      query: searchQuery,
      page: 1,
      pictures: [],
    })
  }

  render() {
    const { pictures, query, loader, openModal, currentPictures } = this.state
    return (
      <div className="App">
        <Searchbar value={query} onFormSubmit={this.onSubmit} />
        <ImageGallery pictures={pictures} onImgClick={this.onImgClick} />
        {pictures.length > 0 && <Button onBtnClick={this.OnLoadMore} text={loader ? "Загружаем" : "Загрузить еще"} />}

        {openModal && (
          <Modal>
            <img src={currentPictures} alt="Dont Worry Be Happy" />
          </Modal>
        )}
      </div>
    )
  }
}
