$(document).ready(function(){
	// player turn will be x
	var player = 'x';
	// computer turn will be o
	var computer = 'o';
	// array of values that will be checked for a winner
	var turns = [];
	// array of slots that have been inputted
	var usedSlots = [];
	// keep track of who's turn it is
	var playersTurn = true;
	// function to assign player/computer to x and or o
	function selectPlayer(){
		if(player === 'x') {
			computer = 'o';
			$('#player1').css('border-color','#14bdac')
			$('#player2').css('border-color','#000000');
		} else {
			computer = 'x';
			$('#player2').css('border-color','#14bdac');
			$('#player1').css('border-color','#000000');	
		}
	}
	// change player/computer to x and or o upon clicking
	$('#player1').on('click',function(){
		if(player !== 'x'){
			player = 'x';
			resetGame();
			selectPlayer();
		}
	});
	$('#player2').on('click',function(){
		if(player !== 'o'){
			player = 'o';
			resetGame();
			selectPlayer();
		}
	});
	// function to check if a spot is open
	function checkIfSlotsOpen(player,id){
		var slotsClosed = $('#' + id).text();
		if(slotsClosed === ''){
			turns[id] = player;
			$('#' + id).text(player);
			// console.log(turns);
		} else {
			return false;
		}
	}
	// when a square on the board is clicked program will check if it is empty, if it is empty it will be filled with player/computer's character
	$('.squares').on('click',function(){
		var slot = $(this).attr('id');
		if(playersTurn && usedSlots.indexOf(slot) < 0){
			// console.log(slot);
			// console.log(turns.indexOf(slot));
			playersTurn = false;
			checkIfSlotsOpen(player,slot);
			usedSlots.push(slot);
			// console.log(turns);
			// console.log(usedSlots);
			winningCondition(turns,player);
			// once players turn has ended computer will make a play
			if(playersTurn === false){
				computersTurn();
				winningCondition(turns,computer);
				playersTurn = true;
			}
		}
	});
	// reset the tic tac toe game
	function resetGame(){
		turns = [];
		usedSlots = [];
		$('.squares').text('');
		playersTurn = true;
		// console.log(turns);
	}
	// when restart is clicked the tic tac toe board will clear
	$('#ttt-restart').on('click',function(){
		resetGame();
	});
	// function to create the computers input
	function computersTurn(){
		var computerSlot = 'sq-' + (Math.random() * 8).toFixed();
		var checkComputerSlot = checkIfSlotsOpen(computer,computerSlot);
		while(checkComputerSlot === false || checkComputerSlot === ''){
			computerSlot = 'sq-' + (Math.random() * 8).toFixed();
			var checkComputerSlot = checkIfSlotsOpen(computer,computerSlot);
			// console.log('this is the computers slot: ' + computerSlot);
			// console.log('check computer slot: ' + checkComputerSlot);
		}
		usedSlots.push(computerSlot);	
	}
	// this will identify the winning condition at the end of each turn
	function winningCondition(slotsUsed,currentPlayer){
		// vertical row 1
		if(slotsUsed['sq-0'] === currentPlayer && slotsUsed['sq-3'] === currentPlayer && slotsUsed['sq-6'] === currentPlayer){
			alert('Player: ' + currentPlayer + ' ' + ' has won!');
				resetGame();
			// vertical row 2
		} else if(slotsUsed['sq-1'] === currentPlayer && slotsUsed['sq-4'] === currentPlayer && slotsUsed['sq-7'] === currentPlayer){
				alert('Player: ' + currentPlayer + ' ' + ' has won!');
				resetGame();
			// vertical row 3
		} else if(slotsUsed['sq-2'] === currentPlayer && slotsUsed['sq-5'] === currentPlayer && slotsUsed['sq-8'] === currentPlayer){
				alert('Player: ' + currentPlayer + ' ' + ' has won!');
				resetGame();
			// horizontal row 1
		} else if(slotsUsed['sq-0'] === currentPlayer && slotsUsed['sq-1'] === currentPlayer && slotsUsed['sq-2'] === currentPlayer){
				alert('Player: ' + currentPlayer + ' ' + ' has won!');
				resetGame();
			// horizontal row 2
		}	else if(slotsUsed['sq-3'] === currentPlayer && slotsUsed['sq-4'] === currentPlayer && slotsUsed['sq-5'] === currentPlayer){
				alert('Player: ' + currentPlayer + ' ' + ' has won!');
				resetGame();
			// horizontal row 3
		} else if(slotsUsed['sq-6'] === currentPlayer && slotsUsed['sq-7'] === currentPlayer && slotsUsed['sq-8'] === currentPlayer){
				alert('Player: ' + currentPlayer + ' ' + ' has won!');
				resetGame();
			// diagonal left
		} else if(slotsUsed['sq-0'] === currentPlayer && slotsUsed['sq-4'] === currentPlayer && slotsUsed['sq-8'] === currentPlayer){
				alert('Player: ' + currentPlayer + ' ' + ' has won!');
				resetGame();
			//diagonal right
		} else if(slotsUsed['sq-2'] === currentPlayer && slotsUsed['sq-4'] === currentPlayer && slotsUsed['sq-6'] === currentPlayer){
				alert('Player: ' + currentPlayer + ' ' + ' has won!');
				resetGame();
		}
	}
});