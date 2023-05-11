const engWord = document.getElementById('eng');
const rusWord = document.getElementById('rus');
const inputsNode = document.getElementsByClassName('input');
const addBtn = document.getElementById('add-word-btn');
const tableNode = document.getElementById('table');

let words;
let btnsDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

function addWordToTable(index) {
    tableNode.innerHTML += `
        <tr class="tr">
            <td class="eng-word">${words[index].english}</td>
            <td class="rus-word">${words[index].russian}</td>
            <td>
                <button class="btn-delete"></button>
            </td>
        </tr>
    `;
}

words.forEach((element, i) => {
    addWordToTable(i);
});

addBtn.addEventListener('click', () => {
    if (
        engWord.value.length < 1 ||
        rusWord.value.length < 1 ||
        !isNaN(engWord.value) ||
        !isNaN(rusWord.value)
    ) {
        for (let key of inputsNode) {
            key.classList.add('error');
            key.placeholder = 'Некорректный ввод';
        }
    } else {
        for (let key of inputsNode) {
            key.classList.remove('error');
        }

        words.push(new CreateWord(engWord.value, rusWord.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        engWord.value = null;
        rusWord.value = null;
    }
});

function CreateWord(english, russian) {
    this.english = english;
    this.russian = russian;
}

function deleteWord(e) {
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    e.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));
}

function addEventDelete() {
    if (words.length > 0) {
        btnsDelete = document.querySelectorAll('.btn-delete');
        for (let btn of btnsDelete) {
            btn.addEventListener('click', e => {
                deleteWord(e);
            });
        }
    }
}

addEventDelete();