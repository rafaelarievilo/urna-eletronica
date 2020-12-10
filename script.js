let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-direita')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual]
    let numeroHtml = '';
    numero = '';
    votoBranco = false;
    

    for (let i = 0; i < etapa.numeros; i++) {
        if (i=== 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } 
        else 
        {
            numeroHtml += '<div class="numero"></div>';
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br>Partido: ${candidato.partido}`
        aviso.style.display = 'block';
        let fotosHTML = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHTML += `<div class="d-1-image small"><img src="./imagens/${candidato.fotos[i].url}" alt="Prefeito">${candidato.fotos[i].legenda}</div>`

            }else {
                fotosHTML += `<div class="d-1-image"><img src="./imagens/${candidato.fotos[i].url}" alt="Prefeito">${candidato.fotos[i].legenda}</div>`
            }

        }
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div> <div class="aviso-pequeno pisca">CORRIGE se deseja CORRIGIR seu voto</div>';
    }
    

}

function clicou(n) {
    let elementoNumero = document.querySelector('.numero.pisca')
    if (elementoNumero !== null) {
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`

        elementoNumero.classList.remove('pisca')
        if(elementoNumero.nextElementSibling !== null) {
            elementoNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
}

function branco() {
    if (numero === '') {
        votoBranco = true;

        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-branco pisca">VOTO EM BRANCO</div> <div class="aviso-pequeno pisca">CORRIGE se deseja CORRIGIR seu voto</div>';
    } else {
        alert('Para votar em BRANCO, nenhum número pode estar digitado!')
    }
}

function corrige(corr) {
    comecarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]

    let votoConfirmado = false;
    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    } 

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>'
            console.log(votos)
        }
    }
}

comecarEtapa()