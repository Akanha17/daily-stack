import { useState, useEffect } from 'react';
import './journal.css';
import { db } from '../../firebase';
import { collection, addDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { auth } from '../../firebase';


function today(){
    return new Date().toISOString().split("T")[0]
}
function Journal() {
    const userid = auth.currentUser ? auth.currentUser.uid : null;

    const moods = ['Good 😊', 'Okay 👌🏻', 'Bad 😔'];
    const [formData, setFormData] = useState({
        mood: 'Good 😊',
        entry: '',
        date: today()
    })
    const [journalEntries, setJournalEntries] = useState([]);

    function handleChange(event){
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault();
        const docRef = await addDoc(collection(db, 'journalEntries'), {...formData, userId: userid});
        setJournalEntries([...journalEntries, {id:docRef.id, ...formData}]);
        setFormData({
            mood: 'Good 😊',
            entry: '',
            date: today()
        })
    }
    useEffect(() => {
        async function fetchEntries(){
            const entriesCollection = query(collection(db, 'journalEntries'), where('userId', '==', userid));
            const entriesSnapshot = await getDocs(entriesCollection);
            const entriesList = entriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJournalEntries(entriesList);
        }
        fetchEntries();
    }, [userid])

    async function handleDelete(id){
        await deleteDoc(doc(db, 'journalEntries', id));
        setJournalEntries(journalEntries.filter(entry => entry.id !== id));
    }

    return (
        <div className="container">
            <h1>Journal 📝</h1>
            <form className='journal-form form' onSubmit={handleSubmit}> 
                <div className="form-group">
                    <label>Mood </label>
                    <select >
                        {moods.map((mood, index) => (
                            <option key={index} value={mood} onChange={handleChange}>
                                {mood}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Entry </label>
                    <textarea name='entry' placeholder='what happened today' value={formData.entry} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Date </label>
                    <input name="date" type="date" value={formData.date} onChange={handleChange} />
                </div>
                <button type="submit">Add Entry</button>
            </form>
            <div className="logs-list">
                {journalEntries.map((log, index) => (
                    <div key={index} className="log-item">
                        <div className="log-info">
                            <p>{log.mood} Mood</p>
                            <p>{log.entry}</p>
                            <p>📅 {log.date}</p>
                        </div>
                        <button className="delete-btn" onClick={() => handleDelete(log.id)}>🗑️ Delete</button>
                    </div>)
                )}
            </div>
        </div>
    )
}

export default Journal;