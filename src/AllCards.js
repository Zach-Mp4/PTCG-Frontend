import React, { useState, useEffect } from "react";
import Api from "./Api";
import PkmnCard from "./PkmnCard";
import Modal from "./Modal";
import "./AllCards.css"; // Import the CSS file

function AllCards({ user }) {
  const [AllCards, setAllCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenModal = (card) => {
    console.log(card);
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCard(null);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleAddtoCollection = (id) => {
    Api.addCardtoCollection(user.username, id, 1);
    user.collection.push(id);
    handleCloseModal();
  };

  useEffect(() => {
    const fetchCardData = async () => {
      setIsLoading(true);
      try {
        const cards = await Api.getAllCards(page);
        setAllCards(cards);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCardData();
    }, 250);

    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    const fetchCardData = async () => {
      setIsLoading(true);
      try {
        const cards = await Api.getCardsByName(searchQuery);
        setAllCards(cards);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery !== "") {
      const timer = setTimeout(() => {
        fetchCardData();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  return (
    <section className="all-cards-container">
      <h2 className="all-cards-header">All Cards</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a card"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <button
          className="pagination-button"
          onClick={handlePrevPage}
          disabled={page === 1 || searchQuery !== ""}
        >
          Prev
        </button>
        {page}
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={searchQuery !== ""}
        >
          Next
        </button>
      </div>
      {isLoading ? (
        <p>Loading cards...</p>
      ) : AllCards && AllCards.length > 0 ? (
        <div className="cards-container">
          {AllCards.map((item, index) => (
            <PkmnCard
              onClick={() => handleOpenModal(item)}
              key={item.id || index}
              data={item}
            />
          ))}
        </div>
      ) : (
        <p>No cards found! Try searching something else or try again later!</p>
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
              {user && !user.collection.some(card => card === selectedCard.id) && (
                <button onClick={() => handleAddtoCollection(selectedCard.id)}>
                  Add to Collection
                </button>
              )}
            </div>
          </>
        ) : (
          <p>No card selected!</p>
        )}
      </Modal>
    </section>
  );
}

export default AllCards;
