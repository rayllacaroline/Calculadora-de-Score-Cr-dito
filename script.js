const questions = [
     {
        texto: "O cliente possui mais de 18 anos?\n\n1 = Sim\n2 = Não",
        opcoes: {
            1: { pontos: 200 }, 
            2: { pontos: 0 }
        }
    },
    {
        texto: "O cliente possui restrições no nome (dívidas ativas)?\n\n1 = Sim\n2 = Não",
        opcoes: {
            1: { pontos: -200 }, 
            2: { pontos: 200}
        }
    },
    {
        texto: "Qual é a faixa de renda mensal do cliente?\n\n1 = Até R$2k\n2 = R$2k a R$5k\n3 = R$6k a  R$15k\n4 = +R$16k",
        opcoes: {
            1: { pontos: 50 },
            2: { pontos: 100 },
            3: { pontos: 150 },
            4: { pontos: 200 }
        }
    },
    {
        texto: "O cliente possui emprego com carteira assinada?\n\n1 = Sim\n2 = Não / Autônomo",
        opcoes: {
            1: { pontos: 200 },
            2: { pontos: 50 }
        }
    },
    {
        texto: "O cliente paga as suas contas em dia?\n\n1 = Sempre\n2 = As vezes\n3 = Quase nunca",
        opcoes: {
            1: { pontos: 200 },
            2: { pontos: 50 },
            3: { pontos: -200 }
        }
    }
];

let currentStep = -1;
let score = 400;
const display = document.getElementById("question-display");

function startAnalysis() {
    currentStep = 0;
    score = 400; 
    showQuestion();
}

function showQuestion() {
    if (currentStep < questions.length) {
        display.innerHTML = questions[currentStep].texto.replace(/\n/g, "<br>");
    } else {
        showResult();
    }
}

function pressNumber(num) {
    if (currentStep === -1) return;

    const question = questions[currentStep];

    if (question.opcoes[num] !== undefined) {
        score += question.opcoes[num].pontos;
        
        if (score > 1000) score = 1000;
        if (score < 0) score = 0;

        currentStep++;
        showQuestion();
    } else {
        const originalText = display.innerHTML;
        display.innerHTML = "OPÇÃO INVÁLIDA!<br>Use os números indicados.";
        setTimeout(() => {
            display.innerHTML = originalText;
        }, 1200);
    }
}

function showResult() {
    currentStep = -1; 
    
let status = "CRÉDITO NEGADO";
let perfil = "ALTO RISCO (Negativo)";

if (score > 700) {
    status = "CRÉDITO APROVADO";
    perfil = "EXCELENTE (Positivo)";
} 
else if (score >= 600 && score <= 700) {
    status = "CRÉDITO APROVADO";
    perfil = "BOM (Positivo)";
} 
else if (score >= 500) {
    status = "EM ANÁLISE";
    perfil = "MÉDIO RISCO (Neutro)";
}

    display.innerHTML = `SCORE: ${score}<br>PERFIL: ${perfil}<br><br><strong>${status}</strong>`;
}

function pressEnter() {
    if (currentStep !== -1) {
        alert("Responda utilizando as teclas numéricas.");
    }
}
