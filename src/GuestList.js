// ToDo's:
// - give buttons on bottom conditional formatting (see example)
// - maybe put entry fields elsewhere?

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const guestListSection = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const guestListContainer = css`
  width: 600px;
  background-color: #fafafa;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  padding: 10px;
  position: relative;
`;

const guestContainer = css`
  max-width: 1000px;
  border-bottom: 1px solid #dcdcdc;
  padding: 5px 10px;
  text-align: left;
  position: relative;
  display: flex;
  line-height: 15px;
`;

const attendanceButton = css`
  background-color: #fafafa;
  border: none;
  margin-right: 10px;
  margin-left: 8px;

  :hover {
    transform: scale(1.5);
  }
`;

const removerButton = css`
  background-color: #fafafa;
  border: none;
  position: absolute;
  right: 2%;
  margin-right: 10px;

  :hover {
    transform: scale(1.5);
  }
`;

const editButton = css`
  background-color: #fafafa;
  border: none;
  position: absolute;
  right: 10%;
  margin-right: 10px;

  :hover {
    transform: scale(1.5);
  }
`;

const radioButton = css`
  background-color: white;
  border: 1px solid #dcdcdc;
  margin-left: 30px;

  :hover {
    transform: scale(1.5);
  }
`;

export default function GuestList({
  allGuests,
  setAllGuests,
  userIsStale,
  setUserIsStale,
  baseUrl,
}) {
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState();
  const [filteredGuests, setFilteredGuests] = useState(allGuests);
  // Trying to derive state - not yet working
  // let filterNew = [...allGuests];

  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/`);
      const data = await response.json();
      setAllGuests(data);
      setFilteredGuests(data);
      setUserIsStale(!userIsStale);
    }
    if (userIsStale) fetchGuests();
  });

  if (allGuests === undefined) {
    return <>Loading...</>;
  }

  async function updateGuestName(guest) {
    await fetch(`http://localhost:5000/${guest.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: newName.split(' ')[0],
        lastName: newName.split(' ')[1],
      }),
    });
    setUserIsStale(!userIsStale);
    setEditingId(null);
  }

  // filter event handlers for radio buttons

  function filterGuests(event) {
    if (event.target.value === 'Attending') {
      setFilteredGuests(allGuests.filter((guest) => guest.attending === true));
    } else if (event.target.value === 'Not attending') {
      setFilteredGuests(allGuests.filter((guest) => guest.attending === false));
    } else {
      setFilteredGuests(allGuests);
    }
  }

  // Trying to derive state - not yet working

  // function filterGuestsNew(event) {
  //   if (event.target.value === 'Attending') {
  //     filterNew = allGuests.filter((guest) => guest.attending === true);
  //   } else if (event.target.value === 'Not attending') {
  //     filterNew = allGuests.filter((guest) => guest.attending === false);
  //   } else {
  //     filterNew = [...allGuests];
  //   }
  //   return filterNew;
  // }

  // map over original array and delete all elements - see also:
  // https://dev.to/askrishnapravin/for-loop-vs-map-for-making-multiple-api-calls-3lhd
  async function clearGuestList() {
    setAllGuests(
      allGuests.map(async (guest) => {
        await fetch(`http://localhost:5000/${guest.id}`, {
          method: 'DELETE',
        });
      }),
    );
    setUserIsStale(!userIsStale);
  }

  return (
    <div css={guestListSection}>
      <div css={guestListContainer}>
        {filteredGuests.map((guest) => {
          return (
            <p key={guest.id} css={guestContainer}>
              {editingId === guest.id ? (
                <>
                  <input
                    value={newName}
                    onChange={(event) => setNewName(event.currentTarget.value)}
                  />
                  <button
                    onClick={() => {
                      setNewName(newName);
                      updateGuestName(guest);
                    }}
                    css={attendanceButton}
                  >
                    <span role="img" aria-label="update">
                      🔄
                    </span>
                  </button>
                </>
              ) : (
                <div>
                  <button
                    onClick={async () => {
                      await fetch(`http://localhost:5000/${guest.id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          attending: !guest.attending,
                        }),
                      });
                      setUserIsStale(!userIsStale);
                    }}
                    css={attendanceButton}
                  >
                    {guest.attending === true ? (
                      <span role="img" aria-label="checkmark">
                        ✅
                      </span>
                    ) : (
                      <span role="img" aria-label="cross mark">
                        ❌
                      </span>
                    )}
                  </button>
                  <span className={guest.attending.toString()}>
                    {guest.firstName} {guest.lastName}
                  </span>
                  <button
                    onClick={() => {
                      setEditingId(guest.id);
                      setNewName(`${guest.firstName} ${guest.lastName}`);
                    }}
                    css={editButton}
                  >
                    <span role="img" aria-label="edit">
                      ✏️
                    </span>
                  </button>
                </div>
              )}
              <button
                onClick={async () => {
                  await fetch(`http://localhost:5000/${guest.id}`, {
                    method: 'DELETE',
                  });
                  setUserIsStale(!userIsStale);
                }}
                css={removerButton}
              >
                <span role="img" aria-label="crossed out">
                  🗑️
                </span>{' '}
              </button>
            </p>
          );
        })}
      </div>
      <br />
      <div>
        {allGuests.length === 0 ? (
          'No guests entered yet...'
        ) : (
          <>
            <br />
            <div onChange={filterGuests}>
              <input
                type="radio"
                name="filter"
                value="Attending"
                css={radioButton}
              />
              Attending
              <input
                type="radio"
                name="filter"
                value="Not attending"
                css={radioButton}
              />
              Not attending
              <input
                type="radio"
                name="filter"
                value="All"
                defaultChecked
                css={radioButton}
              />
              Show all guests
            </div>
            <br />
            <button onClick={clearGuestList}>Clear guest list</button>
          </>
        )}
      </div>
    </div>
  );
}
