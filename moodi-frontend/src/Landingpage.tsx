import './Landingpage.css';

function Landingpage() {

    return(
        <div className='main-container'>
            <header>
                <nav>
                    <div className='logo'>Moodi-Moo</div>
                    <ul className="nav-links">
                        <li><a href='Features'></a></li>
                        <li><a href='About'></a></li>
                        <li><a href='Contact'></a></li>
                    </ul>
                </nav>
            </header>

            <main className='content'>
                <div className='hero-section'>
                    <h1>Feel Deeply.</h1>
                    <h1>Understand Truly.</h1>
                    <h1>Live Fully.</h1>
                    <p>Discover patterns in your emotion with our mood diary. Track your feeling, hashtag them and write Logs.</p>
                    <a href='' className='cta-button'>Start Your Journey</a>
                    <div className='features'>
                        <div className='feature'>
                            <span className='feature-icon'>🤩</span>
                            <h4>6 Moods</h4>
                            <p>Simple selections to express diverse emtions</p>
                        </div>
                        <div className='feature'>
                            <span className='feature-icon'>#️⃣</span>
                            <h4>Hash tag</h4>
                            <p>Track your mood with simple keywords</p>
                        </div>
                        <div className='feature'>
                            <span className='feature-icon'>📝</span>
                            <h4>Logs</h4>
                            <p>Write When you want to express more.</p>
                        </div>

                    </div>
                </div>

            </main>    
        </div>
    )
}

export default Landingpage;