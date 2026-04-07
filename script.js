const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('result');
const searchContainer = document.getElementById('search-container');


async function fetchDefinitions() { 
    const query = searchInput.value.trim();
    console.log("button clicked")

    const existingError = document.getElementById('error-message');

    if(existingError){
        existingError.remove()
    }
    if (query.length === 0) {
        const message = document.createElement('p');
        message.className = 'text-red-500';
        message.textContent = 'Please enter a search term.';
        message.id = 'error-message'
        searchContainer.appendChild(message);
        return;
    }


try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
    const data = await response.json();

    console.log(data);

    if (!response.ok) {
        const message = document.createElement('p');
        message.textContent = data.message || 'No definitions found.';
        searchContainer.appendChild(message);
        return;
    }

    const item = data[0]; 
    const meaning = item.meanings[0];
    const definition = meaning.definitions[0];


    resultsContainer.innerHTML = `
        <div class="bg-[var(--background-color)] border-[var(--subtext)]  p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 mx-auto flex flex-col  text-left mb-4">
            <h3 class="text-xl font-bold text-[#389DD9]">${item.word[0].toUpperCase() + item.word.slice(1)}</h3>
            <p class="text-gray-700">Part of speech: ${meaning.partOfSpeech}</p>
            <p class="text-gray-700">Pronunciation: ${item.phonetics[0]?.text || ''}</p>
            <p class="text-gray-700">Definition: ${definition.definition}</p>
            <p class="text-gray-700">Synonyms: ${definition.synonyms?.join(', ') || ''}</p>
            <p class="text-gray-700">Antonyms: ${definition.antonyms?.join(', ') || ''}</p>
        </div>
        `;
   
} catch (error) {
    console.error(error);
}
};

