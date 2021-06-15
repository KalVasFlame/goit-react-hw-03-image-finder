import React from "react"
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem"

const ImageGallery = ({ pictures, onImgClick }) => (
  <ul className="ImageGallery" onClick={onImgClick}>
    {pictures.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem key={id} src={webformatURL} largeImg={largeImageURL} />
    ))}
  </ul>
)

export default ImageGallery
