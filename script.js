// Efeito de digitação
const texto = "$ loading portfolio...";
let i = 0;

function digitar() {
  if (i < texto.length) {
    document.getElementById("typing").innerHTML += texto.charAt(i);
    i++;
    setTimeout(digitar, 100);
  }
}

// Navegação horizontal
function scrollToSection(index) {
  window.scrollTo({
    left: window.innerWidth * index,
    behavior: 'smooth'
  });
  updateDots(index);
}

function updateDots(activeIndex) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

// Atualizar dots durante a rolagem
window.addEventListener('scroll', () => {
  const sectionIndex = Math.round(window.scrollX / window.innerWidth);
  updateDots(sectionIndex);
});

// Ferramenta de Hash
function generateHash() {
  const input = document.getElementById('hash-input').value;
  if (!input) return;
  
  // Gerar diferentes tipos de hash
  const md5 = CryptoJS.MD5(input).toString();
  const sha1 = CryptoJS.SHA1(input).toString();
  const sha256 = CryptoJS.SHA256(input).toString();
  
  const result = `
    <p><span class="prompt">$</span> hash-generator "${input}"</p>
    <p>MD5: ${md5}</p>
    <p>SHA1: ${sha1}</p>
    <p>SHA256: ${sha256}</p>
  `;
  
  document.getElementById('hash-result').innerHTML = result;
}

// Ferramenta AES
function encryptAES() {
  const text = document.getElementById('aes-text').value;
  const key = document.getElementById('aes-key').value;
  
  if (!text || !key) {
    alert("Preencha texto e chave!");
    return;
  }
  
  const encrypted = CryptoJS.AES.encrypt(text, key).toString();
  document.getElementById('aes-result').innerHTML = `
    <p><span class="prompt">$</span> aes-encrypt "${text}"</p>
    <p>Texto criptografado: ${encrypted}</p>
  `;
}

function decryptAES() {
  const text = document.getElementById('aes-text').value;
  const key = document.getElementById('aes-key').value;
  
  if (!text || !key) {
    alert("Preencha texto e chave!");
    return;
  }
  
  try {
    const decrypted = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    
    if (!decrypted) {
      throw new Error("Chave inválida!");
    }
    
    document.getElementById('aes-result').innerHTML = `
      <p><span class="prompt">$</span> aes-decrypt "${text}"</p>
      <p>Texto descriptografado: ${decrypted}</p>
    `;
  } catch (e) {
    document.getElementById('aes-result').innerHTML = `
      <p><span class="prompt">$</span> aes-decrypt "${text}"</p>
      <p style="color:#ff6b6b">Erro: ${e.message}</p>
    `;
  }
}

// Verificador de senha
function checkPassword() {
  const password = document.getElementById('password-input').value;
  if (!password) return;
  
  let strength = 0;
  let feedback = "";
  
  // Verificar comprimento
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  
  // Verificar complexidade
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  // Determinar força
  if (strength < 3) {
    feedback = "<span style='color:#ff6b6b'>Fraca</span> - Adicione mais caracteres e variedade";
  } else if (strength < 5) {
    feedback = "<span style='color:#feca57'>Média</span> - Pode melhorar com símbolos e números";
  } else {
    feedback = "<span style='color:#1dd1a1'>Forte</span> - Boa senha!";
  }
  
  document.getElementById('password-result').innerHTML = `
    <p><span class="prompt">$</span> check-password-strength</p>
    <p>Análise: ${feedback}</p>
    <p>Pontuação: ${strength}/5</p>
  `;
}

// Carregar a biblioteca CryptoJS para as ferramentas
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
document.head.appendChild(script);

