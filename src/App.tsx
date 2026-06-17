import { useState, useEffect } from 'react';
import WorkLog from './components/Worklog/WorkLog.jsx';
import StudyLog from './components/studylog/StudyLog.jsx';
import './App.css';
import Journal from './components/journal/Journal.js';
import Auth from './components/authentication/Auth.js';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('workout');

  async function handleLogout() {
    await signOut(auth);
    setUser(null);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Auth setUser={setUser} />;
  return (
    <div>
      <h1>Daily Stack</h1>
      <div className='tabs'>
        <button className={activeTab === 'workout' ? 'active tab' : 'tab'} onClick={() => setActiveTab('workout')}>⚔️ Workout</button>
        <button className={activeTab === 'study' ? 'active tab' : 'tab'} onClick={() => setActiveTab('study')}>📚 Study</button>
        <button className={activeTab === 'journal' ? 'active tab' : 'tab'} onClick={() => setActiveTab('journal')}>📓 Journal</button>
      </div>
      {activeTab === 'workout' && <WorkLog  />}
      {activeTab === 'study' && <StudyLog />}
      {activeTab === 'journal' && <Journal />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default App;