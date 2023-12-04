import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import { useCallback, useEffect, useState } from "react";
import api from '../utils/Api.js';
import CurrentUserContext from '../context/CurentUserContext.js';
import PopupAvatar from './PopupAvatar.jsx';
import PopupPlace from './PopupPlace.jsx';
import PopupProfile from './PopupProfile.jsx';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setAvataPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup ] = useState(false)
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false)
  const [currentUser, setCurrentUser] =useState({})
  const [cards, setCards] = useState([])
  const [deleteCard, setDeleteCard] = useState('')

  const setStateCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsPlacePopupOpen(false)
    setAvataPopupOpen(false)
    setImagePopup(false)
    setDeletePopupOpen(false)
  },[])

  const closePopupByEsc = useCallback ((evt) => {
    if (evt.key === 'Escape') {
      setStateCloseAllPopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  },[setStateCloseAllPopups])

  const closeAllPopups = useCallback(() => {
    setStateCloseAllPopups()
    document.removeEventListener('keydown', closePopupByEsc)
  },[setStateCloseAllPopups, closePopupByEsc])

  function setEventListenerForDocument() {
    document.addEventListener('keydown', closePopupByEsc)
  }


  function handleProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerForDocument()
  }

  function handlePlaceClick() {
    setIsPlacePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleAvatarClick() {
    setAvataPopupOpen(true)
    setEventListenerForDocument()
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopup(true)
    setEventListenerForDocument()
  }

  function handleDelete(cardId) {
    setDeleteCard(cardId)
    setDeletePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((e) => (e._id === card._id ? newCard : e))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect (() => {
    Promise.all([api.getName(), api.getCards()])
      .then(([userData, dataCards]) => {
        setCurrentUser(userData)
        setCards(dataCards)
      })
    .catch((error) => console.error(`Ошибка начальных данных${error}`))
  }, [])

  function handleCardDelete(evt) {
    evt.preventDefault()
    api.deleteCard(deleteCard)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCard
        }))
        closeAllPopups()
      })
    .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
  }

  function handleUpdateUser(userData, reset) {
    api.editProfileInfo(userData)
      .then((res )=> {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
    .catch((error) => console.error(`Ошибка профиля ${error}`))
  }

  function handleUpdateAvatar(userData, reset) {
    api.setNewAvatar(userData)
      .then((res )=> {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
    .catch((error) => console.error(`Ошибка аватара ${error}`))
  }

  function handleAddPlaceSubmit(userData, reset) {
    api.addCard(userData)
      .then((newCard )=> {
        setCards([newCard, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка карточки ${error}`))
  }


  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">


      <Header />

      <Main
        onEditProfile = {handleProfileClick}
        onAddPlace ={handlePlaceClick}
        onEditAvatar = {handleAvatarClick}
        onCardClick = {handleCardClick}
        onDelete = {handleDelete}
        onCardLike={handleCardLike}
        cards = {cards}
      />

      <Footer />

      <PopupProfile 
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupPlace 
      onAddPlace = {handleAddPlaceSubmit}
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
      />
      
      <PopupAvatar 
       onUpdateAvatar={handleUpdateAvatar}
       isOpen = {isEditAvatarPopupOpen}
       onClose = {closeAllPopups}
      />

        <PopupWithForm 
          name='delete' 
          title='Вы уверены?'
          titleButton='Да'
          isOpen = {isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <ImagePopup 
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
        /> 
    </div>
  </CurrentUserContext.Provider>
  )
}

export default App
