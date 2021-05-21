import { useEffect } from 'react';

export default function GuestList({
  allGuests,
  setAllGuests,
  userIsStale,
  setUserIsStale,
  baseUrl,
}) {
  function clearGuestList() {
    allGuests.length = 0;
    setAllGuests(allGuests);
    return allGuests;
  }

  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/`);
      setAllGuests(await response.json());
      console.log(allGuests);
      setUserIsStale(false);
    }
    if (userIsStale) fetchGuests();
  }, [userIsStale]);

  if (allGuests === undefined) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h1>Guest List</h1>
      <ul>
        {allGuests.map((guest) => {
          return (
            <li key={guest.id}>
              {`Guest ${guest.id}: ${guest.firstName} ${guest.lastName} - ${guest.attending}`}
              <button>Remove guest [work in progress]</button>
            </li>
          );
        })}
      </ul>
      <button onClick={clearGuestList}>
        Clear guest list [work in progress]
      </button>
    </div>
  );
}
