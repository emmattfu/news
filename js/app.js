// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "edc3d2cf768041d19a3240039eb133ea";


// Init elements
const select = document.getElementById("country");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const select2 = document.getElementById("sources");
const selectCategory = document.getElementById("category");

// All events
select.addEventListener("change", onChangeCountry);
select2.addEventListener("change", onChangeSource);
searchBtn.addEventListener("click", onSearch);
selectCategory.addEventListener("change", onChangeCategory);

// Event handlers
function onChangeCountry(e) {
  // Показываю прелодер
  ui.showLoader();

  // Делаем запрос на получение новостей по выбранной стране
  http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`, function (err, res) {
    if (!err) {
      // Пробразовываем из JSON в обычный объект
      const response = JSON.parse(res);
      // Удаляем разметку из контейнера
      ui.clearContainer();
      // перебираем новости из поля articles в объекте response
      response.articles.forEach(news => ui.addNews(news));

    } else {
      // Выводим ошибку
      ui.showError(err);
    }
  });
}


function onSearch(e) {
  // Делаем запрос на получение новостей по тому что введено в инпут
  http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, function (err, res) {
    if (err) return ui.showError(err);

    const response = JSON.parse(res);

    if (response.totalResults) {
      // Удаляем разметку из контейнера
      ui.clearContainer();
      // перебираем новости из поля articles в объекте response
      response.articles.forEach(news => ui.addNews(news));
    } else {
      ui.showInfo("По вашему запросу новостей не найдено!");
    }
  });
}

function onChangeSource(e) {
    // Показываю прелодер
    ui.showLoader();

    // Делаем запрос на получение новостей по выбраному ресурсу
    http.get(`https://newsapi.org/v2/top-headlines?sources=${select2.value}&apiKey=${apiKey}`, function (err, res) {
        if (!err) {
            // Пробразовываем из JSON в обычный объект
            const response = JSON.parse(res);
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            response.articles.forEach(news => ui.addNews(news));
            selectCategory.value = selectCategory ;
        } else {
            // Выводим ошибку
            ui.showError(err);
        }
    });
}

function onChangeCategory(e) {
    // Показываю прелодер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранной стране
    http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`, function (err, res) {
        if (!err) {
            // Пробразовываем из JSON в обычный объект
            const response = JSON.parse(res);
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            response.articles.forEach(news => ui.addNews(news));
        } else {
            // Выводим сообщение
            ui.showInfo(`Новости по категории ${selectCategory.value} по стране ${select.value} не найдены`);
        }
    });
}

