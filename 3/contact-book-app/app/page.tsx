"use client";
import { useState, useEffect } from "react";

type Contacts = {
  id: number;
  name: string;
  location: string;
};

function getContactsCookie() {
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((cookie) => cookie.includes("contacts"));
  if (cookie) {
    return JSON.parse(cookie.split("=")[1]);
  }
  return [];
}

function setContactsCookie(contacts: Contacts[]) {
  document.cookie = `contacts=${JSON.stringify(contacts)}`;
}

export default function Home() {
  const [contacts, setContacts] = useState<Contacts[]>([]);

  useEffect(() => {
    setContacts(getContactsCookie());
  }, []);

  useEffect(() => {
    setContactsCookie(contacts);
  }, [contacts]);

  const createContact = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name: string = form.personname.value;
    const location: string = form.location.value;
    const id = contacts.length + 1;
    setContacts([...contacts, { id, name, location }]);
  };

  const deleteContact = (id: number) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };
  return (
    <div>
      <h1>Create Contact</h1>
      <form onSubmit={createContact}>
        <label>
          Name:
          <input type="text" name="personname" />
        </label>
        <label>
          Location:
          <input type="text" name="location" />
        </label>
        <button type="submit">Create</button>
      </form>

      <h1>Contacts</h1>
      {contacts.map((contact: Contacts) => (
        <div key={contact.id}>
          <p>Name: {contact.name}</p>
          <p>City: {contact.location}</p>
          <button type="button" onClick={() => deleteContact(contact.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
