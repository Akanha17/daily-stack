import { useState } from 'react';
import WorkLog from './components/Worklog/WorkLog.jsx';
import StudyLog from './components/studylog/StudyLog.jsx';
import './App.css';
import Journal from './components/journal/Journal.js';
import Auth from './components/authentication/Auth.js';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.js';

function App(){
  const [activeTab, setActiveTab] = useState('workout');
  const [user, setUser] = useState(null);

  if(!user){
    return (<Auth setUser={setUser}/>)
  }
  async function handleLogout() {
    await signOut(auth);
    setUser(null);
  }
  return (
    <div>
      <h1>Daily Stack</h1>
      <div className='tabs'>
        <button className={activeTab === 'workout' ? 'active tab' : 'tab'} onClick={() => setActiveTab('workout')}>⚔️ Workout</button>
        <button className={activeTab === 'study' ? 'active tab' : 'tab'} onClick={() => setActiveTab('study')}>📚 Study</button>
        <button className={activeTab === 'journal' ? 'active tab' : 'tab'} onClick={() => setActiveTab('journal')}>📓 Journal</button>
      </div>
      {activeTab === 'workout' && <WorkLog />}
      {activeTab === 'study' && <StudyLog />}
      {activeTab === 'journal' && <Journal />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default App;