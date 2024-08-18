import './Profile.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardText } from "reactstrap";
import Api from "./Api";
import PkmnCard from "./PkmnCard";
import Modal from "./Modal"; // Import the Modal component

function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (!user) navigate("/register");
  }, []);

  useEffect(() => {
    const fetchCardData = async () => {
      if (user && user.collection && user.collection.length > 0) {
        let data = {
          cards: user.collection,
        };
        try {
          const cards = await Api.getBatchCards(data);
          setCardData(cards);
        } catch (error) {
          console.error("Failed to fetch cards:", error);
        }
      }
      setIsLoading(false);
    };

    fetchCardData();
  }, [user]);

  const handleOpenModal = (card) => {
    setSelectedCard(card); // Set the clicked card as the selected card
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCard(null); // Clear the selected card when modal is closed
  };

  const handleDeleteCard = async (id) => {
    await Api.deleteFromCollection(user.username, id);
    let token = user.token;
    let refreshedUser = await Api.getUser(user.username);
    refreshedUser.token = token;
    setUser(refreshedUser);
    handleCloseModal();
    window.location.reload();
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <section className="profile-section">
      <Card className="profile-card">
        <CardBody>
          <CardText>
            <h2 className="profile-username">{user.username}</h2>
          </CardText>
        </CardBody>
      </Card>
      <hr className="profile-divider" />
      <h2 className="profile-collection-title">Collection</h2>
      {cardData && cardData.length > 0 ? (
        <div className="profile-card-grid">
          {cardData.map((item, index) => (
            <PkmnCard
              onClick={() => handleOpenModal(item.data)} // Pass the clicked card to handleOpenModal
              key={item.data.id || index}
              data={item.data}
              className="profile-pkmn-card"
            />
          ))}
        </div>
      ) : (
        <p className="profile-no-cards">No cards in collection!</p>
      )}
      <Modal show={showModal} onClose={handleCloseModal}>
        {selectedCard ? (
          <>
            <img
              src={selectedCard.images.small}
              alt={selectedCard.name}
              className="profile-modal-image"
            />
            <div className="profile-modal-text">
              <h2 className="profile-modal-title">{selectedCard.name}</h2>
              <p className="flavortext">{selectedCard.flavorText}</p>
              <p className="profile-modal-rarity">Set: {selectedCard.set.name}</p>
              <p className="profile-modal-rarity">Rarity: {selectedCard.rarity}</p>
              <p className="profile-modal-rarity">Average Price: ${selectedCard.cardmarket.prices.averageSellPrice}</p>
              <button onClick={() => handleDeleteCard(selectedCard.id)}>
                  Remove From Collection
                </button>
            </div>
          </>
        ) : (
          <p>No card selected!</p>
        )}
      </Modal>
    </section>
  );
}

export default Profile;
