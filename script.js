 var randomNumber = Math.floor(Math.random()*100)+1;

  var guesses = document.querySelector('.guesses');
  var lastResult = document.querySelector('.lastResult');
  var lowOrHi = document.querySelector('.lowOrHi');

  var guessSubmit = document.querySelector('.guessSubmit');
  var guessField = document.querySelector('.guessField');

  var guessCount = 1;
  var resetButton;
  var user;

var tbody = document.getElementById('tab');

var n_cooc;
  
  window.addEventListener('load',function()
  {
    
      user = prompt('Введите ваше имя!',"player");
      add_row(0);
      
  });
  
  function add_row(param)
  {
    if(param===0)
    {
      if(docCookies.getItem('n_cooc'))
      {
        n_cooc = docCookies.getItem('n_cooc');
        for(var i=1;i<n_cooc;i++)
        {
            if(docCookies.getItem('Name'+i))
            {
                  var row = document.createElement("tr")
                  var td1 = document.createElement("td")
                  td1.style.textAlign = 'center';
                  td1.appendChild(document.createTextNode(docCookies.getItem('Name'+i)));
                  var td2 = document.createElement("td")
                  td2.style.textAlign = 'center';
                  td2.appendChild (document.createTextNode(docCookies.getItem('date'+i)))
                  var td3 = document.createElement("td")
                  td3.style.textAlign = 'center';
                  td3.appendChild (document.createTextNode(docCookies.getItem('tries'+i)))
                  row.appendChild(td1);
                  row.appendChild(td2);
                  row.appendChild(td3);
                  tbody.appendChild(row);
            }
        }
      }
    }
    else
    if(param===1)
    {
      n_cooc = docCookies.getItem('n_cooc');
        for(var i=n_cooc-1;i<n_cooc;i++)
        {
            if(docCookies.getItem('Name'+i))
            {
                  var row = document.createElement("tr")
                  var td1 = document.createElement("td")
                  td1.style.textAlign = 'center';
                  td1.appendChild(document.createTextNode(docCookies.getItem('Name'+i)));
                  var td2 = document.createElement("td")
                  td2.style.textAlign = 'center';
                  td2.appendChild (document.createTextNode(docCookies.getItem('date'+i)))
                  var td3 = document.createElement("td")
                  td3.style.textAlign = 'center';
                  td3.appendChild (document.createTextNode(docCookies.getItem('tries'+i)))
                  row.appendChild(td1);
                  row.appendChild(td2);
                  row.appendChild(td3);
                  tbody.appendChild(row);
            }
        }
    }
    
  }

  function checkGuess()
  {
  	var userGuess = Number(guessField.value);
  	if(guessCount === 1)
  	{
  		guesses.textContent = 'Предыдущие попытки: ';
  	}

  	guesses.textContent += userGuess + ' ';

  	if(userGuess === randomNumber)
  	{
  		lastResult.textContent = 'Поздравляем! Вы угадали!';
  		lastResult.style.backgroundColor = 'green';
  		lowOrHi.textContent = '';
  		add_player();
  		add_row(1);
  		setGameOver();
  	}
  	else if(guessCount === 10)
	{
		lastResult.textContent = 'Вы исчерпали количество попыток. Игра окончена. :( '
		setGameOver();
	}
		else
		{
			lastResult.textContent = 'Неверно!';
			lastResult.style.backgroundColor = 'red';
			if(userGuess<randomNumber)
				lowOrHi.textContent = ' Ваше число меньше чем нужно';
			else
				if(userGuess>randomNumber)
					lowOrHi.textContent=' Ваше число больше чем нужно';
		}

		guessCount++;
		guessField.value = '';
		guessField.focus();
  }

  guessSubmit.addEventListener('click',checkGuess);

  function setGameOver()
  {
    // add_player();
  	guessField.disabled = true;
  	guessSubmit.disabled = true;
  	resetButton = document.createElement('button');
  	resetButton.textContent = 'Начать новую игру';
  	var myGuess = document.querySelector('.guess');
  	myGuess.appendChild(resetButton);
  	// document.body.appendChild(resetButton);
  	resetButton.addEventListener('click',resetGame);
  }
  
  function add_player()
  {
    var cur_date = new Date();
    var storDate  = new Date();
    storDate.setMonth(cur_date.getMonth()+1);
    var norm_date = cur_date.getDate()+"."+(cur_date.getMonth()+1)+"."+cur_date.getFullYear();
    if(docCookies.getItem('n_cooc'))
      n_cooc = docCookies.getItem('n_cooc');
    else
      n_cooc = 1;
    docCookies.setItem('Name'+n_cooc,user,storDate);
    docCookies.setItem('date'+n_cooc,norm_date,storDate);
    docCookies.setItem('tries'+n_cooc,guessCount,storDate);
    n_cooc++;
    docCookies.removeItem('n_cooc');
    docCookies.setItem('n_cooc',n_cooc,storDate);
  }

  function resetGame()
  {
    user = prompt('Введите ваше имя!',"player");
  	guessCount = 1;

  	var resetParas = document.querySelectorAll('.resultParas p');
  	for(var i=0;i<resetParas.length;i++)
  	{
  		resetParas[i].textContent = '';
  	}

  	resetButton.parentNode.removeChild(resetButton);

  	guessField.disabled = false;
  	guessSubmit.disabled = false;
  	guessField.value = '';
  	guessField.focus();

  	lastResult.style.backgroundColor = 'white';

  	randomNumber = Math.floor(Math.random() * 100) + 1;
  }