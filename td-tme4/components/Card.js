function Card(props) {
    const [visible, setAffichage] = useState(props.affichage); // Question 1.3
  
    function handleCardClick() {
      setAffichage("visible");
    }
  
    return (
      <div className="Cards" onClick={handleCardClick}>
        {" "}
        {affichage === "visible" ? props.symbol1 : "-"}
      </div>
    );
  }
  //Tout les composants sont en majuscule
  export default Card;