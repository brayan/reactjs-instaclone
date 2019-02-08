import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PictureInfo extends Component {

  componentWillMount() {
    console.log("Hello from PictureInfo");
    console.log(this.props);
  }

  render() {
    return (
            <div className="foto-info">
              <div className="foto-info-likes">
              {
                  this.props.picture.likers.map(liker => {
                    return <Link key={liker.login} to={`/timeline/${liker.login}`}>{liker.login},</Link>
                  })
              }

                 curtiram
             
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                {this.props.picture.comentario}
              </p>

              <ul className="foto-info-comentarios">
              {
                  this.props.picture.comentarios.map(comentario => {
                    return (<li className="comentario" key={comentario.id}>
                                 <Link className="foto-info-autor" to={`/timeline/${comentario.login}`}>{comentario.login} </Link>
                    {comentario.texto}
                  </li>)
                  })
                }
                
              </ul>
            </div>
    );
  }
}
