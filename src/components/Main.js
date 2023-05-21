import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';
import iconEdit from '../images/icon1.svg';
import iconAdd from '../images/icon2.svg';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const data = api.getProfile();
    data.then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
    })
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const data = api.getCards();
    data.then((cardsData) => {
      setCards(cardsData)
    })
    .catch(err => console.log(err));
  }, [])


    return (
      <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar">
            <img className="profile__image" src={userAvatar} alt="Аватар" onClick={props.onEditAvatar}/>
          </div>
          <div className="profile__info">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__additional">{userDescription}</p>
              <button type="button" className="profile__edit-button">
                <img className="profile__edit-icon" src={iconEdit} alt="Редактировать" onClick={props.onEditProfile}/>
              </button>
          </div>
            <button type="button" className="profile__add-button">
              <img className="profile__add-icon" src={iconAdd} alt="Добавить" onClick={props.onAddPlace}/>
            </button>
        </section>
        <section className="cards">

        {cards.map((card, _id) => (
            <Card
              key={card._id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
            />
          ))}

        </section>
      </main>
      </>
    );
}

  export default Main;
