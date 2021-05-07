// https://deckofcardsapi.com/
// card size 226x314
import { qs, qsa, ce, lsgi, lssi, rng } from "./myUtils.js";

qs("#playbjbtn").addEventListener("click", () => {
    qs(".play").classList.toggle("active");

    game.shuffleDeck(); setTimeout(() => { game.shuffleDeck() }, 1000);
    setTimeout(() => { console.log(game.deckId) }, 1000);
    setTimeout(() => { game.serveCard() }, 1000);
    qs(".hit").classList.toggle("active");
    qs(".clearcards").classList.toggle("active");
})

// oop constructor object
class Game {
    constructor() {
        this.deckId = "";
        this.count = 0;
    }
    shuffleDeck() {
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then(result => result.json())
            .then(data => this.deckId = data.deck_id);
    }
    serveCard() {
        const cardImage = ce("img");
        cardImage.classList.add("card");
        fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
            .then(result => result.json())
            .then(data => {
                console.log(data);
                cardImage.setAttribute('src', `${data.cards[0].image}`);
                qs(".sec1").appendChild(cardImage);
                if (data.cards[0].value == "KING" || data.cards[0].value == "QUEEN" || data.cards[0].value == "JACK") {
                    data.cards[0].value = 10;
                } else if (data.cards[0].value == "ACE") {
                    data.cards[0].value = 11;
                }
                this.count += parseInt(data.cards[0].value);
                qs(".total").innerText = `Total = ${this.count}`;
                if (this.count > 21) {
                    console.log("bg changed");
                    qs("body").style.backgroundColor = "rgb(255, 102, 0)";
                } else if (this.count == 21) {
                    console.log("bg changed");
                    qs("body").style.backgroundColor = "rgb(157, 255, 0)";
                }
            });


        setTimeout(() => {
            if (this.count > 21) {
                setTimeout(() => { alert("you lost") }, 10);
            }
        }, 1000);

    }
    hit() {
        this.serveCard()
    }
    clearCards() {
        qsa(".card").forEach(card => {
            card.remove();
            this.count = 0;
            setTimeout(() => { qs(".total").innerText = `Total = ${this.count}` }, 10);
        });
    }
    stand() {

    }
}

const game = new Game();


qs(".hit").addEventListener("click", () => {
    game.hit();
});
qs(".clearcards").addEventListener("click", () => {
    game.clearCards();
});