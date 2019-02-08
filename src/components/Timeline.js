import React, { Component } from 'react';
import Picture from './Picture';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Timeline extends Component {

  constructor() {
    super();
    this.state = { pictures: [] };
  }

  componentWillMount() {
    PubSub.subscribe('timeline', (topic, pictures) => {
      this.setState({ pictures });
    });

    PubSub.subscribe('update-liker', (topic, infoLiker) => {
      const pictureFound = this.state.pictures.find(picture => picture.id === infoLiker.pictureId);
      pictureFound.likeada = !pictureFound.likeada;

      const possibleLiker = pictureFound.likers.find(liker => liker.login === infoLiker.liker.login);

      if (possibleLiker === undefined) {
        pictureFound.likers.push(infoLiker.liker);
      } else {
        const newLikers = pictureFound.likers.filter(liker => liker.login !== infoLiker.liker.login);
        pictureFound.likers = newLikers;
      }

      this.setState({ pictures: this.state.pictures });

    });

    PubSub.subscribe('new-comments', (topic, infoComment) => {
      const pictureFound = this.state.pictures.find(picture => picture.id === infoComment.pictureId);
      pictureFound.comentarios.push(infoComment.newComment);
      this.setState({ pictures: this.state.pictures });
    });
  }

  componentDidMount() {
    this.loadPictures(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadPictures(nextProps);
  }

  loadPictures(props) {
    let urlPerfil;

    if (props.login === undefined) {
      urlPerfil = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${props.login}`;
    }

    fetch(urlPerfil)
      .then(response => response.json(urlPerfil))
      .then(pictures => {
        this.setState({ pictures: pictures });
      });
  }

  onLikePicture(pictureId) {
    fetch(`https://instalura-api.herokuapp.com/api/fotos/${pictureId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Não foi possível realizar o like da foto");
        }
      })
      .then(liker => {
        PubSub.publish('update-liker', { pictureId, liker });
      });
  }

  onSubmitComment(pictureId, comment) {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ texto: comment }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch(`https://instalura-api.herokuapp.com/api/fotos/${pictureId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Não foi possível realizar o comentário na foto");
        }
      })
      .then(newComment => {
        PubSub.publish('new-comments', { pictureId, newComment });
      });
  }





  render() {
    return (
      <div className="fotos container">
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.state.pictures.map(picture => <Picture picture={picture} onLikePicture={this.onLikePicture} onSubmitComment={this.onSubmitComment} />)
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }


}
