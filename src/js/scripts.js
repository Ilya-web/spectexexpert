import Modal from 'bootstrap/js/dist/modal';
import Tab from 'bootstrap/js/dist/tab';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import noUiSlider from 'nouislider';
import IMask from 'imask';
import {tns} from '../../node_modules/tiny-slider/src/tiny-slider';


import $ from 'jquery';


// Global jQuery variables
global.jQuery = $;
global.$ = $;

document.addEventListener('DOMContentLoaded', function(){


  //filter-menu-------------------------------------------------------------

  $('.btn-drop-menu').on('click', function () {
    const parentLi = $(this).parent('.has-drop-menu');

    if(parentLi.hasClass('active')) {
      parentLi.removeClass('active')
      parentLi.find('.filter-drop-menu').eq(0).addClass('active').slideUp();
    }
    else {
      parentLi.addClass('active')
      parentLi.find('.filter-drop-menu').eq(0).addClass('active').slideDown();
    }
  })


  // zoom image--------------------------------------------------------------
  let options1 = {
    width: 400,
    zoomWidth: 500,
    offset: {vertical: 0, horizontal: 10},
    zoomPosition: "original"
  };
  const zoomImg = document.querySelectorAll(".img-container")
  zoomImg.forEach( img => {
    new ImageZoom(img, options1);
  })




  // search input--------------------------------------------------------------
  const inputSearch = document.querySelectorAll('.input-search')

  inputSearch.forEach(input => {
    input.addEventListener('input' ,function () {
      searchInput(input)
    })
  })

  function searchInput(input) {
    let inputItem = input.parentElement.querySelector('.clear-btn');

    if(input.value.length > 0) {
      inputItem.classList.add('active')
    }
    else {
      inputItem.classList.remove('active')
    }
  }


  //header-search-clear--------------------------------------------------------
  const searchClear = document.querySelectorAll('.clear-btn')
  searchClear.forEach(btn => {
    btn.addEventListener('click' ,function () {
      btnClearSearch(btn)
    })
  })

  function btnClearSearch(btn) {
    btn.parentElement.querySelector('.input-search').value = '';
    btn.classList.remove('active')
  }



  //modal -----------------------------------------------------------------
  //thanksModal.show(); open modal for js
  const thanksModal = new Modal(document.getElementById('thanksModal'));

  let windowWidth = window.innerWidth;

  // window.addEventListener('resize', function () {
  //   windowWidth = window.innerWidth;
  //
  //   if(windowWidth > 992) {
  //     desktopMenu();
  //   }
  //   else {
  //     mobileMenu();
  //   }
  // })


  jQuery(document).ready(function() {
    jQuery(".main-table").clone(true).appendTo('#table-scroll').addClass('clone');
  });

  //menu desktop -----------------------------------------------------------------
  const dropLi = document.querySelectorAll('.drop-li');
  
  $('.drop-li .chevron').on('click', function (e) {
    if($(this).parent('.drop-li').hasClass('active')) {
      $(this).parent('.drop-li').removeClass('active')
      $(this).next('.drop-menu').slideUp()
    } else {
      $(this).parent('.drop-li').addClass('active')
      $(this).next('.drop-menu').slideDown()
    }

  })
  // const mobileMenuClose = document.querySelectorAll('.mobile-menu-close');
  //
  // if(windowWidth > 992) {
  //   // desktopMenu();
  // }
  // else {
  //   mobileMenu();
  // }
  //
  // // function desktopMenu() {
  // //   dropLi.forEach(li => {
  // //     li.addEventListener('mouseenter', mouseEnter)
  // //   })
  // //   dropLi.forEach(li => {
  // //     li.addEventListener('mouseleave', mouseLeave)
  // //   })
  // // }
  //
  // function mouseEnter(e) {
  //   e.target.classList.add('active')
  // }
  // function mouseLeave(e) {
  //   e.target.classList.remove('active')
  // }

  // function mobileMenu() {
  //   dropLi.forEach(li => {
  //     li.addEventListener('click', (e) => {
  //       if (e.target.closest('.mobile-menu-close')) return;
  //       li.classList.add('active');
  //
  //     })
  //     // li.removeEventListener('mouseenter', mouseEnter)
  //     // li.removeEventListener('mouseleave', mouseLeave)
  //   })
  //
  //   mobileMenuClose.forEach(btn => {
  //     btn.addEventListener('click', () => {
  //       // btn.parentNode.parentNode.classList.remove('active')
  //       btn.parentElement.parentElement.classList.remove('active')
  //     })
  //   })
  // }


  //catalog-menu-btn -------------------------------------------------
  const openMenu = document.querySelector('.open-menu');

  if ( document.querySelectorAll(".open-menu").length ) {
    openMenu.addEventListener('click', () => {
      openMenu.nextElementSibling.classList.toggle('active')
      openMenu.classList.toggle('active')
      dropLi.forEach(li => {
        li.classList.remove('active');
      })
    })
  }

  document.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.open-menu')) return;
    if (target.closest('.catalog-menu ')) return;

    if(openMenu) {
      openMenu.classList.remove('active');
      openMenu.nextElementSibling.classList.remove('active');
    }
    dropLi.forEach(li => {
      li.classList.remove('active');
    })
  });


  //card delivery options -------------------------------------------------------
  const link = document.querySelectorAll('.card-calc_link')
  const container = document.querySelector('.card-calc')

  link.forEach(item =>{
    item.addEventListener('click', () => {
      slideBox(item,container)
    })
  })


  const slideLink = document.querySelectorAll('.slide-link')
  const slideContainer = document.querySelector('.coupon-form')

  slideLink.forEach(item =>{
    item.addEventListener('click', (e) => {
      e.preventDefault()
      slideBox(item,slideContainer)
    })
  })


  // slideUp && slideDown--------------------------------------------------------
  function slideBox(linkBtn,container) {
    linkBtn.classList.toggle('active');

    if(!container.classList.contains('active')) {
      container.classList.add('active')
      container.style.height = "auto"
      let height = container.clientHeight + "px"
      container.style.height = "0px"
      setTimeout(() => {
        container.style.height = height
      }, 0)

    } else {
      container.style.height = "0px"
      container.addEventListener('transitionend', () => {
        container.classList.remove('active')
      }, {once: true})
    }
  }




  // count -----------------------------------------------------------------------
  let count = document.querySelector('.count');
  let plus = document.querySelectorAll('.count-plus')
  let minus = document.querySelectorAll('.count-minus');
  let countInput = document.querySelectorAll('.count-input');

  let value;

  plus.forEach(item =>{
    item.addEventListener('click', (e)=> {
      e.preventDefault()
      let input = item.previousElementSibling.value;
      value = parseFloat(input);
      item.previousElementSibling.value = value + 1;
      removeDisabled('.update-card .btn-site')
    })

  })

  minus.forEach(item =>{
    item.addEventListener('click', (e)=> {
      e.preventDefault()
      let input = item.nextElementSibling.value;
      if(input > 1) {
        value = parseFloat(input);
        item.nextElementSibling.value = value - 1;
        removeDisabled('.update-card .btn-site')
      }

    })
  })

  function removeDisabled(link) {
    const btn = document.querySelector(link);
    if(btn && btn.classList.contains('disabled')) {
      btn.classList.remove('disabled');
    }
  }



  // mainSlider init --------------------------------------------------------------
  if ( document.querySelectorAll(".main-slider").length ) {
    const mainSlider = tns({
      container: '.main-slider',
      items: 1,
      slideBy: 'page',
      dots: true,
      controls: false,
      mouseDrag: false,
      swipeAngle: false,
    });
  }


  // mainSlider init --------------------------------------------------------------
  if ( document.querySelectorAll(".product-slider").length ) {
    const mainSlider = tns({
      container: '.product-slider',
      items: 1,
      controlsContainer: "#customize-controls",
      navContainer: "#customize-thumbnails",
      navAsThumbnails: true,
      controls: false,
      swipeAngle: false,
      speed: 400,
      mouseDrag: false,
      margin: 20
    });

  }


  // mask tel---------------------------------------------------------------------
  const phoneMaskSelector = 'input[type="tel"]';
  const phoneMaskInputs = document.querySelectorAll(phoneMaskSelector);

  const masksOptions = {
    phone: {
      mask: '+{7} (000) 000-00-00'
    }
  };

  for(const item of phoneMaskInputs) {
    new IMask(item, masksOptions.phone);
  }

  // range slider------------------------------------------------------------------
  let slider = document.getElementById('range-slider');
  let input0 = document.getElementById('startVal');
  let input1 = document.getElementById('endVal');
  let inputs = [input0, input1];

  if(slider) {

    noUiSlider.create(slider, {
      start: [0, 100],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    });

    slider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = values[handle] + '₽';
    });
  }

  $(document).on('af_complete', function(event, response) {
    var form = response.form;

    //Форма напиши нам
    if (response.success && form.attr('id') == 'write_to') {
      thanksModal.show();
    }

  });



});

$(function(){
  $('.ajax_form').append('<input type="text" name="org" value="" class="_org" style="visibility:hidden; height: 0; width: 0; padding: 0; border:none;"/>')
})

