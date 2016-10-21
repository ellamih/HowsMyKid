<!doctype html>

<script>
function addItem() {
    var newItemText = document.getElementsByTagName('input')[0].value;

    document.getElementsByTagName('input')[0].value = '';

    // Step 1 - Create list item 
    var newItem = document.createElement('li');

    // add user's todo as content to li 
    newItem.innerHTML = newItemText;

    // add li node to ul node 
    document.getElementById('todoList').appendChild(newItem);
	    newItem.addEventListener('click', completeItem);
		}


function completeItem() {
 removeItemFromTodos(this);
  addItemToCompleted(this);	
    }
  
function removeItemFromTodos(itemElement) {
	document.getElementById('todoList').removeChild(itemElement);
}

function addItemToCompleted(itemElement) {
		document.getElementById('completedList').appendChild(itemElement);

}

document.getElementsByTagName('button')[0].addEventListener('click', addItem);

</script>