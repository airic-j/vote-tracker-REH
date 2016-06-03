
  var photoArray = [];

  function storeData(blah) {
      var voteCount = JSON.stringify(blah);
      localStorage.setItem('votes', voteCount);
  }

  var Tracker = {
      clownVote: 0,
      dogVote: 0,
      germVote: 0,
      heightsVote: 0,
      kittenVote :  0,
      lightningVote: 0,
      needleVote: 0,
      snakeVote: 0,
      spiderVote: 0
  };
  function getData(key) {

      var storedVotes = localStorage.getItem(key);
      var parseVotes = JSON.parse(storedVotes);
      console.log(parseVotes);
      if (parseVotes != null){

          Tracker.clownVote = parseVotes.clownVote;
          Tracker.dogVote = parseVotes.dogVote;
          Tracker.germVote = parseVotes.germVote;
          Tracker.heightsVote = parseVotes.heightsVote;
          Tracker.kittenVote = parseVotes.kittenVote;
          Tracker.lightningVote = parseVotes.lightningVote;
          Tracker.needleVote = parseVotes.needleVote;
          Tracker.snakeVote = parseVotes.snakeVote;
          Tracker.spiderVote = parseVotes.spiderVote;
       }

  }
  getData('votes');

  var Photo = function(options) {
    this.fear = options.fear;
    this.picLink =  options.picLink;
  }

  $.ajax({
    type: 'GET',
    url: 'data.json',
    success: function(data) {
      data.forEach(function(fear){
        var photo = new Photo(fear);
        photoArray.push(photo);
      })
      randomPic();
    }
  });


  var getRandomNum = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function randomPic() {
      console.log('randomPic runs!');
      var i1 = getRandomNum(0, photoArray.length -1);
      var i2 = getRandomNum(0, photoArray.length -1);
      console.log('i1 = ' +  i1 +' i2 = ' + i2);
      randPic1 = photoArray[i1];
      randPic2 = photoArray[i2];
      if (randPic1 != null && randPic2 != null){
          while(randPic1.fear === randPic2.fear)
          {
              i1 = getRandomNum(0, photoArray.length -1);
              i2 = getRandomNum(0, photoArray.length -1);
              randPic1 = photoArray[i1];
              randPic2 = photoArray[i2];
              console.log('photos fear are the same get new random');
              console.log('i1 = ' +  i1 +' i2 = ' + i2);
          }
          var pic1 = document.getElementById('picFrame1');
          var pic2 = document.getElementById('picFrame2');

          pic1.innerHTML = randPic1.picLink;
          pic1.className = randPic1.fear;

          pic2.innerHTML = randPic2.picLink;
          pic2.className = randPic2.fear;

      }
  }
  var ratePic = function(e,picFrame) {
       e.preventDefault();
       console.log(e);

       console.log('pic clicked');
       var pic = document.getElementById(picFrame);
       console.log(pic.className);
       switch (pic.className){
           case 'clown':
               Tracker.clownVote += 1;
               break;
           case 'dog':
               Tracker.dogVote += 1;
               break;
           case 'germ':
               Tracker.germVote += 1;
               break;
           case 'heights':
               Tracker.heightsVote += 1;
               break;
           case 'kitten':
               Tracker.kittenVote += 1;
               break;
           case 'lightning':
               Tracker.lightningVote += 1;
               break;
           case 'needle':
               Tracker.needleVote += 1;
               break;
           case 'snake':
               Tracker.snakeVote += 1;
               break;
           case 'spider':
               Tracker.spiderVote += 1;
               break;

       }
       randomPic();
  }


  $('.box').on('click',function(e) {
    var picFrame = $(this).attr('id');
    ratePic(e,picFrame);
    makeChart();
  })



  function makeChart(){
      var data = [
      {
          value: Tracker.clownVote,
          label: 'Clowns',
          color: '#811BD6',
          id: 'clownTotal',
      },
      {
          value: Tracker.dogVote,
          label: 'dog',
          color: '#B2B2B2',
          id: 'dogTotal',
      },
      {
          value: Tracker.germVote,
          label: 'germ',
          color: '#006600',
          id: 'germTotal',
      },
      {
          value: Tracker.heightsVote,
          label: 'heights',
          color: '#6699FF',
          id: 'heightsTotal',
      },
      {
          value: Tracker.kittenVote,
          label: 'kitten',
          color: '#FF3399',
          id: 'kittenTotal',
      },
      {
          value: Tracker.lightningVote,
          label: 'lightning',
          color: '#FFFF00',
          id: 'lightningTotal',
      },
      {
          value: Tracker.needleVote,
          label: 'needle',
          color: '#FF3300',
          id: 'needleTotal',
      },
      {
          value: Tracker.snakeVote,
          label: 'snake',
          color: '#669900',
          id: 'snakeTotal',
      },
      {
          value: Tracker.spiderVote,
          label: 'spider',
          color: '#855C33',
          id: 'spiderTotal',
      },
      ];

      data.forEach(function(fear) {
        document.getElementById(fear.id).innerHTML = fear.value;
      })

      var context = document.getElementById('fearChart').getContext('2d');
      var fChart = new Chart(context).Pie(data,{
          animationSteps: 30,
          animationEasing: "easeOutBounce",
          animationRotate: true,
          animationScale: true
      });
      storeData(Tracker);

  }

 hideChart = function() {
  $('#fearChart').css("visibility", "hidden");
};

 showChart = function() {
   $('.box').on('click', function() {
     console.log('box clicked');
     $('#fearChart').css("visibility", "visible");
   })
 };

  hideChart();
  showChart();
  makeChart();
  randomPic();
