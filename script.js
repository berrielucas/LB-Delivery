const conteinerPromo = document.querySelector('.popular');
const containerPrato = document.querySelector('.recent');
const containerPedido = document.querySelector('.order');
const containerNota = document.querySelector('.note');
const nenhumItem = document.querySelector('.nenhum');
const section = document.querySelector('.feedbacks');
const labelDicount = document.querySelector('.discount');
let valorTaxa = document.querySelector('.taxa').querySelector('span');
let valorTotal = document.querySelector('.valor-total').querySelector('span');
const containerPay = document.querySelector('.pay');
let desconto = false;

let listaPromo = [
    {'nome':'Big Burger', 'preco':15.90, 'img':'./assets/burger1.png'},
    {'nome':'Beef Burger', 'preco':10.90, 'img':'./assets/burger3.png'},
    {'nome':'Cheese Burger', 'preco':9.90, 'img':'./assets/burger2.png'}
]

for (i=0; i < listaPromo.length; i++){
    const promoCriado = document.createElement('div');
    promoCriado.classList.add('item');
    promoCriado.setAttribute('data-dado', i)
    promoCriado.innerHTML = "<div class='img-item'><img src="+listaPromo[i]['img']+"></div><div class='preco'><div><span><i class='fa-solid fa-star'></i><i class='fa-solid fa-star'></i><i class='fa-solid fa-star'></i><i class='fa-solid fa-star'></i><i class='fa-solid fa-star'></i></span><p>"+listaPromo[i]['nome']+"</p><p><b>$ </b><span class='valor'>"+listaPromo[i]['preco'].toFixed(2)+"</span></p></div><div class='add promo-add'><i class='fa-solid fa-plus'></i></div></div><span class='desc'>15% Off</span><i class='fa-solid fa-heart'></i></div>";
    conteinerPromo.appendChild(promoCriado);
}


let listaPrato = [
    {'nome':'Fish and Chips', 'preco':30.90, 'img':'./assets/prato1.png'},
    {'nome':'Caesar Salad', 'preco':23.90, 'img':'./assets/prato2.png'},
    {'nome':'Chicken Alfredo', 'preco':37.90, 'img':'./assets/prato3.png'}
]

for (i=0; i < listaPrato.length; i++){
    const pratoCriado = document.createElement('div');
    pratoCriado.classList.add('item');
    pratoCriado.setAttribute('data-dado', i);
    pratoCriado.innerHTML = "<div class='img-item'><img src="+listaPrato[i]['img']+"></div><div class='preco'><div><p>"+listaPrato[i]['nome']+"</p><p><b>$ </b><span class='valor'>"+listaPrato[i]['preco'].toFixed(2)+"</span></p></div><div class='add prato-add'><i class='fa-solid fa-plus'></i></div></div><i class='fa-solid fa-heart'></i></div>";
    containerPrato.appendChild(pratoCriado);
}


let listPedido = document.querySelectorAll('.order-item');


let buttons_promo = document.querySelectorAll('.promo-add');

buttons_promo.forEach(function(button_promo) {
    button_promo.addEventListener('click', function() {
        if (listPedido.length == 0){
            nenhumItem.style.display = 'none';
        }

        let pai_buton = this.parentNode;
        let item = pai_buton.parentNode;
        const index = item.getAttribute('data-dado');


        const orderCriado = document.createElement('div');
        orderCriado.classList.add('order-item');
        orderCriado.classList.add('promo');
        orderCriado.setAttribute('data-dado', 1)
        orderCriado.id = index;
        orderCriado.innerHTML = "<div class='content-item'><div class='img'><img src="+listaPromo[index]['img']+"></div><div class='descricao'><p class='nome'>"+listaPromo[index]['nome']+"</p><p class='quant'>x<span>1</span></p></div></div><div class='valor-final-item'><p>+<b>$</b><span>"+listaPromo[index]['preco'].toFixed(2)+"</span></p></div><span class='trash'><i class='fa-solid fa-trash-can'></i></span>";

        let valor_add = listaPromo[index]['preco'];

        let achei = false;

        if (listPedido.length > 0){
            for (i=0; i < listPedido.length; i++){
                if (listPedido[i].classList.contains('promo')&&listPedido[i].getAttribute('id')==index){
                    let quant = parseInt(listPedido[i].getAttribute('data-dado'))+1;
                    let novo_valor = listaPromo[index]['preco']*quant;

                    listPedido[i].innerHTML = "<div class='content-item'><div class='img'><img src="+listaPromo[index]['img']+"></div><div class='descricao'><p class='nome'>"+listaPromo[index]['nome']+"</p><p class='quant'>x<span>"+quant+"</span></p></div></div><div class='valor-final-item'><p>+<b>$</b><span>"+novo_valor.toFixed(2)+"</span></p></div><span class='trash'><i class='fa-solid fa-trash-can'></i></span>";

                    listPedido[i].setAttribute('data-dado', quant);

                    achei = true;
                }
            }
            if (achei == false){
                containerPedido.appendChild(orderCriado);
            }
        }else{
            containerPedido.appendChild(orderCriado);
        }

        listPedido = document.querySelectorAll('.order-item');

        if (listPedido.length == 1 && listPedido[0].getAttribute('data-dado')=='1'){
            valorTaxa.innerHTML = "1.00";
            valor_add = valor_add + 1;
        }


        let valTotal = parseFloat(valorTotal.textContent);
        valTotal = valTotal+valor_add;
        valorTotal.innerHTML = "<span>"+valTotal.toFixed(2)+"</span>";

        atualizar();

    });
});




