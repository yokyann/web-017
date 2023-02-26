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

export default FormAddCard;