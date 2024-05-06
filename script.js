'use strict';
const storage = localStorage;

//要素の取得と変数化
const product = document.getElementById("product");
const dateIn = document.getElementById("dateIn");
const dateEat = document.getElementById("dateEat");
const plus = document.getElementById("plus");
const submit = document.getElementById("submit");
const classification = document.getElementById("classification");



const checkBoxListener = (ev) => {
    const trList = Array.from(document.getElementsByTagName('tr'));
    const currentTr = ev.currentTarget.parentElement.parentElement;
    const idx = trList.indexOf(currentTr) -1;
    list[idx].done = ev.currentTarget.checked;
    storage.inventoryList = JSON.stringify(list);
};

const addItem = (item) => {
     //取得した要素の表への挿入
     const tr = document.createElement('tr');

     for(const prop in item){
         const td = document.createElement('td');
         if(prop == "done"){
             const checkbox = document.createElement('input');
             checkbox.type = 'checkbox';
             checkbox.checked = item[prop];
             td.appendChild(checkbox);
             checkbox.addEventListener('change', checkBoxListener);
         }else{
             td.textContent = item[prop];
         }
 
         tr.appendChild(td);
     }
 
     table.appendChild(tr);

};

const clearTable = () => {
    const trList = Array.from(document.getElementsByTagName('tr'));
    trList.shift();
    for(const tr of trList){
        tr.remove();
    }
};

let list = [];
document.addEventListener('DOMContentLoaded', () => {
    const json = storage.inventoryList;
    if(json == undefined){
        return;
    }

    list = JSON.parse(json);

    for(const item of list){
        addItem(item);
    }

});
submit.addEventListener('click', () => {
    const item ={};

    //入力値のチェック兼入力値をitemオブジェクトに格納
    if(product.value !=''){
        item.product = product.value;
    }else{
        item.product = '未記入';
    }
    item.classification = classification.value;
    if(dateIn.value != ''){
        item.dateIn = dateIn.value;
    }else{
        const date = new Date();
        item.dateIn = date.toLocaleDateString();
    }
    if(dateEat.value != ''){
        item.dateEat = dateEat.value;
    }else{
        const nextWeekDay = new Date();
        nextWeekDay.setDate(nextWeekDay.getDate() + 7);
        item.dateEat = nextWeekDay.toLocaleDateString();
    }
    item.plus = plus.value;
    item.done = false;

    //それぞれの要素のリセット
    product.value = '';
    classification.value = '調味料';
    dateIn.value = '';
    dateEat.value = '';
    plus.value ='';

    addItem(item);


    list.push(item);
    storage.inventoryList = JSON.stringify(list);

});

const main = document.getElementById('main');
const remove = document.createElement('button');
remove.textContent = '削除';
remove.id ='remove';
const br = document.createElement('br');
main.appendChild(br);
main.appendChild(remove);

remove.addEventListener('click', () => {
    clearTable();
    list = list.filter((item) => item.done == false);

    for(const item of list){
        addItem(item);
    }

    storage.inventoryList = JSON.stringify(list);
});

const filterButton = document.getElementById('narrow');
const selecter = document.getElementById('selecter');

filterButton.addEventListener('click', () => {
    clearTable();
    for(const item of list){
        if(selecter.value == '全て'){
            addItem(item);
        }else if(item.classification == selecter.value){
            addItem(item);
        }
    }
})
