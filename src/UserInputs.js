/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

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
// const baseUrl = 'http://localhost:5000';
let guestID = 0;

// Capture user input on top & bottom text and image, and change variable state accordingly
// Pass state to other components via destructured props
function UserInputs({
  firstNameInput,
  setFirstNameInput,
  lastNameInput,
  setLastNameInput,
  attendanceInput,
  setAttendanceInput,
}) {
  const [allGuests, setAllGuests] = useState([]);

  function submitInput() {
    setFirstNameInput(firstNameInput);
    setLastNameInput(lastNameInput);
    setAttendanceInput(attendanceInput);
    const newAllGuests = allGuests.concat({
      id: guestID,
      firstName: firstNameInput,
      lastName: lastNameInput,
      attending: attendanceInput,
    });
    guestID = guestID + 1;
    setAllGuests(newAllGuests);
  }

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
        <button onClick={submitInput}>Submit</button>
      </div>
      <div>
        {allGuests.map((guest) => {
          return (
            <p key={`Guest-${guest.id}`}>
              {`Guest ${guest.id}: ${guest.firstName} ${guest.lastName}`}
              <label htmlFor="attendance">
                <span>..............</span>Attending:
                <input
                  type="checkbox"
                  value={setAttendanceInput}
                  defaultChecked={true}
                  onChange={(event) => {
                    setAttendanceInput(event.currentTarget.value);
                  }}
                />
              </label>
              <button>Remove guest</button>
            </p>
          );
        })}
      </div>
    </>
  );
}

export default UserInputs;
