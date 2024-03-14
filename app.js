// Gettting the checkbox element
const checkbox = document.getElementById('checkbox');

// Getting the tables section
const tablesSection = document.querySelector('.tablesSection');

// Array for storing inventory items
const inventoryItems = [];

// Function for checking if an item exists already
function checkIfExists(item, inventoryItems) {
	for (var i = 0; i < inventoryItems.length; i++) {
		if(item == inventoryItems[i]) {
			return true;
		}
	}
}


// Function for adding new item in the inventory
inputForm.addEventListener('submit', function (e) {
	e.preventDefault();

	// Getting the item from the input field
	const item = document.getElementById('item').value;

	// Getting the quantity from the input field
	const quantity = document.getElementById('quantity').value;

	// We can't let an input field be empty
	if(item.length == 0 || quantity.length == 0) {
		alert("Fill out the form first");
	}

	// If all input fields are not empty, go here
	else {

		// Check if item already exists
		if (checkIfExists(item, inventoryItems)) {
			alert('Item already taken');
		}

		// If it doesn't exist yet, go here
		else {

			// push to the inventoryItems list
			inventoryItems.push(item);
			console.log(inventoryItems)

			// create the table row element for storing items
			const trElement = document.createElement('tr');

			// create table data for storing item name
			const tdElementForItemName = document.createElement('td');

			// create table data for storing quantity 
			const tdElementForQty = document.createElement('td');

			// setting the text content of the item name and quantity
			tdElementForItemName.textContent = item;
			tdElementForQty.textContent = quantity;

			// adding to the table data element to the table row
			trElement.appendChild(tdElementForItemName);
			trElement.appendChild(tdElementForQty);

			// adding table row element to the table
			document.querySelector('table').appendChild(trElement);
		}

	}

})

checkbox.addEventListener('change', function(e) {
	e.preventDefault();
	if(checkbox.checked == true) {
		tablesSection.style.display = "block";
	}
	else {
		tablesSection.style.display = "none";
	}

// Event listener for table cell clicks to modify quantity
document.querySelector('table').addEventListener('click', function(e) {
    // Check if the clicked element is a table cell
    if (e.target.tagName === 'TD') {
        const tdElement = e.target;
        const trElement = tdElement.parentElement;
        // Check if the clicked table row has exactly two cells (item and quantity)
        if (trElement.cells.length === 2) {
            // Get the text content of the quantity cell
            const oldQuantity = tdElement.textContent;
            // Create an input field
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = oldQuantity;
            // Replace the quantity cell with the input field
            tdElement.textContent = '';
            tdElement.appendChild(inputField);
            // Focus on the input field
            inputField.focus();
            // Event listener for input field blur to save changes
            inputField.addEventListener('blur', function() {
                const newQuantity = inputField.value.trim();
                // Check if the new quantity is valid
                if (!isNaN(newQuantity) && newQuantity !== '') {
                    // Update the quantity cell with the new quantity
                    tdElement.textContent = newQuantity;
                } else {
                    // If the new quantity is not valid, revert to the old quantity
                    tdElement.textContent = oldQuantity;
                }
            });
            // Event listener for input field key press to handle enter key
            inputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    inputField.blur();
                }
            });
        }
    }
});
    
})