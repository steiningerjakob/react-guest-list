import { useEffect, useState } from 'react';

export default function GuestList({ guestList, setGuestList }) {
  // API URL
  const baseUrl = 'http://localhost:5000';

  const [userIsStale, setUserIsStale] = useState(true);

  // fetch guest list from baseURL
  useEffect(() => {
    async function fetchGuestList() {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      setGuestList(allGuests);

      setUserIsStale(false);
    }
    if (userIsStale) fetchGuestList();
  }, [userIsStale]);

  if (!guestList?.results) {
    return <>Loading...</>;
  }
}