let buttons_prato = document.querySelectorAll('.prato-add');

buttons_prato.forEach(function(button_prato) {
    button_prato.addEventListener('click', function() {
        if (listPedido.length == 0){
            nenhumItem.style.display = 'none';
        }

        let pai_buton = this.parentNode;
        let item = pai_buton.parentNode;
        const index = item.getAttribute('data-dado');


        const orderCriado = document.createElement('div');
        orderCriado.classList.add('order-item');
        orderCriado.classList.add('prato');
        orderCriado.setAttribute('data-dado', 1)
        orderCriado.id = index;
        orderCriado.innerHTML = "<div class='content-item'><div class='img'><img src="+listaPrato[index]['img']+"></div><div class='descricao'><p class='nome'>"+listaPrato[index]['nome']+"</p><p class='quant'>x<span>1</span></p></div></div><div class='valor-final-item'><p>+<b>$</b><span>"+listaPrato[index]['preco'].toFixed(2)+"</span></p></div><span class='trash'><i class='fa-solid fa-trash-can'></i></span>";

        let valor_add = listaPrato[index]['preco'];

        let achei = false;

        if (listPedido.length > 0){
            for (i=0; i < listPedido.length; i++){
                if (listPedido[i].classList.contains('prato')&&listPedido[i].getAttribute('id')==index){
                    let quant = parseInt(listPedido[i].getAttribute('data-dado'))+1;
                    let novo_valor = listaPrato[index]['preco']*quant;

                    listPedido[i].innerHTML = "<div class='content-item'><div class='img'><img src="+listaPrato[index]['img']+"></div><div class='descricao'><p class='nome'>"+listaPrato[index]['nome']+"</p><p class='quant'>x<span>"+quant+"</span></p></div></div><div class='valor-final-item'><p>+<b>$</b><span>"+novo_valor.toFixed(2)+"</span></p></div><div class='trash'><i class='fa-solid fa-trash-can'></i></div>";

                    listPedido[i].setAttribute('data-dado', quant);

                    achei = true;
                }
            }
            if (achei == false){
                containerPedido.appendChild(orderCriado);
            }
        }else{
            containerPedido.appendChild(orderCriado);
        }

        listPedido = document.querySelectorAll('.order-item');

        if (listPedido.length == 1 && listPedido[0].getAttribute('data-dado')=='1'){
            valorTaxa.innerHTML = "1.00";
            valor_add = valor_add + 1;
        }


        let valTotal = parseFloat(valorTotal.textContent);
        valTotal = valTotal+valor_add;
        valorTotal.innerHTML = "<span>"+valTotal.toFixed(2)+"</span>";

        atualizar();

    });
});



