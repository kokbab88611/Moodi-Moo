import React, { useEffect, useState } from 'react';
import './Me.css'; 
// import type { User } from './types';
import { useUser } from './UseUser';
import type { MoodSave } from '../../types';
import axios from 'axios';

function Me() {
    const {user} = useUser();
    const [chosenMood, setChosenMood] = useState<string | undefined>();
    const [tags, setTags] = useState<string[]>([]);
    const [log, setLog] = useState<string | undefined>()

    const handleSave = () => {
        const moodinput: MoodSave = {
            user_id: user?.user_id ?? '',
            mood: chosenMood ?? '',
            hashtags: tags ?? [], 
            note: log ?? '',
        };

        axios.post('https://ominous-goggles-g5wrvrxwxx63vxgr-3000.app.github.dev/addmood', moodinput)
            .then(() => console.log('Saved!'))
            .catch(err => console.error('Failed to save mood:', err));
    }

    const removeTag = (tagToRemove: string) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove));
    }

    const handletag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const newtag = e.currentTarget.value;
        if(e.key === 'Enter' && newtag.trim() !== '') {
            setTags(prev => [...prev, newtag]);
            e.currentTarget.value = '';
        }
    }

    const selectSuggestedTag = (e: React.MouseEvent<HTMLSpanElement>) => {
        const tag = e.currentTarget.textContent;
        if(!tag) return;
        setTags(prev => [...prev, tag]);
    }
    
    const handleSelectMood = (e: React.MouseEvent<HTMLDivElement>) => {
        const chosenMood = e.currentTarget;
        if(chosenMood.classList.contains('selected')){
            chosenMood.classList.remove('selected')
            console.log('selection cancelled')
        } else{
            document.querySelectorAll('.mood-item').forEach(mood => {
                mood.classList.remove('selected');
            })
            chosenMood.classList.add('selected');
            const moodNameElement = chosenMood.querySelector('.mood-name');
            const moodName = moodNameElement?.textContent?.trim();
            setChosenMood(moodName);
            console.log(moodName)
        }
    }

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
                    <div className='sidebar-icon'>🏠</div>
                    <div className='sidebar-text'>Dashboard</div>
                </div>
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
                            <div className='mood-item' onClick={handleSelectMood}>
                                <div className='mood-emoji'>😄</div>
                                <div className='mood-name'>Happy</div>
                            </div>
                            <div className='mood-item' onClick={handleSelectMood}>
                                <div className='mood-emoji'>😲</div>
                                <div className='mood-name'>Surprise</div>
                            </div>
                            <div className='mood-item' onClick={handleSelectMood}>
                                <div className='mood-emoji'>😡</div>
                                <div className='mood-name'>Angry</div>
                            </div>
                            <div className='mood-item' onClick={handleSelectMood}>
                                <div className='mood-emoji'>😥</div>
                                <div className='mood-name'>Sad</div>
                            </div>
                            <div className='mood-item' onClick={handleSelectMood}>
                                <div className='mood-emoji'>😨</div>
                                <div className='mood-name'>Anxious</div>
                            </div>
                            <div className='mood-item' onClick={handleSelectMood}>
                                <div className='mood-emoji'>😖</div>
                                <div className='mood-name'>Disgusted</div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='tags-section'>
                            <h3>Add Tags</h3>
                            <div className='tags-input' id='tagsInput'>
                                {tags.map(tag => (
                                    <span className='tag' key={tag} onClick={() => removeTag(tag)}>
                                        {tag}
                                    </span>
                                ))}
                                <input type='text' className='tag-input' placeholder='Type a tag...' id='tagInputField' onKeyDown={(e) => handletag(e)}/>
                            </div>
                            <h3>Suggested Tags</h3>
                            <div className='suggested-tags'>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>work</span>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>family</span>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>exercise</span>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>friends</span>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>sleep</span>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>stress</span>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>creative</span>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>music</span>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>food</span>
                                <span className="suggested-tag" onClick={(e) => selectSuggestedTag(e)}>travel</span>
                            </div>
                        </div>
                        <div className='journal-entry'>
                            <h3>This space is Yours (optional)</h3>
                            <textarea 
                            placeholder='Write your thoughts here...'
                            onChange={(e) => setLog(e.target.value)}/>
                        </div>
                        
                    </div>
                    <div className='column'>
                        <div className='save-button' onClick={handleSave}>
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