import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <div className="cards__item" key={props._id}>
      <img className="cards__image" src={props.link} alt="" id="btnImage" onClick={handleClick}/>
      <button type="button" className="cards__trash-button" id="btnDelete"></button>
      <div className="cards__description">
        <h2 className="cards__name">{props.name}</h2>
        <button type="button" className="cards__like-button" id="btnLike"></button>
        <p className="cards__like-number">{props.likes}</p>
      </div>
    </div>
)
}

export default Card;
