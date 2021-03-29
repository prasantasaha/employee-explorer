import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Combobox, ComboboxInput } from '@reach/combobox';
import '@reach/combobox/styles.css';
import { useHistory } from 'react-router-dom';
import './Explorer.scss';

const Explorer = () => {
  const history = useHistory();

  const showOverview = (employeeName: string) => {
    history.push(`${process.env.PUBLIC_URL}/overview/${employeeName}`);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      showOverview((event.target as HTMLInputElement).value);
    }
  };
  return (
    <div className="explorer">
      <h4 id="title">Employee Explorer</h4>
      <div className="search_container">
        <Combobox aria-labelledby="title" className="search_input">
          <ComboboxInput
            placeholder="Search"
            onKeyUp={(event) => {
              handleKeyUp(event);
            }}
          />
        </Combobox>
        <button className="search_button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default Explorer;
