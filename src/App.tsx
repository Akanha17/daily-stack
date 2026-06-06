import { useState } from 'react';
import WorkLog from './components/Worklog/WorkLog.jsx';
import StudyLog from './components/studylog/StudyLog.jsx';
import './App.css';

function App(){
  const [activeTab, setActiveTab] = useState('workout');

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
    </div>
  )
}

export default App;