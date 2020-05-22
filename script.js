      

      var questionContainer = document.getElementById("question-container");
      var startButton = document.createElement("button");
      var question = document.getElementById("question");
      var answers = document.getElementById("answers");
      questionContainer.appendChild(startButton);
      startButton.innerText = ("Start");
      startButton.setAttribute("class", "bg-danger pl-5 pr-5 pt-3 pb-3 rounded");
      
      
      startButton.addEventListener("click", function(){
        
        var body = document.getElementById("body");
        var containerFluid = document.getElementById("container-fluid");
        var divLeft = document.getElementById("divLeft");
        var divMid = document.getElementById("divMid");
        var divRight = document.getElementById("divRight");
        var h1 = document.getElementById("h1");
        var questionContainer = document.getElementById("question-container");

        body.setAttribute("class", "bg-danger");
        containerFluid.setAttribute("class", "container-fluid");
        divLeft.setAttribute("class", "col-md-3");
        divMid.setAttribute("class", "col-md-6 text-center pt-5 pb-100 bg-secondary");
        h1.setAttribute("class", "text-center");
        questionContainer.setAttribute("class", "text-center")
        divRight.setAttribute("class", "col-md-3");
        
        h1.innerText = ("Go!");
        questionContainer.innerHTML = ("")
        questionContainer.appendChild(question);
        questionContainer.appendChild(answers);


        
        // Variables to be used:
        // The array of questions for our quiz game.
        var questions = [
          { question: "The sky is blue.", answers: ["True", "False"], correctAnswer: "True",},
          { question: "There are 365 days in a year.", answers: ["True", "False"], correctAnswer: "True",},
          { question: "There are 16 ounces in a pound.", answers: ["True", "False"], correctAnswer: "True",},
          { question: "The Declaration of Independence was created in 1745.", answers: ["True", "False"], correctAnswer: "False",},
          { 
            question: "Bananas are not vegetables.", 
            answers: ["True", "False"], 
            correctAnswer: "True",
          },
        ];
        
        //TODO: restart quiz and add name for high score
        //TODO: add save info function
        
        
        //variables created for timer
        var questionIndex = 0;
        var timerDiv = document.querySelector("#timer");
        var time = 100;
        //decrements time from time variable created above
        
        timerDiv.textContent = time;
        
        var timer = setInterval(function () {
          time--;
          timerDiv.textContent = time;
          
          //added stop timer conditional
          //added clearInterval 
            if(time === 0) {
              clearInterval(timer);
            }                                         
          }, 1000);
      
      
      function renderQuestion() {
        var question = questions[questionIndex];
        var $question = document.querySelector("#question");
        var $answers = document.querySelector("#answers");
        $question.textContent = question.question;
        $answers.innerHTML = "";
        
        for (var i = 0; i < question.answers.length; i++) {
          var $btn = document.createElement("button");
          $btn.textContent = question.answers[i];
          $btn.setAttribute("class", "btn btn-primary ml-3 mt-3 pl-5 pr-5");
          $answers.append($btn);
        }
      };
      
      document.querySelector("#answers").addEventListener("click", function(e) {
        if (!e.target.matches("button")) return;
        questionIndex++;
        renderQuestion();
      });
      renderQuestion();
      
    });
    