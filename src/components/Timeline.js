import React, { Component } from 'react';
import Picture from './Picture';

export default class Timeline extends Component {

  constructor() {
    super();
    this.state = { pictures: [] };
  }

  componentDidMount() {
    this.loadPictures();
  }

  loadPictures() {
    fetch("https://instalura-api.herokuapp.com/api/public/fotos/rafael")
      .then(response => response.json())
      .then(pictures => {
        this.setState({ pictures: pictures });
      });
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.pictures.map(picture => <Picture picture={picture} />)
        }
      </div>
    );
  }


}
