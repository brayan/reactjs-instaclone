import React, { Component } from 'react';
import Picture from './Picture';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TimelineAPI from '../api/TimelineAPI';
import { connect } from 'react-redux';

class Timeline extends Component {

  /*constructor() {
    super();
     this.longin = this.props.login;
  }*/

  componentDidMount() {
    this.loadPictures(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.login) {
      this.login = nextProps.loadPictures;
      this.loadPictures(nextProps);
    }
  }

  loadPictures(props) {
    let urlPerfil;

    if (this.props.login === undefined) {
      urlPerfil = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${props.login}`;
    }
    this.props.loadPicturesFromDispatch(urlPerfil);
  }

  render() {
    return (
      <div className="fotos container">
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.props.pictures.map(picture => <Picture picture={picture} onLikePicture={this.props.onLikePicture} onSubmitComment={this.props.onSubmitComment} />)
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLikePicture: (pictureId) => {
      dispatch(TimelineAPI.onLikePicture(pictureId));
    },
    onSubmitComment: (pictureId, comment) => {
      dispatch(TimelineAPI.onSubmitComment(pictureId, comment));
    },
    loadPicturesFromDispatch: (urlPerfil) => {
      dispatch(TimelineAPI.loadPictures(urlPerfil));
    }
  };
}

const mapStateToProps = state => {
  return { pictures: state.timeline };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);