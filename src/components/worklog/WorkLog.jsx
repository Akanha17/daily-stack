import { useState } from "react";
import "./WorkLog.css";

function today() {
    return new Date().toISOString().split("T")[0];
}

function WorkLog() {

    const [formData, setFormData] = useState({
        workoutType: "",
        duration: "",
        date: today()
    });
    const [logs, setLogs] = useState([]);

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        console.log("Submitting form...");

        event.preventDefault();
        console.log(formData);
        setLogs([...logs, formData]);
        setFormData({ workoutType: "", duration: "", date: today() });
    }

    function handleDelete(index) {
        setLogs(logs.filter((_, i) => i !== index));
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
                        <button className="delete-btn" onClick={() => handleDelete(index)}>✕ Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkLog;