/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Style element via CSS-in-JS
const divStyles = css`
  display: flex;
  justify-content: center;
`;

const inputStyles = css`
  margin: 10px 30px 30px 30px;
  height: 30px;
  width: 200px;
  border-radius: 20px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  background-color: lightyellow;
  text-align: center;
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
    const response = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
      }),
    });
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
      <>
        <div css={divStyles}>
          <label htmlFor="firstName">
            First name:
            <br />
            <input
              id="firstName"
              placeholder="Jane"
              value={firstNameInput}
              onChange={(event) => {
                setFirstNameInput(event.currentTarget.value);
              }}
              css={inputStyles}
            />
            <br />
          </label>

          <label htmlFor="lastName">
            Last name:
            <br />
            <input
              id="lastName"
              placeholder="Doe"
              value={lastNameInput}
              onChange={(event) => {
                setLastNameInput(event.currentTarget.value);
              }}
              css={inputStyles}
            />
          </label>
          <br />
        </div>
        <div>
          <button onClick={submitInput}>Add guest</button>
        </div>
      </>
    );
  }
}

export default UserInputs;
