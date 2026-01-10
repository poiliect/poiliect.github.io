
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particleContainer');
        this.particles = [];
        this.userInputs = [];
        this.maxParticles = 100;
        this.speedRange = { min: 5, max: 10 }; 
        this.spawnInterval = 200; 
        
        this.init();
    }
    
    init() {

        this.generateDefaultParticles();
        

        setInterval(() => this.updateParticles(), this.spawnInterval);
    }
    

    generateDefaultParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle('|');
        }
    }
    
    createParticle(content) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = content;
        
        const left = Math.random() * 100;
        
        const speed = this.speedRange.min + 
            Math.random() * (this.speedRange.max - this.speedRange.min);
        
        particle.style.left = `${left}%`;
        particle.style.animation = `particleFlow ${speed}s linear infinite`;
        const delay = Math.random() * speed;
        particle.style.animationDelay = `${delay}s`;
        if (content !== '|') {
            const hue = Math.floor(Math.random() * 360);
            particle.style.color = `hsl(${hue}, 100%, 70%)`;
        }
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            content: content,
            isDefault: content === '|'
        });
        






        if (this.particles.length > this.maxParticles) {
            this.removeOldestParticle();
        }
        
        return particle;
    }
    

    removeOldestParticle() {
        if (this.particles.length > 0) {
            const oldest = this.particles.shift();
            if (oldest.element.parentNode) {
                oldest.element.remove();
            }
        }
    }
    

    updateParticles() {
        if (this.userInputs.length > 0 && this.particles.length > 0) {
            const defaultParticle = this.particles.find(p => p.isDefault);
            if (defaultParticle) {
                const userInput = this.userInputs.shift();
                

                const index = this.particles.indexOf(defaultParticle);
                if (index > -1) {
                    if (defaultParticle.element.parentNode) {
                        defaultParticle.element.remove();
                    }
                    this.particles.splice(index, 1);
                }
                

                this.createParticle(userInput);
            }
        }
    }
    

    addUserInput(text) {
        if (text && text.trim() !== '') {
            const trimmedText = text.trim();
            
            if (trimmedText === "我爱你") {
                this.replaceAllParticles(trimmedText);
                this.userInputs = [];
            } 
            else if (trimmedText === "|") {
                this.replaceAllParticles_rep("|");
                this.userInputs = [];
                
            } 
            else if (trimmedText === "哈基米") {
                this.replaceAllParticles_rep("😺");
                this.userInputs = [];
                
            } 
            else if (trimmedText === "none") {
                this.replaceAllParticles_rep("");
                this.userInputs = [];
                
            } 
            else {
                this.userInputs.push(trimmedText);
            }
        }
    }
    

    clearUserInputs() {
        this.userInputs = [];
    }
    replaceAllParticles(content) {
        this.particles.forEach(particle => {
            particle.element.textContent = content;
            particle.content = content;
            particle.isDefault = false;
            
            const hue = Math.floor(Math.random() * 360);
            particle.element.style.color = `hsl(${hue}, 100%, 70%)`;
        });
    }
    replaceAllParticles_rep(content) {
        this.particles.forEach(particle => {
            particle.element.textContent = content;
            particle.content = content;
            particle.isDefault = true;
            
            particle.element.style.color = "rgba(255,255,255,1)";
        });
    }


}

let particleSystem;


document.addEventListener('DOMContentLoaded', () => {
    particleSystem = new ParticleSystem();
    
    const confirmBtn = document.querySelector('.button.confirm');
    const userInput = document.querySelector('.user_input');
    
    confirmBtn.addEventListener('click', () => {
        const inputText = userInput.value;
        
        if (inputText.trim() !== '') {

            particleSystem.addUserInput(inputText);
            

            userInput.value = '';
            userInput.focus();
        }
    });
    

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmBtn.click();
        }
    });
});




