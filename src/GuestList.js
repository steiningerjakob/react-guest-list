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
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/`);
      setAllGuests(await response.json());
      console.log(allGuests);
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

  // filter event handlers - not yet working

  function filterAttending() {
    setFilter('Attending');
    const attendingGuests = allGuests.filter(
      (guest) => guest.attending === true,
    );
    setAllGuests(attendingGuests);
    setUserIsStale(!userIsStale);
  }

  function filterNotAttending() {
    setFilter('Not Attending');
    const notAttendingGuests = allGuests.filter(
      (guest) => guest.attending === false,
    );
    setAllGuests(notAttendingGuests);
    setUserIsStale(!userIsStale);
  }

  function filterAllGuests() {
    setFilter('All');
    setAllGuests(allGuests);
    setUserIsStale(!userIsStale);
  }

  return (
    <div>
      <h1>Guest List</h1>
      <div>
        <ul>
          {allGuests.map((guest) => {
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
            <button onClick={filterAttending}>Attending</button>
            <button onClick={filterNotAttending}>Not attending</button>
            <button onClick={filterAllGuests}>Show all guests</button>
            <br />
            <br />
            <button onClick={clearGuestList}>Clear guest list</button>
          </>
        )}
      </div>
    </div>
  );
}
