class ReadingApp {
    constructor() {
        this.wordLists = {
            'high-frequency': {
                name: '100 High Frequency Words',
                words: [
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
                ]
            },
            'phase2-tricky': {
                name: 'Phase 2 - Tricky',
                words: [
                    'the', 'to', 'I', 'no', 'go', 'into', 'of', 'a', 'as', 'is', 'his', 'has'
                ]
            },
            'phase2-decodable': {
                name: 'Phase 2 - Decodable',
                words: [
                    'if', 'an', 'mum', 'at', 'but', 'in', 'up', 'it', 'dad', 'off', 'on', 'can', 'get', 'had', 'back', 'and', 'not', 'big', 'him', 'got', 'am'
                ]
            },
            'phase3-i-tricky': {
                name: 'Phase 3 (i-ii) - Tricky',
                words: [
                    'he', 'she', 'you', 'they', 'we', 'all', 'me', 'are', 'be', 'my', 'was', 'her'
                ]
            },
            'phase3-i-decodable': {
                name: 'Phase 3 (i-ii) - Decodable',
                words: [
                    'that', 'much', 'them', 'this', 'then', 'with', 'will'
                ]
            },
            'phase3-ii-tricky': {
                name: 'Phase 3 (iii) - Tricky',
                words: [
                    'now', 'by', 'put', 'going', 'door', 'new', 'push', 'pull', 'live', 'love', 'once', 'two', 'ball', 'call', 'full'
                ]
            },
            'phase3-ii-decodable': {
                name: 'Phase 3 (iii) - Decodable',
                words: [
                    'or', 'day', 'for', 'see', 'too', 'play', 'away', 'look', 'night', 'girl', 'seen', 'way', 'took', 'good', 'may', 'been', 'boy', 'out', 'far'
                ]
            },
            'phase4-tricky': {
                name: 'Phase 4 - Tricky',
                words: [
                    'said', 'have', 'like', 'so', 'do', 'some', 'come', 'were', 'there', 'little', 'one', 'when', 'where', 'what', "isn't", 'who', 'want', "can't", 'water', 'over', 'after', 'last', 'school', 'how', 'many'
                ]
            },
            'phase4-decodable': {
                name: 'Phase 4 - Decodable',
                words: [
                    'went', 'first', 'from', 'children', 'just', 'help', 'next', 'three', 'jump', 'must', 'tree', "it's"
                ]
            },
            'phase5-tricky': {
                name: 'Phase 5 - Tricky',
                words: [
                    'oh', 'their', 'people', 'Mr', 'Mrs', 'looked', 'called', 'asked', 'could', 'would', 'should', 'buy', 'your', 'here', 'because', 'laugh', 'lived', 'more', 'half', 'again', 'our', 'these', 'other', 'another', 'brother', 'says', 'friend', 'ask'
                ]
            },
            'phase5-decodable': {
                name: 'Phase 5 - Decodable',
                words: [
                    "don't", 'old', "I'm", 'by', 'time', 'house', 'about', 'made', 'came', 'make', 'saw', 'here', 'down', 'very'
                ]
            }
        };
        this.currentWordIndex = 0;
        this.wordCount = 0;
        this.enabledWordLists = ['high-frequency'];
        this.wordDisplay = document.getElementById('wordDisplay');
        this.counter = document.getElementById('counter');
        this.app = document.getElementById('app');
        this.settingsIcon = document.getElementById('settingsIcon');
        this.settingsPage = document.getElementById('settingsPage');
        this.closeButton = document.getElementById('closeButton');
        this.wordListsContainer = document.getElementById('wordListsContainer');
        
        this.loadProgress();
        this.createWordListToggles();
        this.showRandomWord();
        this.setupEventListeners();
    }
    
    loadProgress() {
        const saved = localStorage.getItem('readingAppProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.currentWordIndex = progress.currentWordIndex || 0;
            this.enabledWordLists = progress.enabledWordLists || ['high-frequency'];
        }
    }
    
    saveProgress() {
        const progress = {
            currentWordIndex: this.currentWordIndex,
            enabledWordLists: this.enabledWordLists
        };
        localStorage.setItem('readingAppProgress', JSON.stringify(progress));
    }
    
    createWordListToggles() {
        this.wordListsContainer.innerHTML = '';
        
        Object.keys(this.wordLists).forEach(listId => {
            const list = this.wordLists[listId];
            const isEnabled = this.enabledWordLists.includes(listId);
            
            const listItem = document.createElement('div');
            listItem.className = 'word-list-item';
            
            const listName = document.createElement('div');
            listName.className = 'word-list-name';
            listName.textContent = list.name;
            
            const toggleSwitch = document.createElement('div');
            toggleSwitch.className = `toggle-switch ${isEnabled ? 'active' : ''}`;
            toggleSwitch.innerHTML = '<div class="slider"></div>';
            
            toggleSwitch.addEventListener('click', () => {
                this.toggleWordList(listId);
            });
            
            listItem.appendChild(listName);
            listItem.appendChild(toggleSwitch);
            this.wordListsContainer.appendChild(listItem);
        });
    }
    
    toggleWordList(listId) {
        const index = this.enabledWordLists.indexOf(listId);
        if (index === -1) {
            this.enabledWordLists.push(listId);
        } else {
            this.enabledWordLists.splice(index, 1);
        }
        
        if (this.enabledWordLists.length === 0) {
            this.enabledWordLists = ['high-frequency'];
        }
        
        this.saveProgress();
        this.createWordListToggles();
    }
    
    getAllEnabledWords() {
        let allWords = [];
        this.enabledWordLists.forEach(listId => {
            if (this.wordLists[listId]) {
                allWords = allWords.concat(this.wordLists[listId].words);
            }
        });
        return allWords;
    }
    
    showRandomWord() {
        const allWords = this.getAllEnabledWords();
        if (allWords.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * allWords.length);
        this.currentWordIndex = randomIndex;
        this.wordCount++;
        this.wordDisplay.textContent = allWords[randomIndex];
        this.counter.textContent = this.wordCount;
        this.saveProgress();
    }
    
    setupEventListeners() {
        this.app.addEventListener('click', (e) => {
            if (e.target === this.settingsIcon) {
                return;
            }
            this.showRandomWord();
        });
        
        this.app.addEventListener('touchstart', (e) => {
            if (e.target === this.settingsIcon) {
                return;
            }
            e.preventDefault();
            this.showRandomWord();
        });
        
        this.settingsIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showSettings();
        });
        
        this.settingsIcon.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.showSettings();
        });
        
        this.closeButton.addEventListener('click', () => {
            this.hideSettings();
        });
        
        this.closeButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.hideSettings();
        });
    }
    
    showSettings() {
        this.settingsPage.style.display = 'flex';
    }
    
    hideSettings() {
        this.settingsPage.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ReadingApp();
});