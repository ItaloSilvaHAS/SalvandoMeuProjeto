// Função para mostrar os perks com base na raça escolhida
document.getElementById('race').addEventListener('change', function() {
    const perkText = document.getElementById('perkText');
    const perkBox = document.getElementById('perk');

    let perkMessage = '';
    
    // Lógica para exibir o perk de acordo com a raça
    switch (this.value) {
        case 'humano':
            perkMessage = 'Raça com maior potencial de despertar (+5 EGO)';
            break;
        case 'gigante':
            perkMessage = 'Maior força de batalha (+5 Força)';
            break;
        case 'dragao':
            perkMessage = 'Controle básico de um dos 4 elementos (Fogo, Água, Vento ou Terra)';
            break;
        case 'demônio':
            perkMessage = 'Imunidade ao FOGO e controle básico de chamas';
            break;
        case 'elfoNegro':
            perkMessage = 'Imunidade a MAGIAS';
            break;
        case 'fada':
            perkMessage = 'Portal de Mana enorme (+5 Inteligência)';
            break;
        case 'bruxos':
            perkMessage = 'Habilidade de nivelar atributos com oponente por 2 turnos';
            break;
        case 'orc':
            perkMessage = 'Fúria Berserk: Aumenta o dano no ataque corpo a corpo';
            break;
        case 'anão':
            perkMessage = 'Restaurar armaduras e armas danificadas';
            break;
        case 'vampiro':
            perkMessage = 'Carisma elevado (+5 Carisma)';
            break;
        case 'lobisomem':
            perkMessage = 'Sangue de Ferro: (+2 Inteligência / +2 Força)';
            break;
        case 'lich':
            perkMessage = 'Sem benefícios adicionais';
            break;
        case 'amaldiçoado':
            perkMessage = 'Sem benefícios adicionais';
            break;
        default:
            perkMessage = 'Escolha uma raça para ver seu perk.';
    }

    perkText.innerHTML = perkMessage;
    perkBox.classList.add('active');
});

// Função para garantir que a distribuição de pontos respeite o limite de 15
let totalPoints = 15;
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updatePoints);
});

function updatePoints() {
    let pointsUsed = 0;
    document.querySelectorAll('input[type="number"]').forEach(input => {
        pointsUsed += parseInt(input.value) || 0;
    });

    if (pointsUsed > totalPoints) {
        alert('Você excedeu o limite de 15 pontos. Tente novamente.');
        return;
    }

    document.getElementById('pointsLeft').textContent = totalPoints - pointsUsed;
}

// Função para gerar e exibir a ficha do personagem com gráfico
function generateCharacter() {
    const name = document.getElementById('name').value;
    const race = document.getElementById('race').value;
    const className = document.getElementById('class').value;
    const strength = parseInt(document.getElementById('strength').value);
    const speed = parseInt(document.getElementById('speed').value);
    const intelligence = parseInt(document.getElementById('intelligence').value);
    const ego = parseInt(document.getElementById('ego').value);
    const charisma = parseInt(document.getElementById('charisma').value);  // Adicionando Carisma
    const luck = parseInt(document.getElementById('luck').value);  // Adicionando Sorte

    // Preencher a ficha do personagem
    document.getElementById('characterName').textContent = 'Nome: ' + name;
    document.getElementById('characterRace').textContent = 'Raça: ' + race;
    document.getElementById('characterClass').textContent = 'Classe: ' + className;
    document.getElementById('displayStrength').textContent = strength;
    document.getElementById('displaySpeed').textContent = speed;
    document.getElementById('displayIntelligence').textContent = intelligence;
    document.getElementById('displayEgo').textContent = ego;
    document.getElementById('displayCharisma').textContent = charisma;  // Exibindo Carisma
    document.getElementById('displayLuck').textContent = luck;  // Exibindo Sorte

    // Exibir a ficha
    document.getElementById('characterStats').style.display = 'block';

    // Limpar o gráfico anterior, se houver
    const ctx = document.getElementById('characterChart').getContext('2d');
    const chartExist = Chart.getChart("characterChart"); // Verifica se o gráfico já existe

    if (chartExist) {
        chartExist.destroy(); // Se o gráfico existir, destrói ele antes de criar um novo
    }

    // Gerar o gráfico
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Força', 'Velocidade', 'Inteligência', 'Ego', 'Carisma', 'Sorte'],  // Atualizando os rótulos
            datasets: [{
                label: 'Atributos',
                data: [strength, speed, intelligence, ego, charisma, luck],  // Atualizando os dados
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C00', '#FFD700'],  // Cores ajustadas
                borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C00', '#FFD700'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1500, // Tempo de animação
                easing: 'easeOutBounce', // Tipo de animação
                onComplete: function () {
                    console.log("Gráfico gerado com sucesso!"); // Verifica quando a animação terminar
                }
            }
        }
    });
}
