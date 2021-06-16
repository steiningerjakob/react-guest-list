import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import GuestList from './GuestList';
import UserInputs from './UserInputs';

const headerStyles = css`
  justify-content: center;
  margin-bottom: 20px;
  background-color: #c0c0c0;
  border-radius: 2px;
`;

const userInputSection = css`
  width: 350px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  margin-left: 20px;
  margin-right: 140px;
  background-color: #fafafa;
  border-radius: 10px;
`;

function App() {
  // declare state variables
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [allGuests, setAllGuests] = useState([]);
  const [userIsStale, setUserIsStale] = useState(true);

  const baseUrl = 'https://jst-react-guest-list.herokuapp.com';

  return (
    <>
      <header className="App" css={headerStyles}>
        <h1>
          <span role="img" aria-label="waving hand">
            👋
          </span>{' '}
          Welcome friend. This is my React Guest List!
        </h1>
      </header>
      <div className="App">
        <section css={userInputSection}>
          <h1>Add new guest</h1>
          <UserInputs
            firstNameInput={firstNameInput}
            lastNameInput={lastNameInput}
            setFirstNameInput={setFirstNameInput}
            setLastNameInput={setLastNameInput}
            userIsStale={userIsStale}
            setUserIsStale={setUserIsStale}
            allGuests={allGuests}
          />
        </section>
        <section>
          <h1>Guest List</h1>
          <GuestList
            allGuests={allGuests}
            setAllGuests={setAllGuests}
            userIsStale={userIsStale}
            setUserIsStale={setUserIsStale}
            baseUrl={baseUrl}
          />
        </section>
        <br />
      </div>
    </>
  );
}

export default App;
