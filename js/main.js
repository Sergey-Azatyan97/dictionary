const dictionary = document.getElementById('dictionary');

function init() {
    renderDictionary(getDictionary());
    addEventListeners();
}

function getCurrentId() {
    return Number(localStorage.getItem('currentId')) ?? 0;
}

function getDictionary() {
    const dictionary = localStorage.getItem('dictionary');
    return dictionary ? JSON.parse(dictionary) : [];
}

function saveDictionary(dictionary) {
    localStorage.setItem('currentId', String(getCurrentId() + 1));
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
}

function addTranslation(origin, translation) {
    const inputsNode = document.getElementsByClassName('input');

    const dictionary = getDictionary();
    const currentId = getCurrentId();

    if (!isNaN(origin) || !isNaN(translation)) {
        for (let key of inputsNode) {
            key.classList.add('error');
            key.placeholder = 'Некорректный ввод';
        }
    } else {
        for (let key of inputsNode) {
            key.classList.remove('error');
            key.placeholder = '';
        }

        dictionary.push({ id: currentId + 1, origin, translation });
        saveDictionary(dictionary);
        renderDictionary(dictionary);
    }
}

function deleteTranslation(translationId) {
    const dictionary = getDictionary().filter(({ id }) => id !== translationId);
    saveDictionary(dictionary);
}

function removeTranslation(event) {
    const target = event.target;

    if (target.dataset.action !== 'delete-translation') {
        return;
    }

    const definition = target.parentNode;
    const translation = definition.previousElementSibling;
    const translationId = Number(translation?.dataset.id);

    if (isNaN(translationId)) {
        return;
    }

    translation.remove();
    definition.remove();
    deleteTranslation(translationId);
}

function renderDictionary(dict) {
    dictionary.innerHTML = '';
    
    dict.forEach(({ id, origin, translation }) => {
        dictionary.innerHTML += `
            <dt data-id="${id}">${origin}</dt>
            <dd>
                ${translation}
                
                <button data-action="delete-translation"></button>
            </dd>
        `;
    });
}

function addEventListeners() {
    const newTranslationForm = document.forms[0];
    const originInput = document.getElementById('origin');
    const translationInput = document.getElementById('translation');

    dictionary.addEventListener('click', removeTranslation);

    newTranslationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        addTranslation(originInput.value, translationInput.value);

        newTranslationForm.reset();
    });
}

init();