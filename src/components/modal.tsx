import styled from 'styled-components';
import ReactDOM from 'react-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedPicture } from '../reducer';
import { closeModal } from '../actions';
import { isNone, getOrElse } from 'fp-ts/Option'; // ✅ Import des fonctions pour gérer Option
import { Picture } from '../types/picture.type';

const Container = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 50px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  position: absolute;
  top: 15px;
  right: 35px;
  color: white;
  font-size: 40px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 80%;
  max-height: 80%;
  border-radius: 8px;
`;

const Modal = () => {
  const pictureSelected = useSelector(getSelectedPicture);
  const dispatch = useDispatch();

  if (isNone(pictureSelected)) {
    return null;
  }

  const picture = getOrElse<Picture>(() => ({
    previewFormat: '',
    webFormat: '',
    author: '',
    largeFormat: '',
  }))(pictureSelected);


  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.src !== picture.previewFormat) {
      img.src = picture.previewFormat;
    }
  };

  const modalContent = (
    <Container>
      <Button onClick={() => dispatch(closeModal())}>X</Button>
      <Image 
        src={picture.largeFormat} 
        onError={handleImageError}
        alt={`Photo par ${picture.author}`} 
      />
      
    </Container>
  );

  const portalRoot = document.getElementById('modal');
  return portalRoot ? ReactDOM.createPortal(modalContent, portalRoot) : null;
};

export default Modal;