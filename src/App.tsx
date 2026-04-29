import { useState } from 'react'
import './App.css'

function App() {
  const [salarioBruto, setSalarioBruto] = useState(2000)
  const [dependentes, setDependentes] = useState(0)
  const [tem14Salarios, setTem14Salarios] = useState(true)

  const segSocial = salarioBruto * 0.11

  function calcularIRS(bruto: number, deps: number) {
    const baseAnual = bruto * (tem14Salarios ? 14 : 12)
    let irsAnual = 0
    
    if (baseAnual <= 8200) irsAnual = 0
    else if (baseAnual <= 12200) irsAnual = (baseAnual - 8200) * 0.13
    else if (baseAnual <= 17700) irsAnual = 520 + (baseAnual - 12200) * 0.165
    else if (baseAnual <= 27500) irsAnual = 1427.5 + (baseAnual - 17700) * 0.22
    else if (baseAnual <= 41000) irsAnual = 3583.5 + (baseAnual - 27500) * 0.25
    else if (baseAnual <= 80500) irsAnual = 6958.5 + (baseAnual - 41000) * 0.325
    else irsAnual = 19796 + (baseAnual - 80500) * 0.43

    irsAnual -= deps * 600
    if (irsAnual < 0) irsAnual = 0

    return irsAnual / (tem14Salarios ? 14 : 12)
  }

  const irsRetencao = calcularIRS(salarioBruto, dependentes)
  const salarioLiquido = salarioBruto - segSocial - irsRetencao
  const liquidoAnual = salarioLiquido * (tem14Salarios ? 14 : 12)

  return (
    <div className="app">
      <header className="header">
        <h1>Portugal Finance <span>🇵🇹</span></h1>
        <p>Calculadora Salário Líquido 2026</p>
      </header>

      <div className="container">
        <div className="card">
          <h2>Seus Dados</h2>
          
          <div className="input-group">
            <label>Salário Bruto Mensal €</label>
            <input 
              type="number" 
              value={salarioBruto}
              onChange={(e) => setSalarioBruto(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>Nº de Dependentes</label>
            <input 
              type="number" 
              value={dependentes}
              onChange={(e) => setDependentes(Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="checkbox-group">
            <input 
              type="checkbox" 
              checked={tem14Salarios}
              onChange={(e) => setTem14Salarios(e.target.checked)}
            />
            <label>Recebo 14 salários</label>
          </div>
        </div>

        <div className="card">
          <h2>Resultado</h2>
          
          <div className="result-row">
            <span>Salário Bruto</span>
            <span>€{salarioBruto.toFixed(2)}</span>
          </div>
          
          <div className="result-row desconto">
            <span>Seg. Social 11%</span>
            <span>- €{segSocial.toFixed(2)}</span>
          </div>
          
          <div className="result-row desconto">
            <span>IRS Retenção</span>
            <span>- €{irsRetencao.toFixed(2)}</span>
          </div>
          
          <div className="result-row total">
            <span>Salário Líquido</span>
            <span>€{salarioLiquido.toFixed(2)}</span>
          </div>

          <div className="anual">
            <p>Líquido anual: <strong>€{liquidoAnual.toFixed(2)}</strong></p>
          </div>
        </div>
      </div>

     <footer>
  <p>Feito por Lucas Lima | Cálculo IRS 2026</p>
  <div className="social-links">
    <a href="https://www.linkedin.com/in/lucas-lima-6b97422b9/" target="_blank" rel="noopener noreferrer">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      LinkedIn
    </a>
    <a href="https://github.com/lucasdevfrontendbr" target="_blank" rel="noopener noreferrer">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
      GitHub
    </a>
    <a href="https://wa.me/5521988862013?text=Ol%C3%A1%20Lucas!%20Vi%20seu%20app%20Portugal%20Finance" target="_blank" rel="noopener noreferrer">
      <svg width="20" height="20" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="16" fill="#25D366"/>
  <path fill="#FFF" d="M22.6 20.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5 0-.2-.7-1.7-1-2.3-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-1 .4-.3.3-1.3 1.2-1.3 3 0 1.8 1.3 3.5 1.5 3.7.2.2 2.5 3.9 6.1 5.4.9.4 1.5.6 2 .8.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.2-.2-.5-.3z"/>
</svg>
      WhatsApp
    </a>
    <a href="mailto:lucasduti10@gmail.com?subject=Vi%20seu%20App%20Portugal%20Finance&body=Ol%C3%A1%20Lucas," target="_blank" rel="noopener noreferrer">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
        <path fill="#FBBC05" d="M5.455 4.64L12 9.548l6.545-4.91v2.091L12 11.64 5.455 6.731V4.64z"/>
        <path fill="#34A853" d="M12 16.64l6.545-4.91V21.002H12z"/>
        <path fill="#4285F4" d="M5.455 11.73v9.272h1.636V16.64z"/>
      </svg>
      E-mail
    </a>
  </div>
</footer>
    </div>
  )
}

export default App