import React, { useEffect } from 'react';
import './Me.css'; 
// import type { User } from './types';
import { useUser } from './UseUser';
import { useNavigate } from 'react-router-dom';

function Me() {
    const {user} = useUser();
    // const {checkAuth, setCheckAuth} = useState(true);
    const navigate = useNavigate();

    useEffect(() =>{
        if(user === null){
            navigate('/')
        }
    }, [user, navigate])
    
    const handleToggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const toggleIcon = document.getElementById('toggleIcon');
        const mainContainer = document.querySelector('.main-container')

        sidebar?.classList.toggle('collapsed');
        mainContainer?.classList.toggle('sidebar-collapsed');
        toggleIcon?.classList.toggle('')

        if (sidebar && toggleIcon) {
            toggleIcon.textContent = sidebar.classList.contains('collapsed') ? '→' : '←';
        }
    }

    return(
        <div className='main-container'>
            <div className='dashboard-header'>
                <div className='header-row'>
                    <h1 className='dashboard-title'>How Are You Feeling Today?</h1>
                    <div className='user-info'>
                        <span className="user-name">Welcome back, {user?.user_name || 'null'}</span>
                        <div className='user-avatar'>a</div>
                    </div>
                </div>
                <p className='dashboard-subtitle'>Reflect your memory</p>
            </div>

        <div className='content-wrapper'>
            <div className='sidebar' id='sidebar'>
                <div className='sidebar-item-back' onClick={handleToggleSidebar} id="toggleIcon">←</div>

                <div className='sidebar-item'>
                    <div className='sidebar-icon'>📚</div>
                    <div className='sidebar-text'>Log</div>
                </div>
                <div className='sidebar-item'>
                    <div className='sidebar-icon'>👥</div>
                    <div className='sidebar-text'>Mood Cirlce</div>
                    <div className='notification-badge'>3</div>
                </div>
                <div className='sidebar-item'>
                    <div className='sidebar-icon'>📊</div>
                    <div className='sidebar-text'>Mood Insight</div>
                </div>
                <div className='sidebar-item'>
                    <div className='sidebar-icon'>🎯</div>
                    <div className='sidebar-text'>Mood Quest</div>
                </div>
                <div className='sidebar-item'>
                    <div className='sidebar-icon'>⚙️</div>
                    <div className='sidebar-text'>Setting</div>
                </div>
            </div>

            <div className='dashboard-content'>
                <div className='dashboard-grid'>
                    <div className='card mood-tracker'>
                        <h3>Select Your Mood</h3>
                        <div className='mood-grid'>
                            <div className='mood-item'>
                                <div className='mood-emoji'>😄</div>
                                <div className='mood-name'>Happy</div>
                            </div>
                            <div className='mood-item'>
                                <div className='mood-emoji'>😲</div>
                                <div className='mood-name'>Surprise</div>
                            </div>
                            <div className='mood-item'>
                                <div className='mood-emoji'>😡</div>
                                <div className='mood-name'>Angry</div>
                            </div>
                            <div className='mood-item'>
                                <div className='mood-emoji'>😥</div>
                                <div className='mood-name'>Sad</div>
                            </div>
                            <div className='mood-item'>
                                <div className='mood-emoji'>😨</div>
                                <div className='mood-name'>Anxious</div>
                            </div>
                            <div className='mood-item'>
                                <div className='mood-emoji'>😖</div>
                                <div className='mood-name'>Disgusted</div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='tags-section'>
                            <h3>Add Tags</h3>
                            <div className='tags-input' id='tagsInput'>
                                <input type='text' className='tag-input' placeholder='Type a tag...' id='tagInputField' />
                            </div>
                            <h3>Suggested Tags</h3>
                            <div className='suggested-tags'>
                                <span className="suggested-tag">#work</span>
                                <span className="suggested-tag">#family</span>
                                <span className="suggested-tag">#exercise</span>
                                <span className="suggested-tag">#friends</span>
                                <span className="suggested-tag">#sleep</span>
                                <span className="suggested-tag">#stress</span>
                                <span className="suggested-tag">#creative</span>
                                <span className="suggested-tag">#music</span>
                                <span className="suggested-tag">#food</span>
                                <span className="suggested-tag">#travel</span>
                            </div>
                        </div>
                        <div className='journal-entry'>
                            <h3>This space is Yours (optional)</h3>
                            <textarea 
                            placeholder='Write your thoughts here...'/>
                        </div>
                        
                    </div>
                    <div className='column'>
                        <div className='save-button'>
                            Remember
                        </div>
                        <div className='card'>
                            <h3>Moodi Rewind</h3>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

    )
}

export default Me;