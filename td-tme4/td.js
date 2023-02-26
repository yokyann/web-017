import { useState } from "react";

//Ancienne maniere de faire

// class Card extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return <div className="card"> (this.props.name) </div>;
//   }
// }

// Nouvelle maniere de faire

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

// Question 1.2

// Ce sont les valeurs des attributs que l'on va recuperer quand on appelle la fonction Card
<Card symbol="toto" />;

function CardList(props) {
    return (
        <div className="cardList">
            <Card symbol="x" affichage="visible" />
            <Card symbol="o" affichage="hidden" />
            <Card symbol="-" affichage="visible" />
            <Card symbol="i" affichage="hidden" />
        </div>
        );
}

//Methode plus rapide ^^
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

// Question 3.1

function FormAddCard(props)
{
  	return (
    	<div className = "FormAddCard">
      		<label for="symbol"> Symbol </label>
      		<input type="text" id="symbol"/>
      		<label for="menu_visible"> Visibility </label>
      		<select id="menu_visible">
      			<option value="visible"> Visible </option>
      			<option value="hidden"> Hidden </option>
      		</select>
      		<input type="submit" value="Submit"/>
    	</div>
    );
}

function PageCard(props)
{
    return(
        <div className = "PageCard">
            <CardList/>
            <FormAddCard/>
        </div>
    );
}


// Exercice 4 : 
// Question 4.1 : composant formlaire, login, logout,
// Question 4.2 : message, messageList, barre de recherche
// Question 4.3 : Amis, amisList, message, messageList, barre de recherche
// Question 4.4 : state pour savoir si on est connecté ou non
// - si connect == false --> page de connexion
// - si connect == true --> page principale
// - sinon --> page de profil