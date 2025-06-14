import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

function BookingTracker() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    (async () => {
      // 1. Get all accounts
      const accountsSnap = await getDocs(collection(db, "accounts"));
      const accounts = [];

      for (const doc of accountsSnap.docs) {
        const account = { id: doc.id, ...doc.data() };
        // 2. Count booking for each account in current year
        const thisYear = new Date().getFullYear();
        const bookingSnap = await getDocs(
          query(collection(db, "bookings"), where("accountId", "==", account.id))
        );

        const bookingCount = bookingSnap.docs.filter((item) =>
          new Date(item.data().date).getFullYear() === thisYear
        ).length;

        account.booked = bookingCount;
        account.remaining = Math.max(0, 3 - bookingCount);

        accounts.push(account);
      }

      setAccounts(accounts);
    })();
  }, []);

  async function addBooking(accountId) {
    const today = new Date().toUTCString();

    await addDoc(collection(db, "bookings"), {
      accountId,
      date: today,
    });

    // Reload after adding booking
    window.location.reload();
  }

  return (
    <div>
      <h2>Booking Summary</h2>
      <ul>
        {accounts.map((acc) => (
          <li key={acc.id}>
            {acc.name} — {acc.booked} booked, {acc.remaining} remaining
            <button onClick={() => addBooking(acc.id)} disabled={acc.remaining <= 0}>
              {acc.remaining <= 0 ? "No booking left" : "Add Booking"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingTracker;
