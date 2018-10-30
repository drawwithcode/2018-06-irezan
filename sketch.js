var movieData;
var allMovies = [];
var allGenres = [];
var clicked = false;
var defaultColor = '#666666';
var clickedMovie = null;
var currentGenre = null;
var dataFields = ['Title',
                  'Genre',
                  'Description',
                  'Director',
                  'Year'
                ];
var genres = ['Action',
              'Animation',
              'Comedy',
              'Drama',
              'Fantasy',
              'History',
              'Horror',
              'Sci-Fi'
            ];
var colors = ['#009CDF',
              '#F78200',
              '#FF99CC',
              '#973999',
              '#5EBD3E',
              '#FFB900',
              '#E23838',
              '#0052CC'
            ];

function preload() {
  movieData = loadTable('./csv/MovieData.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var csvTable = movieData.getObject();
  //Create movieObj for item in table
  for (var rowIndex in csvTable) {
    var row = csvTable[rowIndex];
    var obj = new movieObj(row['Title'],
      row['Genre'],
      row['Description'],
      row['Director'],
      row['Year']);
    allMovies.push(obj);
  }
  //Create genreObj for genre
  for (var i = 0; i < genres.length; i++) {
    var obj = new genreObj(genres[i], colors[i]);
    allGenres.push(obj);
  }
}

function draw() {
  if (clicked) {
    background(40);

    fill(color(clickedMovie.color));
    ellipse(0.3 * width, 0.5 * height, 0.1 * Math.max(width, height));
    displayInfo(clickedMovie);
  } else {
    background(40);
    for (var i = 0; i < 11; i++) {
      var grey = 42 + (i % 2) * 2;
      noStroke();
      fill(grey);
      rect((0.17 + i * 0.06) * width, 0.19 * height, 0.06 * width, 0.67 * height);
    }

    for (var index in allMovies) {
      var movie = allMovies[index];
      if (movie.x == 0 && movie.y == 0 && movie.radius == 0) {
        var xPos = map(movie.year, 2006, 2016, 0.20 * width, 0.80 * width);
        xPos += (Math.random() - 0.5) * 2 * 0.6 * 0.045 * width;
        var yPos = Math.random() * 0.65 * height + 0.2 * height;
        movie.x = xPos;
        movie.y = yPos;
        movie.radius = 0.005 * Math.min(width, height);
      }
      fill(color(movie.color));
      ellipse(movie.x, movie.y, movie.radius);
    }

    for (var index in allGenres) {
      var genre = allGenres[index];
      var name = genre.name;
      textSize(width / 75);
      var x = index % 4;
      var y = Math.floor(index / 4);
      var posX = 0.275 * width + x * 0.15 * width;
      var posY = 0.90625 * height + y * 0.0375 * height;
      genre.x = posX;
      genre.y = posY;
      fill(color(genre.color));
      textAlign(CENTER);
      text(name, posX, posY);
    }
  }

  stroke(150);
  fill(150);

  var appTitle = 'Ten Years of Movies';
  textFont('Montserrat');
  textAlign(CENTER);
  textSize(width / 25);
  text(appTitle, width / 2, height / 10);

  stroke(70);
  var appYears = '- from 2006 to 2016 -';
  textFont('Montserrat');
  textAlign(CENTER);
  textSize(width / 75);
  text(appYears, width / 2, height / 7);
}

function movieObj(_title, _genre, _desc, _director, _year) {
  this.title = _title;
  this.genre = _genre;
  this.desc = _desc;
  this.director = _director;
  this.year = _year;

  this.color = '#666666';

  this.x = 0;
  this.y = 0;
  this.radius = 0;

}

function genreObj(_name, _color) {
  this.name = _name;
  this.color = _color;

  this.x = 0;
  this.y = 0;
}

function displayInfo(clickedMovie) {
  var ref = height; //Math.max(width, height);
  stroke(200);
  fill(200);
  textLeading(ref / 20);
  textAlign(CENTER);
  var x = 0.575 * width;
  var y = 0.25 * height;
  var stepY = 0.045 * ref;
  //title
  var title = clickedMovie.title;
  textSize(ref / 50);
  text(title, x, y + (stepY * 0.5), 0.25 * width, 0.065 * height);
  //director
  textAlign(LEFT);
  var director = 'Director:\n' + clickedMovie.director;
  textSize(ref / 75);
  text(director, x, y + (stepY * 2), 0.25 * width, 0.065 * height);
  //year
  var year = 'Year:\n' + clickedMovie.year;
  textSize(ref / 75);
  text(year, x, y + (stepY * 3), 0.25 * width, 0.065 * height);
  //genre
  var genre = 'Genre:\n' + clickedMovie.genre;
  textSize(ref / 75);
  text(genre, x, y + (stepY * 4), 0.25 * width, 0.065 * height);
  //desc
  var desc = 'Description:\n' + clickedMovie.desc;
  textSize(ref / 75);
  text(desc, x, y + (stepY * 5), 0.25 * width, 0.39 * height);

  //return
  stroke(70);
  fill(70);
  var back = '- back -';
  textSize(ref / 80);
  textAlign(CENTER);
  text(back, width / 2, 0.925 * height);
}

function coloredGenre() {
  for (var index in allGenres) {
    var genre = allGenres[index];
    var dX = dist(mouseX, 0, genre.x, 0);
    var dY = dist(0, mouseY, 0, genre.y);
    if (dY < 0.01 * height && dX < 0.025 * width) {
      if (currentGenre == genre) {
        currentGenre = null;
      } else {
        currentGenre = genre;
      }
      for (var index in allMovies) {
        var movie = allMovies[index];
        if (movie.genre == currentGenre.name) {
          movie.color = currentGenre.color;
        } else {
          movie.color = defaultColor;
        }
      }
    }
  }
}

function mousePressed() {
  if (clicked) {
    var dX = dist(mouseX, 0, width / 2, 0);
    var dY = dist(0, mouseY, 0, 0.925 * height);
    if (dY < 0.01 * height && dX < 0.015 * width) {
      clickedMovie = null;
      clicked = false;
    }
  } else {
    for (var index in allMovies) {
      var movie = allMovies[index];
      var d = dist(mouseX, mouseY, movie.x, movie.y);
      if (d < movie.radius) {
        clickedMovie = movie;
        clicked = true;
      }
    }
  }
  coloredGenre();
}
