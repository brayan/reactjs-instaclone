import React, { Component } from 'react';

export default class PictureInfo extends Component {
  render() {
    return (
            <div className="foto-info">
              <div className="foto-info-likes">

              {
                  this.props.picture.likers.map(liker => {
                    return <a href="#">{liker.login},</a>
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
                    return (<li className="comentario">
                                 <a className="foto-info-autor">{comentario.login} </a>
                    {comentario.texto}
                  </li>)
                  })
              }
                
              </ul>
            </div>
    );
  }
}
