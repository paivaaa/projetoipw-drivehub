class faq {
    constructor(el) {
        this.el = el;
        this.sumario = el.querySelector('summary');
        this.conteudo = el.querySelector('.faq-resposta');
        this.iconeExpandir = this.sumario.querySelector('.expand-icon');
        this.animacao = null;
        this.estaFechando = false;
        this.estaExpandindo = false;
        this.sumario.addEventListener('click', (e) => this.aoClicar(e));
    }
  
    aoClicar(e) {
        e.preventDefault();
        this.el.style.overflow = 'hidden';
  
        if (this.estaFechando || !this.el.open) {
            this.abrir();
        } else if (this.estaExpandindo || this.el.open) {
            this.encolher();
        }
    }
  
    encolher() {
        this.estaFechando = true;
  
        let alturaInicial = `${this.el.offsetHeight}px`;
        let alturaFinal = `${this.sumario.offsetHeight}px`;
  
        if (this.animacao) {
            this.animacao.cancel();
        }
  
        this.animacao = this.el.animate({
            height: [alturaInicial, alturaFinal]
        }, {
            duration: 400,
            easing: 'ease-out'
        });
  
        this.animacao.onfinish = () => {
            this.iconeExpandir.setAttribute('src', 'assets/plus.svg');
            return this.aoTerminarAnimacao(false);
        }
        this.animacao.oncancel = () => {
            this.iconeExpandir.setAttribute('src', 'assets/plus.svg');
            return this.estaFechando = false;
        }
    }
  
    abrir() {
        this.el.style.height = `${this.el.offsetHeight}px`;
        this.el.open = true;
        window.requestAnimationFrame(() => this.expandir());
    }
  
    expandir() {
        this.estaExpandindo = true;
  
        const alturaInicial = `${this.el.offsetHeight}px`;
        const alturaFinal = `${this.sumario.offsetHeight + 
                             this.conteudo.offsetHeight}px`;
  
        if (this.animacao) {
            this.animacao.cancel();
        }
  
        this.animacao = this.el.animate({
            height: [alturaInicial, alturaFinal]
        }, {
            duration: 350,
            easing: 'ease-out'
        });
  
        this.animacao.onfinish = () => {
            this.iconeExpandir.setAttribute(
                'src',
                'assets/minus.svg'
            );
            return this.aoTerminarAnimacao(true);
        }
        this.animacao.oncancel = () => {
            this.iconeExpandir.setAttribute(
                'src',
                'assets/minus.svg'
            );
            return this.estaExpandindo = false;
        }
    }
  
    aoTerminarAnimacao(abrir) {
        this.el.open = abrir;
        this.animacao = null;
        this.estaFechando = false;
        this.estaExpandindo = false;
        this.el.style.height = this.el.style.overflow = '';
    }
  }
  
  document.querySelectorAll('details').forEach((el) => {
    new faq(el);
  });
  