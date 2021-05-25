import { useEffect, useState } from 'react';

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

  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/`);
      const data = await response.json();
      setAllGuests(data);
      setFilteredGuests(data);
      setUserIsStale(!userIsStale);
    }
    if (userIsStale) fetchGuests();
  }, [userIsStale]);

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

  // filter event handlers for buttons
  // change from attending to non-attending not working

  function filterAttendingGuests() {
    setFilteredGuests(
      filteredGuests.filter((guest) => guest.attending === true),
    );
  }

  function filterNotAttendingGuests() {
    setFilteredGuests(
      filteredGuests.filter((guest) => guest.attending === false),
    );
  }

  function resetToAllGuests() {
    setFilteredGuests(allGuests);
  }

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
    <div>
      <div>
        <ul>
          {filteredGuests.map((guest) => {
            return (
              <li key={guest.id}>
                {editingId === guest.id ? (
                  <>
                    <input
                      value={newName}
                      onChange={(event) =>
                        setNewName(event.currentTarget.value)
                      }
                    />
                    <button
                      onClick={() => {
                        setNewName(newName);
                        updateGuestName(guest);
                      }}
                    >
                      Save name
                    </button>
                  </>
                ) : (
                  `${guest.firstName} ${guest.lastName} `
                )}
                <button
                  onClick={() => {
                    setEditingId(guest.id);
                    setNewName(`${guest.firstName} ${guest.lastName}`);
                  }}
                >
                  Edit name
                </button>
                <label htlmFor="attendance">
                  .......... Attendance:{' '}
                  {guest.attending === true ? 'Yes' : 'No'}
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
                  >
                    Change attendance
                  </button>
                </label>
                <button
                  onClick={async () => {
                    await fetch(`http://localhost:5000/${guest.id}`, {
                      method: 'DELETE',
                    });
                    setUserIsStale(!userIsStale);
                  }}
                >
                  Remove guest
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {allGuests.length === 0 ? (
          'No guests entered yet...'
        ) : (
          <>
            <br />
            <button onClick={filterAttendingGuests}>Attending</button>
            <button onClick={filterNotAttendingGuests}>Not attending</button>
            <button onClick={resetToAllGuests}>Show all guests</button>
            <br />
            <br />
            <button onClick={clearGuestList}>Clear guest list</button>
          </>
        )}
      </div>
    </div>
  );
}
