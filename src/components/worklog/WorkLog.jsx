import { useState } from "react";

function today(){
    return new Date().toISOString().split("T")[0];
}

function WorkLog(){
    
    const [formData, setFormData] = useState({
        workoutType: "",
        duration: "",
        date: today()
    });

    function handleChange(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(formData);
        // Here you can add code to send the formData to a server or store it in local storage
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Workout Type:
                    <input type="text" name="workoutType" value={formData.workoutType} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Duration (minutes):
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Log Workout</button>
            </form>
        </>
    )
}

export default WorkLog;