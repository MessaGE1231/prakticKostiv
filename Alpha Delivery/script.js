let citys = ['Москва', 'Великий Новгород', 'Нижний Новгород', 'Санкт-Петербург', 'Луга']
let predpr = [{
    id: 1,
    city: 'Москва',
    name: 'Папа Джонс',
    img: '#',
    adr: 'ул.Ломоносова, д.15, корпус 1',
    menu: [{
        pos: 1,
        name: 'Лимонад',
        cost: '300р',
        img: '#'
    }, {
        pos: 2,
        name: 'Пицца',
        cost: '1000р',
        img: '#'
    }]
}, {
    id: 2,
    city: 'Великий Новгород',
    name: 'Кафе Каприз',
    img: '#',
    adr: 'ул.Домодедова, д.20, корпус 3',
    menu: [{
        pos: 1,
        name: 'Пиво',
        cost: '300р',
        img: '#'
    }, {
        pos: 2,
        name: 'Макароны',
        cost: '1000р',
        img: '#'
    }]
}]



document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('city')) {
        document.getElementById('modalApp_city').style.display = 'grid'
    } else {
        document.getElementById('current_city').textContent = JSON.parse(localStorage.getItem('city'))
        predpr.forEach(el => {
            if (JSON.parse(localStorage.getItem('city')) === el.city) {
                document.getElementById('predprAll_cards').insertAdjacentHTML('beforeend', `
                <article class="card" id="${el.id}">
            <h2>${el.name}</h2>
            <img src="${el.img}" alt="">
            <p>${el.adr}</p>
            <button id="btn_menu_${el.id}" class="btn_background">Заказать доставку</button>
            </article>
            
                <section class="modalAppSection" id="modalApp_menu_${el.id}">
                <h1>МЕНЮ</h1>
                    <article id="modalApp_menuCon${el.id}" class="modalApp_menu">
                        
                        
                    </article>
                    <button id="zakaz_confirm_${el.id}" class="btn_background">Заказать доставку</button>
                </section>
                `)
            }
        })

    }
    
    citys.forEach(el => {
        document.getElementById('city_all').insertAdjacentHTML('beforeend', `<option value="${el}">${el}</option>`)
    })
})

document.getElementById('current_city').addEventListener('click', () => {
    document.getElementById('modalApp_city').style.display = 'grid'
})

document.getElementById('city_confirm').addEventListener('click', () => {
    localStorage.setItem('city', JSON.stringify(document.getElementById('city_all').value))
    document.getElementById('current_city').textContent = document.getElementById('city_all').value
    document.getElementById('modalApp_city').style.display = 'none'
    let cardsAll = document.getElementById('predprAll_cards').children
    for(let i = 0; i<cardsAll.length; i++) {
        cardsAll[i].remove()
    }

    predpr.forEach(el => {
        if(el.city === document.getElementById('city_all').value) {
            document.getElementById('predprAll_cards').insertAdjacentHTML('beforeend', `
            <article class="card" id="${el.id}">
            <h2>${el.name}</h2>
            <img src="${el.img}" alt="">
            <p>${el.adr}</p>
            <button id="btn_menu_${el.id}" class="btn_background">Заказать доставку</button>
            </article>
            
                <section class="modalAppSection" id="modalApp_menu_${el.id}">
                <h1>МЕНЮ</h1>
                    <article id="modalApp_menuCon${el.id}" class="modalApp_menu">
                        
                        
                    </article>
                    <button id="zakaz_confirm_${el.id}" class="btn_background">Заказать доставку</button>
                </section>`
 )
 let menu = el.menu
 let id = el.id
 console.log(menu)
 menu.forEach(el => {
    document.getElementById(`modalApp_menuCon${id}`).insertAdjacentHTML('beforeend', `
    <article id="${menu.pos}" class="card_menu">
        <h2>${el.name}</h2>
        <img src="${el.img}" alt="">
        <p>${el.cost}</p>
        <button class = "btn_background"> В корзину</button>
    </article>
    `)
 })

 

 let idCard = document.getElementById(`${el.id}`).id
 console.log(idCard)
 document.getElementById(`btn_menu_${idCard}`).addEventListener('click', () => {
     document.getElementById(`modalApp_menu_${el.id}`).style.display = 'grid'
 })
}




    }    
    )


    
})








document.addEventListener('keydown', (ev) => {
    if(ev.key === 'Escape') {
        let modals = document.getElementsByClassName('modalAppSection')
        for (let i = 0; i<modals.length; i++) {
            modals[i].style.display = 'none'
        }
    }
})

let kurerBtns = [...document.getElementsByClassName('kurer_button')]
kurerBtns.forEach(el => {
    el.addEventListener('click', () => {
        document.getElementById('modalApp_kurer').style.display = 'grid'
    })
})