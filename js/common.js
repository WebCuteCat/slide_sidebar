'use strict'

$(document).ready(function() {

	var lastScrollTop = 0;

  $(window).scroll(function(event){

    var scrollTop = $(this).scrollTop(),
    		windowHeight = $(window).height(), // Высота экрана
				asideHeight = $('.sliding-block').height(), // Высота бокового меню
				contentHeight = $('.content').height(), // Высота контента
				startLine = $('.content').offset().top, // Линия начала скролла
				marginAside = parseInt($('.sliding-block').css('margin-top')), // Верхний отступ бокового меню 
				margin = $('.sliding-block').offset().top, // Отступ 
				widthAsideWrapper = $('.sliding-wrapper').width(),// Ширина обертки бокового меню
				aside = $('.sliding-block'); // Боковое меню

    var dataTop,
        dataBottom;

    if ($('.sliding-block').data('top')) {
      dataTop = $('.sliding-block').data('top');
    }
    else {
      dataTop = 0;
    }

    if ($('.sliding-block').data('bottom')) {
      dataBottom = $('.sliding-block').data('bottom');
    }
    else {
      dataBottom = 0;
    }

    if (scrollTop > lastScrollTop){
      // Скролл вниз

      if (scrollTop >= startLine + asideHeight - windowHeight + dataBottom && marginAside == 0) {
      	$(aside).addClass('bottom-fx');
        $(aside).css({
          width: widthAsideWrapper,
          position: 'fixed',
          bottom: dataBottom
        }); // Спуск вниз с самого верха
      }

      if (scrollTop + windowHeight >= startLine + contentHeight + dataBottom && marginAside == 0) {
      	$(aside).removeClass('bottom-fx');
      	$(aside).css({
      		width : 100 + '%',
      		marginTop : contentHeight - asideHeight,
          position: 'static',
          bottom: 'auto'
      	}); // Конец контента
      }

      if (scrollTop >= startLine + asideHeight - windowHeight && $(aside).hasClass('top-fx')) {
      	$(aside).removeClass('top-fx');
      	$(aside).css({
      		width : 100 + '%',
      		marginTop : margin - startLine,
          position: 'static',
          top: 'auto',
          bottom: 'auto'
      	}); // Движение вниз из середины (начало)
      }

      if (scrollTop >= margin + asideHeight - windowHeight + dataBottom && marginAside >= 1 && scrollTop + windowHeight < startLine + contentHeight) {
      	$(aside).addClass('bottom-fx');
        $(aside).css({
      		width : widthAsideWrapper,
      		marginTop: 0,
          position: 'fixed',
          bottom: dataBottom
      	}); // Движение вниз из середины (конец)
      }

    } 

    else {
      // Скролл вверх

      if (scrollTop + dataTop <= margin) {
        $(aside).addClass('top-fx');
      	$(aside).css({
      		width : widthAsideWrapper,
      		marginTop : 0,
          position: 'fixed',
          top: dataTop
      	}); // Подъем вверх с низа
      }

      if (scrollTop + dataTop <= startLine) {
      	$(aside).removeClass('top-fx');
      	$(aside).css({
      		width : 100 + '%',
      		marginTop : 0,
          position: 'static',
          top: 'auto'
      	}); // Конец подъема вверх с низа
      }

      if ($(aside).hasClass('bottom-fx')) {
      	$(aside).removeClass('bottom-fx');
      	$(aside).css({
      		width : 100 + '%',
      		marginTop : margin - startLine,
          position: 'static',
          top: 'auto',
          bottom: 'auto'
      	}); // Движение из середины в верх
      }

    }

    lastScrollTop = scrollTop;
  });
});