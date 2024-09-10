import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const Home = () => {
    const userName = 'username'; // Burada kullanıcı adını dinamik olarak alabilirsiniz
    const totalTokens = 1000; // Örnek toplam token adedi
    const tickets = 5; // Örnek ticket sayısı
    const colors = ['#ff4081', '#3f51b5', '#4caf50', '#ffeb3b', '#e91e63', '#2196f3', '#f44336', '#9c27b0', '#673ab7', '#ff5722', '#00bcd4', '#8bc34a'];

    return (
        <div className="home-container">
            <div className="header">
                <div className="token-count">
                    <div className="icon-wrapper">
                        <MusicNoteIcon className="icon0" />
                    </div>
                    {totalTokens}
                </div>
                <div className="ticket-count">
                    <div className="icon-wrapper">
                        <ConfirmationNumberIcon className="icon1" />
                    </div>
                    {tickets}
                </div>
            </div>
            <h1 className="home-title">{userName}</h1>
            <div className="game-area">
                <div className="game-placeholder">
                    <img src="/images/piano_icon.png" alt="Piano Icon" className="piano-icon" />
                    <p className="game-description">Experience the Ultimate Piano Challenge!</p>
                    <Link to="/game" className="play-button">
                        Play
                    </Link>
                </div>
            </div>
            <div className="background-notes">
                {Array.from({ length: 20 }).map((_, index) => {
                    const NoteIcon = [MusicNoteIcon, AudiotrackIcon, QueueMusicIcon][index % 3];
                    const size = Math.random() * 48 + 24; // 24px ile 72px arasında rastgele boyut
                    const top = Math.random() * 100; // 0% ile 100% arasında rastgele konum
                    const left = Math.random() * 100; // 0% ile 100% arasında rastgele konum
                    const delay = Math.random() * 5; // 0s ile 5s arasında rastgele gecikme
                    const color = colors[Math.floor(Math.random() * colors.length)]; // Rastgele renk seçimi
                    return (
                        <NoteIcon
                            key={index}
                            className="note"
                            style={{ fontSize: size, top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s`, color: color }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