function atualizar(){
    buttons_del = document.querySelectorAll('.fa-trash-can');
    buttons_del.forEach(function(button_del) {
        button_del.addEventListener('click', function() {
            const pai_buton = this.parentNode;
            const item = pai_buton.parentNode;
            // const quant = parseInt(item.getAttribute('data-dado'));
            const id = item.getAttribute('id');

            const classes = item.getAttribute('class');

            let valor_del = 0;
            for (i=0; i < listPedido.length; i++){
                if (classes == listPedido[i].getAttribute('class') && id == listPedido[i].getAttribute('id')){
                    const quant = parseInt(listPedido[i].getAttribute('data-dado'));
                    valor_del = parseFloat(listPedido[i].querySelector('.valor-final-item').querySelector('span').textContent);
                    if (quant > 1){
        
                        const quant_nova = quant-1;
        
                        const campoValor = listPedido[i].querySelector('.valor-final-item').querySelector('span');
                        const campoQuant = listPedido[i].querySelector('.quant').querySelector('span');
        
                        let val = parseFloat(campoValor.textContent);
                        let novo_valor = quant_nova * (val/quant);
        
                        campoValor.innerHTML = "<span>"+novo_valor.toFixed(2)+"</span>";
                        campoQuant.innerHTML = "<span>"+quant_nova+"</span>";

                        valor_del = val/quant;
            
                        listPedido[i].setAttribute('data-dado', quant_nova);
                    }else{
                        containerPedido.removeChild(listPedido[i]);
                    }
                    break;
                }
            }
            
    
    
            listPedido = document.querySelectorAll('.order-item');
    
            if (listPedido.length == 0){
                nenhumItem.style.display = 'flex';
                valorTaxa.innerHTML = "0.00";
                valorTotal.innerHTML = "0.00";
            }else{
                let valTotal = parseFloat(valorTotal.textContent);
                valTotal = valTotal-valor_del;
                valorTotal.innerHTML = "<span>"+valTotal.toFixed(2)+"</span>";
            }
        });
    });
}


let buttons_fav = document.querySelectorAll('.fa-heart');

buttons_fav.forEach(function(button_fav) {
    button_fav.addEventListener('click', function() {
        if (this.style.color == 'rgb(255, 63, 63)'){
            this.style.color = '#5c5c5c';
        }else{
            this.style.color = '#ff3f3f';
        }
    });
});


const btn_pay = document.querySelector('.check');

btn_pay.addEventListener('click', function(){
    const cupom = document.querySelector('#cupom').value;
    const labelErro = document.querySelector('.erro');
    if (cupom.length>0&&cupom!='LBOFF50'){
        labelErro.style.display = 'flex';
    }else{
        containerPay.classList.add('active');
        labelErro.style.display = 'none';
        const containerPayOrder = document.querySelector('.pay').querySelector('.order');
        const containerTotalTaxa = document.querySelector('.pay').querySelector('.total-taxa');
    
        let total_taxa = document.querySelector('.note').querySelector('.total-taxa');
    
    
        for (i=0; i<listPedido.length; i++){
            containerPayOrder.appendChild(listPedido[i]);
        }
    
        containerTotalTaxa.appendChild(total_taxa);
        
        
    
        if (cupom == "LBOFF50"){
            desconto = true;
            let valorTotalPay = document.querySelector('.pay').querySelector('.total-taxa').querySelector('.valor-total').querySelector('span');
            let valorDiscoutPay = document.querySelector('.pay').querySelector('.total-taxa').querySelector('.valor-discount').querySelector('span');
            let valTotal = parseFloat(valorTotalPay.textContent);
            let valor_discount = valTotal*0.5;
            valTotal = valTotal-valor_discount;
            valorTotalPay.innerHTML = "<span>"+valTotal.toFixed(2)+"</span>";
            valorDiscoutPay.innerHTML = "<span>"+valor_discount.toFixed(2)+"</span>";
        }

        labelDicount.style.display = 'flex';
    
        section.style.display = 'flex';
    }
    
});

const btn_fechar = document.querySelector('.fa-xmark');

btn_fechar.addEventListener('click', function(){
    containerPay.classList.remove('active');
    section.style.display = 'none';
    labelDicount.style.display = 'none';

    listPedido = document.querySelector('.pay').querySelectorAll('.order-item');
    let total_taxa = document.querySelector('.pay').querySelector('.total-taxa').querySelector('.total-taxa');

    if (listPedido.length == 0){
        nenhumItem.style.display = 'flex';
    }

    for (i=0; i<listPedido.length; i++){
        containerPedido.appendChild(listPedido[i]);
    }

    containerNota.appendChild(total_taxa);

    if (desconto == true) {
        const campo = containerNota.querySelector('.total-taxa').querySelector('.valor-total').querySelector('span');
        let v = parseFloat(campo.textContent)*2;
        campo.innerText = v.toFixed(2);
        desconto = false;
    }

    listPedido = document.querySelector('.note').querySelectorAll('.order-item');
});
