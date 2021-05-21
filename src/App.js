import './App.css';
import { useState } from 'react';
import GuestList from './GuestList';
import UserInputs from './UserInputs';

function App() {
  // declare state variables
  const [firstNameInput, setFirstNameInput] = useState(null);
  const [lastNameInput, setLastNameInput] = useState(null);
  const [attendanceInput, setAttendanceInput] = useState(false);
  const [allGuests, setAllGuests] = useState([]);
  const [userIsStale, setUserIsStale] = useState(true);

  const baseUrl = 'http://localhost:5000';

  return (
    <>
      <header className="App">
        <h1>
          <span role="img" aria-label="waving hand">
            👋
          </span>{' '}
          Welcome friend. This is my React Guest List!
        </h1>
      </header>
      <body className="App">
        <UserInputs
          firstNameInput={firstNameInput}
          lastNameInput={lastNameInput}
          setFirstNameInput={setFirstNameInput}
          setLastNameInput={setLastNameInput}
          attendanceInput={attendanceInput}
          setAttendanceInput={setAttendanceInput}
          setUserIsStale={setUserIsStale}
        />
        <br />
        <GuestList
          allGuests={allGuests}
          setAllGuests={setAllGuests}
          userIsStale={userIsStale}
          setUserIsStale={setUserIsStale}
          baseUrl={baseUrl}
        />
      </body>
    </>
  );
}

export default App;