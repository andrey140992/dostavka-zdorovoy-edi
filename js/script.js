


window.addEventListener("DOMContentLoaded", ()  => {

    const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items');





         function hideTabContent(){
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });
    
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
    
    
        }      

function showTabContent( i = 0 ){
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active')
   
};


hideTabContent();
showTabContent();


tabsParent.addEventListener('click', ( event ) => {

    const target = event.target;

    if(target && target.classList.contains('tabheader__item')){

        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            };

        });
    };
});





// Timer

const deadLine = '2022-06-10';


function getTimeRemaining(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t/ (1000*60*60*24)),
          hours= Math.floor((t / 1000*60*60) % 24),
          minutes = Math.floor((t / 1000 / 60)% 60),
          seconds = Math.floor((t / 1000)%60);

    return{
        'total' : t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };
         

};


function setClock(selector, endtime){

    const timer = document.querySelector('selector'),
          days = document.querySelector('#days'),
          hours = document.querySelector('#hours'), 
          minutes = document.querySelector('#minutes'), 
          seconds = document.querySelector('#seconds'),
          timeInterval = setInterval(upDateClock, 1000);



    function upDateClock(){
       const t = getTimeRemaining(endtime);

        days.innerHTML = t.days;
        hours.innerHTML = t.hours;
        minutes.innerHTML = t.minutes;
        seconds.innerHTML = t.seconds;

        if(t.total <= 0){
            clearInterval(timeInterval);
        }

    };
             

};

    setClock(".timer", deadLine);


    //Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');


      modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)
      });

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }  

    function closeModal(){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
    }
 

 modalCloseBtn.addEventListener('click',closeModal);

 
 modal.addEventListener('click', (e) => {
    if(e.target === modal){
          closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.code ==="Escape" && modal.classList.contains('show')){
        closeModal();
    }
  });

const modalTimerId = setTimeout(openModal, 5000);

function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
    }
};


    window.addEventListener('scroll', showModalByScroll);


  //  Импользуем классы для карточек

  class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, transfer, ...classes){
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.parent = document.querySelector(parentSelector);
          this.transfer = transfer;
          this.classes = classes;
          this.transferToUah();

      }

      transferToUah(){
          this.price = this.price * this.transfer;
        }

      render(){
          const element = document.createElement('div');
          
          if(this.classes.length === 0){ 
            this.classes = "menu__item";
              element.classList.add(this.classes);
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }
         
          element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
          this.parent.append(element);
      }
  }

   new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    1,
    '.menu .container',
    '65',
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    2,
    '.menu .container',
    '65',
    "menu__item"
  ).render();


  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    3,
    '.menu .container',
    '65',
  ).render();

//forms

const forms = document.querySelectorAll('form');


const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свяжемся.',
    failure: 'Что то пошло не так...'

};
      
forms.forEach(item =>{
    postData(item);
});

    function postData(forms) {
        forms.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            forms.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');    
            const formData = new FormData(forms);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });


            const json = JSON.stringify(object);

            request.send(json);



            request.send(formData);

            request.addEventListener('load', () => {
                if(request.status === 200){
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                }else{
                    statusMessage.textContent = message.failure;
                }
            });

        });
    }


  
});












