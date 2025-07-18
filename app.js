class ReadingApp {
    constructor() {
        this.words = [
            'the', 'that', 'not', 'look', 'put',
            'and', 'with', 'then', "don't", 'could',
            'a', 'all', 'were', 'come', 'house',
            'to', 'we', 'go', 'will', 'old',
            'said', 'can', 'little', 'into', 'too',
            'in', 'are', 'as', 'back', 'by',
            'he', 'up', 'no', 'from', 'day',
            'I', 'had', 'mum', 'children', 'made',
            'of', 'my', 'one', 'him', 'time',
            'it', 'her', 'them', 'Mr', "I'm",
            'was', 'what', 'do', 'get', 'if',
            'you', 'there', 'me', 'just', 'help',
            'they', 'out', 'down', 'now', 'Mrs',
            'on', 'this', 'dad', 'came', 'called',
            'she', 'have', 'big', 'oh', 'here',
            'is', 'went', 'when', 'about', 'off',
            'for', 'be', "it's", 'got', 'asked',
            'at', 'like', 'see', 'their', 'saw',
            'his', 'some', 'looked', 'people', 'make',
            'but', 'so', 'very', 'your', 'an'
        ];
        this.currentWordIndex = 0;
        this.wordCount = 0;
        this.wordDisplay = document.getElementById('wordDisplay');
        this.counter = document.getElementById('counter');
        this.app = document.getElementById('app');
        
        this.loadProgress();
        this.showRandomWord();
        this.setupEventListeners();
    }
    
    loadProgress() {
        const saved = localStorage.getItem('readingAppProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.currentWordIndex = progress.currentWordIndex || 0;
        }
    }
    
    saveProgress() {
        const progress = {
            currentWordIndex: this.currentWordIndex
        };
        localStorage.setItem('readingAppProgress', JSON.stringify(progress));
    }
    
    showRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.currentWordIndex = randomIndex;
        this.wordCount++;
        this.wordDisplay.textContent = this.words[randomIndex];
        this.counter.textContent = this.wordCount;
        this.saveProgress();
    }
    
    setupEventListeners() {
        this.app.addEventListener('click', () => {
            this.showRandomWord();
        });
        
        this.app.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.showRandomWord();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ReadingApp();
});