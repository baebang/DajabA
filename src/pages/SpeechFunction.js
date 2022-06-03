import Container from "../components/Container";
import React, { useState, useEffect } from 'react'
import styles from "./SpeechFunction.module.css";
import Lined from "../components/Lined";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'ko-KR'

function SpeechFunction() {
    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])

    useEffect(() => {
        handleListen()
    }, [isListening])

    const handleListen = () => {
        if (isListening) {
          mic.start()
          mic.onend = () => {
            console.log('continue..')
            mic.start()
          }
        } else {
          mic.stop()
          mic.onend = () => {
            console.log('Stopped Mic on Click')
          }
        }
        mic.onstart = () => {
          console.log('Mics on')
        }
    
        mic.onresult = event => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

          console.log(transcript)
          setNote(transcript)
          mic.onerror = event => {
            console.log(event.error)
          }
        }
    }

    const handleSaveNote = () => {
        setSavedNotes([...savedNotes, note])
        setNote('')
    }

    return (
        <>
        <div className={styles.bg} />
        <Container className={styles.container}>
            <h1 className={styles.heading}>
                <Lined><strong>반복 단어 검출 Test</strong></Lined>
            </h1>
            <div className={styles.box2}>
                <div className={styles.box}> 
                    <br/>
                    {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
                    <button onClick={() => setIsListening(prevState => !prevState)}>
                        <strong>Start/Stop</strong>
                    </button>
                    <button onClick={handleSaveNote} disabled={!note}>
                        <strong>Save Note</strong>
                    </button>
                    <p>{note}</p>
                </div>

                <div className={styles.box}>
                    <h2>면접 내용</h2>
                    {savedNotes.map(n => (
                        <p key={n}>{n}</p>
                    ))}
                </div>

                 <div>
                    <h2><strong>반복적인 단어 확인</strong></h2>
                    <div>
                        <li>음</li>
                        <li>어</li>
                        <li>잠시만요</li>
                        <li>모르겠습니다</li>
                    </div>
                </div>
            </div>
            
           
        </Container>
        </>
    );
}

export default SpeechFunction;
