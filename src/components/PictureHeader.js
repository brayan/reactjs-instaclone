import React, { Component } from 'react';

export default class PictureHeader extends Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.picture.urlPerfil} alt="foto do usuario" />
          <figcaption className="foto-usuario">
            <a href="#">{this.props.picture.loginUsuario}</a>
          </figcaption>
        </figure>
        <time className="foto-data">{this.props.picture.horario}</time>
      </header>
    );
  }
}
