import React, { useState } from 'react';
import '../styles/Friends.css';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const Friends = () => {
    const referralLink = "https://yourapp.com/referral?user=example";
    const [showMessage, setShowMessage] = useState(false);
    const [referrals, setReferrals] = useState([
        { id: 1, name: 'John Doe', date: '2023-01-01', tokens: 100 },
        { id: 2, name: 'Jane Smith', date: '2023-01-05', tokens: 50 },
        { id: 3, name: 'Alice Johnson', date: '2023-02-10', tokens: 75 },
        { id: 4, name: 'Bob Brown', date: '2023-03-12', tokens: 90 },
        { id: 5, name: 'Charlie Davis', date: '2023-04-18', tokens: 120 },
        { id: 6, name: 'Diana Evans', date: '2023-05-21', tokens: 60 },
        { id: 7, name: 'Eddie Frank', date: '2023-06-02', tokens: 110 },
        { id: 8, name: 'Fiona Green', date: '2023-07-11', tokens: 70 },
        { id: 9, name: 'George Hill', date: '2023-08-19', tokens: 85 },
        { id: 10, name: 'Helen Ingram', date: '2023-09-23', tokens: 95 }
    ]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        });
    };

    const sendReferralLink = () => {
        // Logic to send the referral link
        alert("Referral link sent!");
    };

    const colors = ['#ff4081', '#3f51b5', '#4caf50', '#ffeb3b', '#e91e63', '#2196f3', '#f44336', '#9c27b0', '#673ab7', '#ff5722', '#00bcd4', '#8bc34a'];

    return (
        <div className="friends-container">
            <h1 className="friends-title">Friends</h1>
            {showMessage && (
                <div className="message-box">
                    Referral link copied to clipboard!
                </div>
            )}
            <div className="referral-section">
                <p>Your referral link:</p>
                <div className="buttons">
                    <button className="copy-button" onClick={copyToClipboard}>Copy</button>
                    <button className="send-button" onClick={sendReferralLink}>Send</button>
                </div>
            </div>
            <div className="referrals-list">
                <div className="referrals-scroll">
                    {referrals.length > 0 ? (
                        referrals.map((referral) => (
                            <div key={referral.id} className="referral-item">
                                <div className="referral-info">
                                    <span>{referral.name}</span>
                                </div>
                                <span className="tokens-earned">
                                    {referral.tokens}
                                    <MusicNoteIcon className="icon" />
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>No referrals found</p>
                    )}
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

export default Friends;
