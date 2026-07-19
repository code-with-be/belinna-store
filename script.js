// Estado global do carrinho
let carrinho = [];

// Função para abrir e fechar a barra lateral do carrinho
function toggleCarrinho() {
    document.body.classList.toggle('cart-open');
}

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarInterfaceCarrinho();
    
    // Abre automaticamente o carrinho para dar feedback visual à cliente
    document.body.classList.add('cart-open');
}

// Atualiza os números da bolinha e a lista interna
function atualizarInterfaceCarrinho() {
    const totalItens = carrinho.length;
    document.getElementById('cart-count').innerText = totalItens;

    const containerItens = document.getElementById('cart-items');
    containerItens.innerHTML = ''; // Limpa conteúdo anterior

    if (totalItens === 0) {
        containerItens.innerHTML = '<p class="empty-message">Seu carrinho está vazio.</p>';
        document.getElementById('cart-total-value').innerText = 'R$ 0,00';
        return;
    }

    let valorTotal = 0;
    carrinho.forEach(item => {
        valorTotal += item.preco;
        
        const elementoItem = document.createElement('div');
        elementoItem.className = 'cart-item-row';
        elementoItem.innerHTML = `
            <span>${item.nome}</span>
            <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
        `;
        containerItens.appendChild(elementoItem);
    });

    document.getElementById('cart-total-value').innerText = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
}

// Envia a lista tratada direto para o WhatsApp comercial da loja
function enviarPedidoWhatsApp() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "✨ *Novo Pedido - Belinna Store* ✨\n\n";
    let total = 0;

    carrinho.forEach((item, index) => {
        mensagem += `${index + 1}. ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
        total += item.preco;
    });

    mensagem += `\n💰 *Total:* R$ ${total.toFixed(2).replace('.', ',')}`;
    mensagem += "\n\nGostaria de confirmar o pagamento e combinar a entrega! 💕";

    const mensagemCodificada = encodeURIComponent(mensagem);
    // Substitua pelo número oficial da sua loja futuramente se quiser
    const numeroWhatsApp = "5511999999999"; 
    
    window.open(`https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemCodificada}`, '_blank');
}
