const notifyBtn = document.getElementById("notify-btn");
const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");
const imageEl = document.getElementById("main-image");
const sovrascritta = document.getElementById("sovrascritta");

const oneSignalAppId = "2aa43d68-c001-4e88-9a17-0db15e4c5236";

window.OneSignal = window.OneSignal || [];
OneSignal.push(function () {
  OneSignal.init({
    appId: oneSignalAppId,
    safari_web_id: "web.onesignal.auto",
    notifyButton: { enable: false },
  });
});

notifyBtn.addEventListener("click", () => {
  OneSignal.showSlidedownPrompt();
  notifyBtn.style.display = "none";
});

const dataOggi = new Date();
const oggi = new Date();
const giorno = oggi.getDate();
const mese = oggi.getMonth() + 1;
const ora = oggi.getHours();
const minuti = oggi.getMinutes();

let contenuto = "";
let mostraImmagine = false;

function aggiornaContenuto() {
  const now = new Date();
  const giorno = now.getDate();
  const ora = now.getHours();
  const minuti = now.getMinutes();
  mostraImmagine = false;
  contenuto = "";

  if (giorno === 11 || giorno === 10) {
    contenuto = "Non è ancora il TUO momento! Segnati il 22 luglio: sarà memorabile (per le tue anche)";
  } else if (giorno >= 12 && giorno <= 18) {
    mostraImmagine = true;
    contenuto = "";
  } else if (giorno === 19) {
    contenuto = "PREPARA LA BORSA DA SPIAGGIA: ciabatte, costume e crema solare.";
  } else if (giorno === 20) {
    contenuto = "SCUSACI, ci siamo dimenticanti l’ombrellone P.s. Ah prepara anche il pranzo!";
  } else if (giorno === 21) {
    contenuto = "FATTI TROVARE PRONTA ALLE 10.30 (dai, portati pure un cambio carino)";
  } else if (giorno === 22) {
    if (ora < 7) {
      mostraImmagine = true;
    } else if (ora === 7) {
      contenuto = "SVEGLIAAAAA";
    } else if (ora === 15 && minuti >= 15 || (ora > 15 && ora < 19) || (ora === 19 && minuti < 35)) {
      mostraImmagine = true;
    } else if (ora === 15 && minuti < 15) {
      contenuto = "Ora che hai capito che il costume non servirà, PREPARA IL FEGATO, quello potrebbe essere utile";
    } else if (ora === 19 && minuti >= 35 && ora < 22) {
      contenuto = "bevuto, hai bevuto (forse) ORA CENETTA";
    } else if (ora === 22 && minuti >= 30 && minuti < 50) {
      contenuto = "e ora chi lo paga il conto?";
    } else if (ora >= 22 && minuti >= 50 || ora >= 23) {
      contenuto = "Bene, ora che sei stata viziata, la riabilitazione ti aspetta, buona passeggiata fino a casa";
    } else {
      mostraImmagine = true;
    }
  }

  messageEl.textContent = contenuto;
  imageEl.style.display = mostraImmagine ? "block" : "none";
  sovrascritta.style.display = mostraImmagine ? "block" : "none";
}

function aggiornaCountdown() {
  const target = new Date("2025-07-22T10:30:00");
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    countdownEl.textContent = "";
    return;
  }

  const giorni = Math.floor(diff / (1000 * 60 * 60 * 24));
  const ore = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minuti = Math.floor((diff / (1000 * 60)) % 60);
  const secondi = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `Prossimo messaggio tra: ${giorni}g ${ore}h ${minuti}m ${secondi}s`;
}

setInterval(() => {
  aggiornaCountdown();
  aggiornaContenuto();
}, 1000);
