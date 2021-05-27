/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Style element via CSS-in-JS
const divStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const inputStyles = css`
  margin: 30px;
  height: 30px;
  width: 200px;
  border-radius: 20px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  background-color: lightyellow;
  text-align: center;
`;

const addButton = css`
  background-color: #fafafa;
  border: none;
  font-size: 1.7em;
  max-width: 100px;
  margin-top: 20px;
  position: absolute;
  top: 100%;
  right: 45%;

  :hover {
    transform: scale(1.5);
  }
`;

function UserInputs({
  firstNameInput,
  setFirstNameInput,
  lastNameInput,
  setLastNameInput,
  userIsStale,
  setUserIsStale,
  allGuests,
}) {
  async function createNewGuest() {
    const response = await fetch(
      'https://jst-react-guest-list.herokuapp.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstNameInput,
          lastName: lastNameInput,
        }),
      },
    );
    const createdGuest = await response.json();
    console.log(createdGuest);
  }

  function submitInput() {
    setFirstNameInput(firstNameInput);
    setLastNameInput(lastNameInput);
    setUserIsStale(!userIsStale);
    createNewGuest();
  }

  if (allGuests === undefined) {
    return <>Fetching guest list...</>;
  } else {
    return (
      <div css={divStyles}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            id="firstName"
            placeholder="First name"
            value={firstNameInput}
            onChange={(event) => {
              setFirstNameInput(event.currentTarget.value);
            }}
            css={inputStyles}
          />
          <input
            id="lastName"
            placeholder="Last name"
            value={lastNameInput}
            onChange={(event) => {
              setLastNameInput(event.currentTarget.value);
            }}
            css={inputStyles}
          />
          <button onClick={submitInput} css={addButton}>
            <span role="img" aria-label="add">
              ➡️
            </span>
          </button>
        </form>
      </div>
    );
  }
}

export default UserInputs;
