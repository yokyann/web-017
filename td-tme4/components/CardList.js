function CardList(props){
    const[cartes, setcartes] = useStates([
        {id : 1, symbol : "x", affichage : "visible"},
        {id : 2, symbol : "o", affichage : "hidden"},
        {id : 3, symbol : "-", affichage : "visible"},
        {id : 4, symbol : "i", affichage : "hidden"}
    ])
    return 
        <div className="cardList">
            {
                cartes.map((card,index) => (<Card symbol = {card.symbol} affichage = {card.affichage}/>))
            }
        </div>
}

export default CardList;