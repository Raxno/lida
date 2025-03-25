
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.track-cover').forEach(cover => {
      const audio = cover.querySelector('audio');
      const playBtn = cover.querySelector('.play-btn');
      
      // Остановка других треков при воспроизведении нового
      function stopOtherTracks(currentAudio) {
          document.querySelectorAll('audio').forEach(a => {
              if (a !== currentAudio && !a.paused) {
                  a.pause();
                  a.currentTime = 0;
                  a.parentElement.querySelector('.play-btn').textContent = '▶';
              }
          });
      }
      
      playBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          stopOtherTracks(audio);
          
          if (audio.paused) {
              audio.play();
              playBtn.textContent = '❚❚';
          } else {
              audio.pause();
              playBtn.textContent = '▶';
          }
      });
      
      audio.addEventListener('ended', function() {
          playBtn.textContent = '▶';
      });
  });
});

// показ карточек и кнопки перелистывания
document.addEventListener('DOMContentLoaded', function() {
  // Получаем все необходимые элементы
  const tracksWrap = document.querySelector('.tracks__wrap');
  const prevBtn = document.querySelector('.btn-prev');
  const nextBtn = document.querySelector('.btn-next');
  const allTracks = document.querySelectorAll('.track');
  const tracksPerPage = 3;
  let currentPage = 0;
  const totalPages = Math.ceil(allTracks.length / tracksPerPage);

  // Функция для обновления отображаемых треков
  function updateVisibleTracks() {
      // Сначала скрываем все треки
      allTracks.forEach(track => {
          track.classList.remove('track-active');
      });

      // Показываем только треки текущей страницы
      const startIndex = currentPage * tracksPerPage;
      const endIndex = startIndex + tracksPerPage;
      
      for (let i = startIndex; i < endIndex; i++) {
          if (allTracks[i]) {
              allTracks[i].classList.add('track-active');
          }
      }

      // Обновляем состояние кнопок
      prevBtn.classList.toggle('disabled', currentPage === 0);
      nextBtn.classList.toggle('disabled', currentPage === totalPages - 1);
  }

  // Обработчик для кнопки "Назад"
  prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage > 0) {
          currentPage--;
          updateVisibleTracks();
      }
  });

  // Обработчик для кнопки "Вперед"
  nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage < totalPages - 1) {
          currentPage++;
          updateVisibleTracks();
      }
  });

  // Инициализация при загрузке
  updateVisibleTracks();

  // Добавляем стиль для неактивных кнопок
  const style = document.createElement('style');
  style.textContent = `
      .button.disabled {
          opacity: 0.5;
          pointer-events: none;
          cursor: not-allowed;
      }
  `;
  document.head.appendChild(style);
});


document.addEventListener('DOMContentLoaded', function() {
  // Элементы
  const searchInput = document.querySelector('.shop__search');
  const categoryButtons = document.querySelectorAll('.search__item');
  const wearItems = document.querySelectorAll('.wear__item');

  // Делаем кнопку "Все" активной по умолчанию
  document.querySelector('.search__item[data-category="all"]').classList.add('active');

  // Поиск по тексту в wears__title
  searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      const activeCategory = document.querySelector('.search__item.active').dataset.category;
      
      wearItems.forEach(item => {
          const itemTitle = item.querySelector('.wears__title').textContent.toLowerCase();
          const itemCategory = item.dataset.category;
          const matchesSearch = itemTitle.includes(searchTerm);
          const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
          
          item.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
      });
  });

  // Фильтрация по категориям
  categoryButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Удаляем активный класс у всех кнопок
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          // Добавляем активный класс текущей
          this.classList.add('active');
          
          const category = this.dataset.category;
          const searchTerm = searchInput.value.toLowerCase().trim();
          
          wearItems.forEach(item => {
              const itemTitle = item.querySelector('.wears__title').textContent.toLowerCase();
              const itemCategory = item.dataset.category;
              const matchesSearch = itemTitle.includes(searchTerm);
              const matchesCategory = category === 'all' || itemCategory === category;
              
              item.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
          });
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('headerNav');
  
  burger.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('lock');
  });
  
  // Закрытие при клике на ссылку
  document.querySelectorAll('.header__item').forEach(link => {
      link.addEventListener('click', () => {
          burger.classList.remove('active');
          nav.classList.remove('active');
          document.body.classList.remove('lock');
      });
  });
  
  // Закрытие при клике вне меню
  document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
          burger.classList.remove('active');
          nav.classList.remove('active');
          document.body.classList.remove('lock');
      }
  });
});