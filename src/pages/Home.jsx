import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Modal } from '../components/Modal';
import axios from 'axios';

import { NoteCard } from '../components/NoteCard';
import { useAuth } from '../context/ContextProvider';

export const Home = () => {
  
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
 

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const deleteNode = async (id) => {
    try {
      const response = await axios.delete(`https://notes-app-backend-aiys.onrender.com/api/note/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        fetchNotes();
      }
    } catch (error) {
      console.log("Error in deleting note:", error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(`https://notes-app-backend-aiys.onrender.com/api/note/${id}`, { title, description }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        fetchNotes();
        setModalOpen(false);
        setCurrentNote(null);
      }
    } catch (error) {
      console.log("Error in editing note:", error);
    }
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post("https://notes-app-backend-aiys.onrender.com/api/note/add", { title, description }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        fetchNotes();
        setModalOpen(false);
        setCurrentNote(null);
      }
    } catch (error) {
      console.log("Error in adding note:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("https://notes-app-backend-aiys.onrender.com/api/note", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotes(data.notes);
      setFilteredNotes(data.notes);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col ">
      {/* Navbar */}
      <Navbar setQuery={setQuery} />
  
      {/* Notes Container */}
      <div className="container  px-4 mt-6">
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNotes.map((note, index) => (
              <NoteCard key={index} note={note} onEdit={onEdit} deleteNode={deleteNode} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg mt-10 text-center">No Notes</p>
        )}
      </div>
  
      {/* Add Button */}
      { user && <button 
        onClick={() => setModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none"
      >
        Add
      </button>}
  
      {/* Modal */}
      {isModalOpen && (
        <Modal addNote={addNote} setModalOpen={setModalOpen} currentNote={currentNote} editNote={editNote} />
      )}
    </div>
  );
  
};
