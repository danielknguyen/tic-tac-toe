$(document).ready(function(){
	// player turn will be x
	var player = 'x';
	// score tracker
	var playerScore = 0;
	var computerScore = 0;
	// computer turn will be o
	var computer = 'o';
	// array of values that will be checked for a winner
	var turns = [];
	// array of slots that have been inputted
	var usedSlots = [];
	// keep track of who's turn it is
	var playersTurn = true;
	// count per rounds
	var count = 0;
	// function to assign player/computer to x and or o
	function selectPlayer(){
		if(player === 'x') {
			computer = 'o';
			$('#player1')
				.css('background-color','#ECECEC')
				.css('color', '#14bdac')
				.css('border-color','#14bdac');
			$('#player2')
				.css('background-color','#ECECEC')
				.css('color', '#000000')
				.css('border-color','#000000');

		} else {
			computer = 'x';
			$('#player2')
				.css('background-color','#ECECEC')
				.css('color', '#14bdac')
				.css('border-color','#14bdac');
			$('#player1')
				.css('color', '#000000')
				.css('background-color', '#ECECEC')
				.css('border-color','#000000');	
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
		if(slotsClosed === '' && usedSlots.indexOf(id) < 0){
			turns[id] = player;
			$('#' + id).text(player);
			usedSlots.push(id);
			count++;
			console.log(count);
			return true;
			// console.log(usedSlots);
		} else {
			return false;
		}
	}
	// when a square on the board is clicked program will check if it is empty, if it is empty it will be filled with player/computer's character
	$('.squares').on('click',function(){
		var slot = $(this).attr('id');
		if(playersTurn && usedSlots.indexOf(slot) < 0){
			$('#winnerText').text('');
			console.log(slot);
			playersTurn = false;
			checkIfSlotsOpen(player,slot);
			winningCondition(turns,player);
			// once players turn has ended computer will make a play
			if(playersTurn === false && count !== 9){
				setTimeout(function(){
					computersTurn();
					winningCondition(turns,computer);
					playersTurn = true;
				},1000);	
			}
		}
	});
	// reset the tic tac toe game
	function resetGame(){
		turns = [];
		usedSlots = [];
		playerScore = 0;
		computerScore = 0;
		$('#playerScore').text('-');
		$('#computerScore').text('-');
		$('.squares').text('');
		$('#winnerText').text('');
		playersTurn = true;
		count = 0;
	}
	// clears the tic tac toe board with scores still in tack
	function clearBoard(){
		turns = [];
		usedSlots = [];
		playersTurn = true;
		count = 0;
		setTimeout(function(){
			$('.squares').text('');
		},500);
	}
	// function to keep score
	function keepScore(currentPlayer){
		clearBoard();
		setTimeout(function(){
			$('#winnerText').text(currentPlayer.toUpperCase() + ' ' + 'has won!');
			},500);
		if(currentPlayer === 'x'){
			playerScore++;
			$('#playerScore').text(playerScore);
		} else {
			computerScore++;
			$('#computerScore').text(computerScore);
		}
	}
	// when restart is clicked the tic tac toe board will clear
	$('#ttt-restart').on('click',function(){
		resetGame();
	});
	//check for infinite loop
	// var calls = 0;
	// function iSuspectToBeLoopingInfititely() {
	//   calls += 1;
	//   if (calls > 100) { debugger; }
	// }
	// function to create the computers input
	function computersTurn(){
		var computerSlot = 'sq-' + (Math.random() * 8).toFixed();
		var checkComputerSlot = checkIfSlotsOpen(computer,computerSlot);
		while(!checkComputerSlot && count !== 9){
			computerSlot = 'sq-' + (Math.random() * 8).toFixed();
			checkComputerSlot = checkIfSlotsOpen(computer,computerSlot);
			// iSuspectToBeLoopingInfititely();
			// console.log('this is the computers slot: ' + computerSlot);
			// console.log('check computer slot: ' + checkComputerSlot);
		}	
	}
	// this will identify the winning condition at the end of each turn
	function winningCondition(slotsUsed,currentPlayer){
		// vertical row 1
		if(slotsUsed['sq-0'] === currentPlayer && slotsUsed['sq-3'] === currentPlayer && slotsUsed['sq-6'] === currentPlayer){
			keepScore(currentPlayer);
			// vertical row 2
		} else if(slotsUsed['sq-1'] === currentPlayer && slotsUsed['sq-4'] === currentPlayer && slotsUsed['sq-7'] === currentPlayer){
				keepScore(currentPlayer)
			// vertical row 3
		} else if(slotsUsed['sq-2'] === currentPlayer && slotsUsed['sq-5'] === currentPlayer && slotsUsed['sq-8'] === currentPlayer){
				keepScore(currentPlayer)
			// horizontal row 1
		} else if(slotsUsed['sq-0'] === currentPlayer && slotsUsed['sq-1'] === currentPlayer && slotsUsed['sq-2'] === currentPlayer){
				keepScore(currentPlayer)
			// horizontal row 2
		}	else if(slotsUsed['sq-3'] === currentPlayer && slotsUsed['sq-4'] === currentPlayer && slotsUsed['sq-5'] === currentPlayer){
				keepScore(currentPlayer)
			// horizontal row 3
		} else if(slotsUsed['sq-6'] === currentPlayer && slotsUsed['sq-7'] === currentPlayer && slotsUsed['sq-8'] === currentPlayer){
				keepScore(currentPlayer)
			// diagonal left
		} else if(slotsUsed['sq-0'] === currentPlayer && slotsUsed['sq-4'] === currentPlayer && slotsUsed['sq-8'] === currentPlayer){
				keepScore(currentPlayer)
			//diagonal right
		} else if(slotsUsed['sq-2'] === currentPlayer && slotsUsed['sq-4'] === currentPlayer && slotsUsed['sq-6'] === currentPlayer){
				keepScore(currentPlayer)
			//if board is full and no winners; alert it is a tie
		} else if(count === 9) {
				setTimeout(function(){
					$('#winnerText').text('It is a tie!');
					clearBoard();
				},500);	
		}
	}	
});