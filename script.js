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
      //variables created for code below
      var questionIndex = 0;
      var time = 100;
      var $timer = document.querySelector("#timer");
      
      //decrements time from time variable created above
      //TODO: add stop timer conditional
      //TODO: add clearInterval 
      //TODO: restart quiz and add name for high score
      //TODO: add save info function
      $timer.textContent = time;
      var timer = setInterval(function () {
        time--;
        $timer.textContent = time;                                            
      }, 1000);
      
      console.log(questions[4].answers[1])
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

      document
       .querySelector("#answers")
       .addEventListener("click", function(e) {
         if (!e.target.matches("button")) return;
         questionIndex++;
         renderQuestion();
        });
      renderQuestion();