// Iniciar efeito de digitação quando a página carregar
window.onload = function() {
  digitar();
};
// Função para preparar mensagem PGP
async function prepareEncryptedMessage() {
if (typeof openpgp === 'undefined') {
  showError("Biblioteca OpenPGP não carregada. Recarregue a página.");
  return;

  const messageInput = document.getElementById('message-input');
  const encryptionStatus = document.getElementById('encryption-status');
  const submitBtn = document.getElementById('submit-btn');

  // Resetar estado
  encryptionStatus.style.display = 'block';
  encryptionStatus.innerHTML = `
    <p><span class="prompt">$</span> pgp --encrypt</p>
    <p>Criptografando mensagem...</p>
  `;
  submitBtn.disabled = true;
}
  try {

  // Substitua esta chave pela sua chave pública PGP real
  const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----

  mQGNBF5X8+YBDADJvJNUVBc4SHzo7XfXg0xJqO4K8+XJZmwVHi3hQ5F1zFwN
  mDMEaAm1vRYJKwYBBAHaRw8BAQdAoNkI1oO4n5kFwQ0OgIqnRzXZSoIMK46xV9Pk
  xpSTsxy0KlZpdG9yIFJvemVubyA8dml0b3JzYW50b3Nyb3plbm9AZ21haWwuY29t
  PoiZBBMWCgBBFiEEN34z6ObwyDafbLwbvrJ093JEw+AFAmgJtb0CGwMFCQWliDMF
  CwkIBwICIgIGFQoJCAsCBBYCAwECHgcCF4AACgkQvrJ093JEw+DKGgEA2cHOt/dq
  Tpb9QHi7CMD39PsOOYH3fTKdLJqfC+YMrGEA/iDdcI7HcZmxZw9UsZIuTMjtaSUZ
  EVWZVoEcqyMEkMMCuDgEaAm1vRIKKwYBBAGXVQEFAQEHQP9vG5f+Ev0kISpI60DL
  B9xM/GBdjXqhBlmjjQ9oxjpoAwEIB4h+BBgWCgAmFiEEN34z6ObwyDafbLwbvrJ0
  93JEw+AFAmgJtb0CGwwFCQWliDMACgkQvrJ093JEw+BpZgEA9TPwVzheikxGG3mL
  uM33KqBi1ndScb3qKEKAglOJkDwA/0hSbPVKoHukQ3fAZiwXEchBNUOiHMkOihlf
  BEHTH+QI
  =yMC1
  =e2QZ
  -----END PGP PUBLIC KEY BLOCK-----`;
  
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

// 2. Criar mensagem
const message = await openpgp.createMessage({ 
  text: messageInput.value 
});

// 3. Criptografar
const encrypted = await openpgp.encrypt({
  message,
  encryptionKeys: publicKey
});

// 4. Atualizar UI
document.getElementById('encrypted-message').value = encrypted;
messageInput.value = "[MENSAGEM CRIPTOGRAFADA]";

encryptionStatus.innerHTML = `
  <p><span class="prompt">$</span> pgp --encrypt</p>
  <p style="color:#1dd1a1">✓ Mensagem criptografada!</p>
  <p style="font-size:0.8em">Chave pública usada: ${publicKey.getKeyID().toHex()}</p>
`;

submitBtn.disabled = false;

} catch (error) {
encryptionStatus.innerHTML = `
  <p><span class="prompt">$</span> pgp --encrypt</p>
  <p style="color:#ff6b6b">Erro: ${error.message}</p>
  ${error.stack ? `<pre style="font-size:0.7em">${error.stack}</pre>` : ''}
`;
console.error("Erro na criptografia:", error);
}
}

// Mostrar/ocultar instruções PGP conforme seleção
document.querySelectorAll('input[name="encryption-type"]').forEach(radio => {
radio.addEventListener('change', function() {
  const pgpInstructions = document.getElementById('pgp-instructions');
  if (this.value === 'pgp') {
    pgpInstructions.style.display = 'block';
  } else {
    pgpInstructions.style.display = 'none';
  }
});
});

// Função para copiar chave PGP (modificada para feedback melhor)
function copyPGPKey() {
const pgpKey = document.getElementById('pgp-public-key');
const textToCopy = pgpKey.innerText.replace(/<br\s*\/?>/gi, '\n');

navigator.clipboard.writeText(textToCopy).then(() => {
  const encryptionStatus = document.getElementById('encryption-status') || document.createElement('div');
  encryptionStatus.id = 'encryption-status';
  encryptionStatus.className = 'terminal-box';
  encryptionStatus.style.display = 'block';
  encryptionStatus.innerHTML = `
    <p><span class="prompt">$</span> pgp --copy-key</p>
    <p style="color:#1dd1a1">✓ Chave PGP copiada para a área de transferência!</p>
  `;
  
  // Insere após o elemento da chave se não existir
  if (!document.getElementById('encryption-status')) {
    pgpKey.parentNode.insertBefore(encryptionStatus, pgpKey.nextSibling);
  }
  
  setTimeout(() => {
    encryptionStatus.style.display = 'none';
  }, 3000);
}).catch(err => {
  console.error('Erro ao copiar texto: ', err);
  alert('Erro ao copiar chave. Por favor, copie manualmente.');
});
}
// Iniciar efeito de digitação quando a página carregar
window.onload = function() {
    digitar();
  };