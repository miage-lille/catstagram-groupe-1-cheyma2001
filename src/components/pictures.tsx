import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { picturesStateSelector, counterSelector } from '../reducer'; 
import { selectPicture, fetchCatsRequest } from '../actions';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: 200px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Pictures = () => {
  const dispatch = useDispatch();
  const picturesState = useSelector(picturesStateSelector); // ✅ Utiliser `picturesState`
  const counter = useSelector(counterSelector);

  useEffect(() => {
    console.log(`🔄 Chargement des images pour ${counter} chats...`);
    dispatch(fetchCatsRequest(counter));
  }, [dispatch, counter]);

 
  if (picturesState.status === "loading") {
    return <Message>🔄 Chargement des images...</Message>;
  }

 
  if (picturesState.status === "failure") {
    return <Message>❌ Erreur : {picturesState.error}</Message>;
  }

  if (picturesState.status === "success") {
    return (
      <Container>
        {picturesState.pictures.length === 0 ? (
          <Message>🙀 Aucune image trouvée.</Message>
        ) : (
          picturesState.pictures.map((picture, index) => ( // ✅ Utilisation correcte de `.map()`
            <Image
              key={index}
              src={picture.previewFormat}
              alt={`Cat by ${picture.author}`}
              onClick={() => {
                console.log("🖼️ Image sélectionnée :", picture);
                dispatch(selectPicture(picture)); 
              }}
            />
          ))
        )}
      </Container>
    );
  }

  return null; 
};

export default Pictures;
