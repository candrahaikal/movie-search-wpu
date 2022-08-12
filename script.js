// fetch -> API pada javascript modern yang berfungsi untuk mengambil data secara asynchronous
// studi kasus menggunakan project API film sebelumnya

// $('.search-button').on('click', function() {
//   $.ajax({
//     url:'http://www.omdbapi.com/?apikey=dca61bcc&s='+ $('.input-keyword').val(),
//     success: results => {
//       const movies = results.Search;
//       let cards = '';
  
//       movies.forEach(card => {
//         cards += showCards(card);
//       })
  
//       $('.movie-container').html(cards);
  
//       // tombol detail ditekkan
//       $('.modal-detail-button').on('click', function() {
//         $.ajax({
//           url: 'http://www.omdbapi.com/?apikey=dca61bcc&i='+ $(this).data('imdbid'),
//           success: item => {
//             const movieDetail = showMovieDetail(item);
  
//             $('.modal-body').html(movieDetail)
//           },
//           error: error => {
//             console.log(error.response);
//           }
//         })
//       })
//     },
  
//     error: error => {
//       console.log(error.response);
//     }
  
//   })
// })



// fetch
// event handler saat tombol search ditekan
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', function(){
  const inputKeyword = document.querySelector('.input-keyword');
  fetch('https://www.omdbapi.com/?apikey=dca61bcc&s='+inputKeyword.value)
    .then(response => response.json())
    .then(response => {
      const movies = response.Search;
      let cards = '';

      // looping tiap item dan tambahkan ke cards
      movies.forEach(movie => cards += showCards(movie));

      // masukkan ke html
      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = cards;

      // saat tombol detail ditekan
      const modalDetailButton = document.querySelectorAll('.modal-detail-button');

      modalDetailButton.forEach(button => {
        button.addEventListener('click', function() {
          const imdbid = this.dataset.imdbid;
          fetch('https://www.omdbapi.com/?apikey=dca61bcc&i=' + imdbid)
            .then(response => response.json())
            .then(response => {
              
              const movieDetail = showMovieDetail(response);

              // tambah ke html
              const modalBody = document.querySelector('.modal-body');
              modalBody.innerHTML = movieDetail;
            })
          
        })
      
      })
    });
})





// function
function showCards(card){
  return `<div class="col-md-4 my-4 ">
            <div class="card"> 
                <img src="${card.Poster}" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title">${card.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${card.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${card.imdbID}">Show Details</a>
                  </div>
              </div>
          </div>`
}

function showMovieDetail(item){
  return  `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${item.Poster}" alt="" class="img-fluid">
                </div>
                  <div class="col-md">
                    <ul class="list-group">
                      <li class="list-group-item"><h4>${item.Title} (${item.Year})</h4></li>
                      <li class="list-group-item"><strong>Director : </strong> ${item.Director}</li>
                      <li class="list-group-item"><strong>Actors : </strong> ${item.Actors}</li>
                      <li class="list-group-item"><strong>Writer : </strong> ${item.Writer}</li>
                      <li class="list-group-item"><strong>Plot : </strong> <br> ${item.Plot}</li>
                    </ul>
                  </div>
              </div>
          </div>`
}

