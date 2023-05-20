import React from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();

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
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard();
  }


  return (

    <body className="page">
    <Header />
    <Main
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
    />
    <Footer />
    <PopupWithForm
    name = {`name`}
    title = {`Редактировать профиль`}
    buttonText = {`Сохранить`}
    isOpen = {isEditProfilePopupOpen}
    onClose = {closeAllPopups}
    >
            <input id="name" name="name" type="text" className="popup__item" placeholder="Имя" required minLength="2" maxLength="40"/>
            <span className='popup__input-error popup__input-error_active popup__input-error_type_name' id="name-error"></span>
            <input id="about" name="about" type="text" className="popup__item" placeholder="Дополнительно" minLength="2" maxLength="200" required/>
            <span className='popup__input-error popup__input-error_active popup__input-error_type_about' id="about-error"></span>
    </PopupWithForm>
    <PopupWithForm
    name = {`add-place`}
    title = {`Новое место`}
    buttonText = {`Создать`}
    isOpen = {isAddPlacePopupOpen}
    onClose = {closeAllPopups}
    >
           <input id="place" name="place" type="text" className="popup__item" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className='popup__input-error popup__input-error_active popup__input-error_type_place' id="place-error"></span>
            <input id="link" name="link" type="url" className="popup__item" placeholder="Ссылка на картинку" required/>
            <span className='popup__input-error popup__input-error_active popup__input-error_type_link' id="link-error"></span>
    </PopupWithForm>
    <PopupWithForm
    name = {`avatar`}
    title = {`Обновить аватар`}
    buttonText = {`Сохранить`}
    isOpen = {isEditAvatarPopupOpen}
    onClose = {closeAllPopups}
    >
            <input id="avatar" name="avatar" type="url" className="popup__item" placeholder="Ссылка" minLength="2" maxLength="130" required/>
            <span className='popup__input-error popup__input-error_active popup__input-error_type_avatar' id="avatar-error"></span>
    </PopupWithForm>
    <ImagePopup
    card = {selectedCard}
    onClose = {closeAllPopups}
    >
    </ImagePopup>
</body>

  );
}

export default App;
