import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PictureHeader extends Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.picture.urlPerfil} alt="foto do usuario" />
          <figcaption className="foto-usuario">
            <Link to={`/timeline/${this.props.picture.loginUsuario}`}>{this.props.picture.loginUsuario}</Link>
          </figcaption>
        </figure>
        <time className="foto-data">{this.props.picture.horario}</time>
      </header>
    );
  }
}
