import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/Game.css';

const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const columns = [0, 1, 2, 3]; // Dört sütun

const Game = () => {
    const [tiles, setTiles] = useState([]);
    const [lastColumn, setLastColumn] = useState(null);
    const [intervalTime, setIntervalTime] = useState(250); // Sabit notaların oluşturulma süresi
    const [tileSpeed, setTileSpeed] = useState(3.9); // Sabit düşme hızı
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30); // Oyun süresi 30 saniye
    const [gameOver, setGameOver] = useState(false);
    const clickedTiles = useRef(new Set());

    // Kullanıcı tıklamalarını takip eden değişkenler
    const [blueClicks, setBlueClicks] = useState(0);
    const [greenClicks, setGreenClicks] = useState(0);
    const [redClicks, setRedClicks] = useState(0);
    const [blackClicks, setBlackClicks] = useState(0);
    const [playTime, setPlayTime] = useState(0);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                setPlayTime((prevPlayTime) => prevPlayTime + 1); // Oynanan süreyi artır
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setGameOver(true); // Oyun bitti
            setTiles([]); // Oyun bittiğinde tüm notaları kaldır
        }
    }, [timeLeft]);

    useEffect(() => {
        if (gameOver) return; // Oyun bittiğinde yeni item gelmesini durdur

        const interval = setInterval(() => {
            let newColumn;
            do {
                newColumn = columns[Math.floor(Math.random() * columns.length)];
            } while (newColumn === lastColumn);

            const lastTileInColumn = tiles.find(tile => tile.column === newColumn);
            const newTileStartY = lastTileInColumn ? lastTileInColumn.startY - 200 : -200;
            const isPenaltyTile = Math.random() < 0.2; // %20 ihtimalle kırmızı nota
            const isSpecialTile = Math.random() < 0.01; // %1 ihtimalle ışıldayan nota
            const isGreenTile = Math.random() < 0.05; // %5 ihtimalle yeşil nota

            const newTile = {
                id: Date.now(),
                note: notes[Math.floor(Math.random() * notes.length)],
                column: newColumn,
                length: 200, // Kısa notaların uzunluğu
                startY: newTileStartY, // Yeni notanın başlangıç Y konumu
                isPenalty: isPenaltyTile, // Kırmızı nota olup olmadığını belirle
                isSpecial: isSpecialTile, // Işıldayan nota olup olmadığını belirle
                isGreen: isGreenTile // Yeşil nota olup olmadığını belirle
            };

            setTiles((prevTiles) => [newTile, ...prevTiles]);
            setLastColumn(newColumn); // En son atılan notanın sütun bilgisini sakla
        }, intervalTime); // Sabit notaların oluşturulma süresi

        return () => clearInterval(interval);
    }, [lastColumn, intervalTime, tiles, gameOver]);

    const handleTileClick = (tile) => {
        if (gameOver || clickedTiles.current.has(tile.id)) return; // Oyun bittiğinde veya tile zaten tıklanmışsa engelle
        clickedTiles.current.add(tile.id);

        if (tile.isSpecial) {
            setScore((prevScore) => prevScore + 100); // Işıldayan notaya basıldığında 100 puan
            setBlueClicks((prev) => prev + 1); // Mavi nota tıklaması
        } else if (tile.isPenalty) {
            setScore((prevScore) => Math.max(prevScore - 10, 0)); // Kırmızı notaya basıldığında ceza, eksi skoru engelle
            setRedClicks((prev) => prev + 1); // Kırmızı nota tıklaması
        } else if (tile.isGreen) {
            setTimeLeft((prevTimeLeft) => prevTimeLeft + 2); // Yeşil notaya basıldığında süreyi artır
            setGreenClicks((prev) => prev + 1); // Yeşil nota tıklaması
        } else {
            setScore((prevScore) => prevScore + 1); // Siyah notaya basıldığında ödül
            setBlackClicks((prev) => prev + 1); // Siyah nota tıklaması
        }
        setTiles((prevTiles) => prevTiles.filter(t => t.id !== tile.id)); // Tıklanan notayı kaldır
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleRestart = () => {
        setTiles([]);
        setScore(0);
        setTimeLeft(30);
        setGameOver(false);
        clickedTiles.current.clear();
        setBlueClicks(0);
        setGreenClicks(0);
        setRedClicks(0);
        setBlackClicks(0);
        setPlayTime(0);
    };

    useEffect(() => {
        if (gameOver) {
            // Oyun bittiğinde console'a yazdır
            console.log(`Oyun bitti! Mavi notalara tıklama sayısı: ${blueClicks}`);
            console.log(`Oyun bitti! Yeşil notalara tıklama sayısı: ${greenClicks}`);
            console.log(`Oyun bitti! Kırmızı notalara tıklama sayısı: ${redClicks}`);
            console.log(`Oyun bitti! Siyah notalara tıklama sayısı: ${blackClicks}`);
            console.log(`Oynanan süre: ${playTime} saniye`);
        }
    }, [gameOver]);

    return (
        <div className="game">
            <div className="header">
                <div className="score">Skor: {score}</div>
                <div className="timer">Süre: {formatTime(timeLeft)}</div>
            </div>
            <div className="piano">
                <div className="sutun"></div>
                <div className="sutun"></div>
                <div className="sutun"></div>
                <div className="sutun"></div> {/* Dördüncü sütun */}
                <AnimatePresence>
                    {tiles.map((tile) => (
                        <motion.div
                            key={tile.id}
                            className="piano-key"
                            onMouseDown={() => handleTileClick(tile)}
                            onTouchStart={() => handleTileClick(tile)}
                            initial={{ y: tile.startY }}
                            animate={{ y: gameOver ? tile.startY : '100vh' }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }} // Tıklanınca hızlı kaybolma
                            transition={{ duration: tileSpeed }} // Sabit düşme hızı
                            style={{
                                left: `${tile.column * 25}%`, /* Sütun konumu */
                                height: `${tile.length}px`,
                                width: '25%', // Sütun genişliği
                                backgroundColor: tile.isSpecial ? 'blue' : tile.isPenalty ? 'red' : tile.isGreen ? 'green' : 'black', // Renk ayarı
                                boxShadow: tile.isSpecial ? '0 0 10px blue' : tile.isPenalty ? '0 0 10px red' : tile.isGreen ? '0 0 10px green' : '0 0 10px black' // Işıldayan nota ve kırmızı nota için gölge
                            }} // Sütun konumunu belirleme ve genişlik
                        />
                    ))}
                </AnimatePresence>
            </div>
            {gameOver && (
                <div className="game-over">
                    <div className="game-over-message">Oyun bitti! Skorunuz: {score}</div>
                    <button className="restart-button" onClick={handleRestart}>Yeniden Oyna</button>
                </div>
            )}
        </div>
    );
};

export default Game;
