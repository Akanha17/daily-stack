import { useState, useEffect } from "react";
import "./WorkLog.css";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth } from "../../firebase";

function today() {
    return new Date().toISOString().split("T")[0];
}

function WorkLog() {
    const userid = auth.currentUser ? auth.currentUser.uid : null;

    const [formData, setFormData] = useState({
        workoutType: "",
        duration: "",
        date: today()
    });
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        async function fetchLogs(){
            const querySnapshot = await getDocs(query(collection(db, "workouts"), where("userId", "==", userid)));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLogs(data);
        }
        fetchLogs();
    }, [userid]);

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        console.log('user', userid);
        event.preventDefault();
        console.log(formData);
        const docRef = await addDoc(collection(db, 'workouts'), {...formData, userId: userid});
        // setLogs([...logs, formData]);
        setLogs([...logs, { id: docRef.id, ...formData }]);
        setFormData({ workoutType: "", duration: "", date: today() });
    }

    async function handleDelete(id) {
        await deleteDoc(doc(db, "workouts", id));
        setLogs(logs.filter((log) => log.id !== id));
    }

    return (
        <div className="worklog-container">
            <h2>⚔️ Quest Log</h2>
            <form className="worklog-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Workout Type</label>
                    <input type="text" name="workoutType" value={formData.workoutType} onChange={handleChange} placeholder="e.g. Running, Gym, Cycling" />
                </div>
                <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 30" />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <button type="submit" className="submit-btn">⚡ Log Workout</button>
            </form>

            <div className="logs-list">
                {logs.map((log, index) => (
                    <div key={index} className="log-item">
                        <div className="log-info">
                            <p>💪 {log.workoutType}</p>
                            <span>{log.duration} mins • {log.date}</span>
                        </div>
                        <button className="delete-btn" onClick={() => handleDelete(log.id)}>✕ Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkLog;