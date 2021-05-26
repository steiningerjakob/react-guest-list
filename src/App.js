import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import GuestList from './GuestList';
import UserInputs from './UserInputs';

const headerStyles = css`
  justify-content: center;
  margin-bottom: 15px;
  background-color: #c0c0c0;
`;

const userInputSection = css`
  min-width: 350px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  margin-left: 15px;
  margin-right: 140px;
  background-color: #fafafa;
`;

function App() {
  // declare state variables
  const [firstNameInput, setFirstNameInput] = useState(null);
  const [lastNameInput, setLastNameInput] = useState(null);
  const [allGuests, setAllGuests] = useState([]);
  const [userIsStale, setUserIsStale] = useState(true);

  const baseUrl = 'http://localhost:5000';

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
      <body className="App">
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
      </body>
    </>
  );
}

export default App;
