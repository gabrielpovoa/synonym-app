import { useState, useEffect } from "react"
import './App.css'

interface Syonyms {
  word: string;
  score: number
}


const App = () => {
  const [synonyms, setSynonyms] = useState<Syonyms[]>([])
  const [word, setWord] = useState<string>("")

  const BASEURL = `https://api.datamuse.com/`

  const loadSynonyms = async () => {
    let data = await fetch(`${BASEURL}words?rel_syn=${word}`);
    let response = await data.json();
    setSynonyms(response)
    setWord('')
  }

  const handleSynonymClicked = async (synonym: string) => {
    let data = await fetch(`${BASEURL}words?rel_syn=${synonym}`);
    let response = await data.json();
    setSynonyms(response)
    setWord(synonym)
  }

  return <>
    <header>
      <p>Request total: {synonyms.length}</p>
    </header>

    <main>
      <form className="clickableArea" onClick={(e) => e.preventDefault()}>
        <input type="text" placeholder="serch for a synonym" value={word} onChange={e => {setWord(e.target.value)}}/>
        <button onClick={loadSynonyms} >load Synonyms</button>
      </form>
      <div className="synonyms">
        {synonyms.map((synonym, index) => (
          <div className="synonym-item" onClick={() => {handleSynonymClicked(synonym.word)}} key={index}>{synonym.word}</div>
        ))}
      </div>
    </main>
  </>
}

export default App
