import './Landingpage.css';

function Landingpage() {

    return(
        <div className='main-container'>
            <header>
                <nav>
                    <div className='logo'><a href='/'>Moodi-Moo</a></div>
                    <ul className="nav-links">
                        <li><a href=''>Features</a></li>
                        <li><a href=''>About</a></li>
                        <li><a href=''>Contact</a></li>
                        <li><a href='/login'>Sign in</a></li>
                        <li><a href=''>Sign up</a></li>
                    </ul>
                </nav>
            </header>

            <main className='content'>
                <div className='hero-section'>
                    <h1>Feel Deeply.</h1>
                    <h1>Understand Truly.</h1>
                    <h1>Live Fully.</h1>
                    <p>Discover patterns in your emotion with our mood diary. Track your feeling, hashtag them and write Logs.</p>
                    <a href='/login' className='cta-button'>Start Your Journey</a>
                    <div className='features'>
                        <div className='feature'>
                            <span className='feature-icon'>🤩</span>
                            <h4>Mood Emojis</h4>
                            <p>Simple selections to express diverse emtions</p>
                        </div>
                        <div className='feature'>
                            <span className='feature-icon'
                            style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}>
                                #️⃣</span>
                            <h4>Hash tag</h4>
                            <p>Track your mood with simple keywords</p>
                        </div>
                        <div className='feature'>
                            <span className='feature-icon'>📝</span>
                            <h4>Logs</h4>
                            <p>Write When you want to express more.</p>
                        </div>
                        <div className='feature'>
                            <span className='feature-icon'>📢</span>
                            <h4>Share</h4>
                            <p>Share your mood with your friends</p>
                        </div>
                    </div>
                </div>
                <div className='demo-section'>
                    <div className='mood-preview'>
                        <h3>Express Your Mood</h3>
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
                    <div className='tags-demo'>
                        <h3>The More Detail the Better</h3>
                        <div className='tag-cloud'>
                            <span className='tag'>#work</span>
                            <span className='tag'>#school</span>
                            <span className='tag'>#relationship</span>
                            <span className='tag'>#health</span>
                            <span className='tag'>#tired</span>
                            <span className='tag'>#bored</span>
                            <span className='tag'>#breakthrough</span>
                            <span className='tag'>#workedout</span>
                            <span className='tag'>#music</span>
                            <span className='tag'>#doomscrolling</span>
                            <span className='tag'>#proud</span>
                            <span className='tag'>#cried</span>
                            <span className='tag'>#peaceful</span>
                            <span className='tag'>#confused</span>
                            <span className='tag'>#travel</span>
                            <span className='tag'>#motivated</span>
                        </div>
                    </div>
                </div>
            </main>    
        </div>
    )
}

export default Landingpage;