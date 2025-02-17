import React, { useState } from 'react';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { algoliaConfig } from '../config/algoliaConfig';
import Modal from './Modal';
import './styles/searchbar.css';

const SearchBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSearchStateChange = ({ query }) => {
    if (query) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };

  return (
    <div className="search-bar-container">
      <InstantSearch
        searchClient={algoliaConfig.searchClient}
        indexName={algoliaConfig.indexName}
        onSearchStateChange={handleSearchStateChange}
      >
        <SearchBox />
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <Hits hitComponent={Hit} />
          </Modal>
        )}
      </InstantSearch>
    </div>
  );
};

const Hit = ({ hit }) => (
  <div>
    <img src={hit.image} alt={hit.name} className="product-image" />
    <h4 className="product-title">{hit.title}</h4>
    <p className="product-price">{hit.price}</p>
  </div>
);

export default SearchBar;