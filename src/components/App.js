import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const data = api.getProfile();
    data.then((userData) => {
      setCurrentUser(userData)
    }).catch(err => console.log(err));
  }, [])

  useEffect(() => {
    const data = api.getCards();
    data.then((cardsData) => {
      setCards(cardsData)
    }).catch(err => console.log(err));
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => console.log(err))
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => console.log(err))
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
        setCards(cards.filter(item => item !== card))
      }).catch((err) => console.log(err))
  }

  function handleUpdateUser(data) {
    api.editProfile(data.name, data.about).then((user) => {
          setCurrentUser(user);
          closeAllPopups();
      }).catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.setNewAvatar(data.avatar).then((newAvatar) => {
            setCurrentUser(newAvatar);
            closeAllPopups();
        }).catch((err) => console.log(err))
}

  function handleAddPlaceSubmit(data) {
    api.sendCard(data.name, data.link).then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        }).catch((err) => console.log(err))
      }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }


  return (
  <CurrentUserContext.Provider value={currentUser}>
    <body className="page">
    <Header />
    <Main
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      cards={cards}
    />
    <Footer />
    <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
    />
    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleAddPlaceSubmit}
    />
    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleUpdateAvatar}
    />
    <ImagePopup
      card = {selectedCard}
      onClose = {closeAllPopups}
    />
    </body>
  </CurrentUserContext.Provider>
  );
}

export default App;
