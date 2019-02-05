import React, { Component } from 'react';
import PictureHeader from './PictureHeader';
import PictureInfo from './PictureInfo';
import PictureUpdates from './PictureUpdates';

export default class Picture extends Component {
  render() {
    return (
          <div className="foto">
            <PictureHeader picture={this.props.picture} />
            <img alt="foto" className="foto-src" src={this.props.picture.urlFoto} />
            <PictureInfo picture={this.props.picture} />
            <PictureUpdates picture={this.props.picture} />
          </div>
    );
  }
}
