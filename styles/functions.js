$( document ).ready(function() {

  // 1. Navigation 3D (Ouverture/Fermeture Menu)
  function navigation() {
    $('.header--nav-toggle').click(function() {
      $('.perspective').addClass('effect-rotate-left--animate');
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');
    });

    $('.outer-nav--return, .outer-nav li').click(function() {
      $('.perspective').removeClass('effect-rotate-left--animate');
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');
    });
  }

  // 2. Slider de la section Work (Équipe)
  function workSlider() {
    $('.slider--prev, .slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.slider').find('.slider--item-left'),
          curLeftPos = $('.slider').children().index(curLeft),
          curCenter = $('.slider').find('.slider--item-center'),
          curCenterPos = $('.slider').children().index(curCenter),
          curRight = $('.slider').find('.slider--item-right'),
          curRightPos = $('.slider').children().index(curRight),
          totalWorks = $('.slider').children().length,
          $left = $('.slider--item-left'),
          $center = $('.slider--item-center'),
          $right = $('.slider--item-right'),
          $item = $('.slider--item');

      $('.slider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left').next().addClass('slider--item-left');
          $center.removeClass('slider--item-center').next().addClass('slider--item-center');
          $right.removeClass('slider--item-right').next().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
          $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
          $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
          }
        }
      }

      }, 400);

      $('.slider').animate({ opacity : 1 }, 400);

    });
  }

  // 3. Transition entre les sections
  function sectionTransition() {
    $('.side-nav li, .outer-nav li').click(function() {
      if (!$(this).hasClass('is-active')) {
        var $this = $(this),
            $parentNode = $this.parent(),
            index = $parentNode.children().index($this),
            $viewport = $('.l-viewport'),
            $section = $('.l-section');

        if ($parentNode.hasClass('side-nav')) {
          $('.side-nav li').removeClass('is-active');
          $('.outer-nav li').removeClass('is-active');
          $this.addClass('is-active');
          $('.outer-nav li').eq(index).addClass('is-active');
        } else {
          $('.outer-nav li').removeClass('is-active');
          $('.side-nav li').removeClass('is-active');
          $this.addClass('is-active');
          $('.side-nav li').eq(index).addClass('is-active');
        }

        // Transition CSS gérée par .l-section--is-active
        $section.removeClass('l-section--is-active');
        $section.eq(index).addClass('l-section--is-active');
      }
    });
  }

  // 4. Gestion du formulaire de contact (Input Focus)
  function workRequest() {
    $('.work-request--information input').focusout(function() {
      var textVal = $(this).val();
      if (textVal === "") {
        $(this).removeClass('has-value');
      } else {
        $(this).addClass('has-value');
      }
    });
  }

  // 5. Gestion des clics sur les cartes Hire (UX améliorée)
  function hireCards() {
    $('.hire-card').click(function(e) {
      // Si l'utilisateur clique sur un bouton spécifique, on laisse l'événement natif
      if ($(e.target).closest('a').length) return;

      // Sinon, on déclenche le premier bouton d'action (WhatsApp)
      var $action = $(this).find('.hire-btn.whatsapp');
      if ($action.length) window.open($action.attr('href'), '_blank');
    });
  }

  // Initialisation
  navigation();
  workSlider();
  sectionTransition();
  workRequest();
  hireCards();

});