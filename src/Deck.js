import './Deck.css';
import React, {useState, useEffect} from "react";
import Card from "./Card";
import axios from "axios";

function Deck() {
    const [deck, setDeck] = useState();
    const [img, setImg] = useState("");
    useEffect(() => {
        const getDeck = async () => {
            try {
                const {data} = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle");
                setDeck(data.deck_id);
            }
            catch(e){
                console.log(e);
                getDeck();
            }
        }
        getDeck();
    }, []);

    async function getCard() {
        if (img === null || deck === undefined){
            return;
        }
        try {
            const {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw`);
            if (data.remaining === 0){
                alert("Error: no cards remaining");
                return;
            }
            setImg(data.cards["0"].image);
        }
        catch(e){
            console.log(e);
            alert(e.message);
        }
    }

    async function shuffle() {
        if (img === null || deck === undefined){
            return;
        }
        try {
            setImg(null);
            const {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/shuffle`);
            setImg("");
        }
        catch(e) {
            console.log(e);
            alert(e.message);
        }
    }

    return (
        <div className='Deck'>
            <div>
                <button onClick={getCard}>Draw a new card!</button>
                {img !== "" && <button onClick={shuffle}>Shuffle</button>}
            </div>
            { (img === null) ? <i>Shuffling</i> : <Card src={img}/>}
        </div>
    );
}

export default Deck;