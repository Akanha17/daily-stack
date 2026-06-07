import { useState, useEffect } from 'react'
import "./StudyLog.css"
import { db } from "../../firebase"
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";


function today() {
    return new Date().toISOString().split("T")[0];
}
function StudyLog() {
    const [formData, setFormData] = useState({
        studyType: "",
        duration: "",
        notes: "",
        date: today()
    })

    const [logs, setLogs] = useState([])

    useEffect(() => {
        async function fetchLogs(){
            const querySnapshot = await getDocs(collection(db, "studies"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setLogs(data);
        }
        fetchLogs();
    }, [])

    function handleChange(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    async function handleSubmit(event){
        event.preventDefault();
        // setLogs([...logs, formData]);
        const docRef = await addDoc(collection(db, 'studies'), formData);
        setLogs([...logs, { id: docRef.id, ...formData }]);
        setFormData({ studyType: "", duration: "", notes: "", date: today() });
    }
    async function handleDelete(id){
        await deleteDoc(doc(db, "studies", id));
        setLogs(logs.filter((obj) => obj.id !== id));
    }
    return (
        <div className="studylog-container container">
            <h2>📚 Study Log</h2>
            <form className="studylog-form form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Study Type</label>
                    <input type="text" name="studyType" value={formData.studyType} placeholder="e.g. Math, Science, History" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" name="duration" value={formData.duration} placeholder="e.g. 60" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Notes</label>
                    <textarea name="notes" value={formData.notes} placeholder="Any additional notes..." onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <button type="submit" className="submit-btn">⚡ Log Study Session</button>
            </form>

            <div className="logs-list">
                {logs.map((log, index) => (
                    <div key={index} className="log-item">
                        <div className="log-info">
                            <p>📖 {log.studyType}</p>
                            <p>⏱️ {log.duration} minutes</p>
                            <p>📅 {log.date}</p>
                        </div>
                        <button className="delete-btn" onClick={() => handleDelete(log.id)}>🗑️ Delete</button>
                    </div>)
                )}
            </div>
        </div>
    )
}

export default StudyLog