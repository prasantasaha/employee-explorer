import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Combobox, ComboboxInput } from '@reach/combobox';
import '@reach/combobox/styles.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Explorer.scss';

const Explorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const showOverview = (employeeName: string) => {
    if (employeeName) {
        history.push(`${process.env.PUBLIC_URL}/overview/${employeeName}`);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      showOverview(searchTerm);
    }
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="explorer">
      <h4 id="title">Employee Explorer</h4>
      <div className="search_container">
        <Combobox aria-labelledby="title" className="search_input">
          <ComboboxInput
            placeholder="Search"
            onChange={handleSearchTermChange}
            onKeyUp={handleKeyUp}
          />
        </Combobox>
        <button
          className="search_button"
          onClick={() => {
            showOverview(searchTerm);
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default Explorer;
