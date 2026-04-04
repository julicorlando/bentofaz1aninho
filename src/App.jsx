import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import "./index.css";

const sunRays = [0, 18, 40, 62, 85, 110, 135, 158, 182, 205, 228, 250, 275, 298, 320, 340];

export default function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const tentarTocar = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.35;
          await audioRef.current.play();
        } catch (error) {
          console.log("Autoplay bloqueado pelo navegador:", error);
        }
      }
    };

    tentarTocar();
  }, []);

  function enviarWhatsApp(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const nome = form.get("nome");
    const telefone = form.get("telefone");
    const presenca = form.get("presenca");
    const mensagem = form.get("mensagem");
    const responsavel = form.get("responsavel");

    const numero =
      responsavel === "mamae" ? "5581992730122" : "5581989328045";

    const texto = `Confirmação de presença 🎉

Nome: ${nome}
Telefone: ${telefone}
Presença: ${presenca}
Mensagem: ${mensagem || "-"}`;

    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
  }

  function tocarMusicaManual() {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Não foi possível tocar o áudio:", error);
      });
    }
  }

  return (
    <div className="page">
      {/* player oculto */}
      <audio ref={audioRef} autoPlay loop hidden>
        <source src="/musica.mp3" type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>

      <section className="hero">
        <div className="decor-layer">
          <motion.div
            initial={{ scale: 0.98, opacity: 0.95 }}
            animate={{ scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="sun-wrapper"
          >
            <div className="sun-pink-bg" />

            {sunRays.map((deg, i) => (
              <motion.span
                key={i}
                className={`sun-ray ${i % 2 === 0 ? "long" : "short"}`}
                style={{ transform: `rotate(${deg}deg) translateY(-70px)` }}
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 3, delay: i * 0.08, repeat: Infinity }}
              />
            ))}

            <div className="sun-core">
              <div className="sun-shine" />
              <span className="eye eye-left" />
              <span className="eye eye-right" />
              <span className="blush blush-left" />
              <span className="blush blush-right" />
              <span className="smile" />
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [0, 12, 0], y: [0, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="cloud cloud-top"
          >
            <div className="cloud-shape cloud-shape-a">
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [0, -14, 0], y: [0, 6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="cloud cloud-mid"
          >
            <div className="cloud-shape cloud-shape-b">
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          <div className="bottom-clouds">
            <div className="bottom-cloud left" />
            <div className="bottom-cloud center" />
            <div className="bottom-cloud right" />
          </div>
        </div>

        <div className="container hero-grid">
          <div className="hero-left">
            <div className="photo-block">
              <div className="photo-glow" />
              <img
                src="/foto-crianca.jpeg"
                alt="Foto do aniversariante"
                className="birthday-photo"
              />
            </div>

            <span className="badge">Confirmação de Presença</span>

            <div className="title-block">
              <p className="eyebrow">Nosso Raio de Sol</p>
              <h1>Aniversário de 1 ano do José Bento</h1>
              <p className="description">
                Sua presença é o nosso maior presente! Venha celebrar conosco 
                esse dia tão especial, cheio de alegria, amor e muita diversão. 
                Esperamos por você para tornar esse momento ainda mais inesquecível!
              </p>
            </div>

            <div className="info-grid">
              <div className="info-card">
                <p>Data</p>
                <strong>09/05/26</strong>
              </div>
              <div className="info-card">
                <p>Horário</p>
                <strong>16:00h</strong>
              </div>
              <div className="info-card">
                <p>Local</p>
                  <a
                    href="https://maps.app.goo.gl/C2rrMiVwpUiv9B2y6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-local"
                    >
                    Espaço Rire
                </a>
              </div>
            </div>

            <button
              type="button"
              className="music-button"
              onClick={tocarMusicaManual}
            >
              ▶️ Tocar música
            </button>
          </div>

          <div className="hero-right">
            <motion.div
              initial={{ y: 28, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="form-card"
            >
              <div className="form-header">
                <div className="form-icon">☀️</div>
                <div>
                  <h2>Confirme sua presença</h2>
                  <p>Preencha os dados abaixo para reservar seu lugar.</p>
                </div>
              </div>

              <form className="rsvp-form" onSubmit={enviarWhatsApp}>
                <div className="form-grid">
                  <label>
                    <span>Nome do convidado</span>
                    <input name="nome" type="text" placeholder="Seu nome" required />
                  </label>

                  <label>
                    <span>Telefone</span>
                    <input
                      name="telefone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </label>
                </div>

                <label>
                  <span>Você vai comparecer?</span>
                  <div className="radio-grid">
                    <label className="radio-card">
                      <input type="radio" name="presenca" value="Sim" defaultChecked />
                      <span>Sim, estarei lá ✨</span>
                    </label>

                    <label className="radio-card">
                      <input type="radio" name="presenca" value="Não" />
                      <span>Não poderei ir</span>
                    </label>
                  </div>
                </label>

                <label>
                  <span>Enviar para</span>
                  <select name="responsavel" defaultValue="mamae">
                    <option value="mamae">Mamãe</option>
                    <option value="papai">Papai</option>
                  </select>
                </label>

                <label>
                  <span>Mensagem para a família</span>
                  <textarea
                    name="mensagem"
                    rows="4"
                    placeholder="Escreva uma mensagem carinhosa..."
                  />
                </label>

                <button type="submit" className="primary-button">
                  Confirmar via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="details-section">
        <div className="container">
          <div className="details-card">
            <div className="details-header">
              <div>
                <h3>Curiosidades</h3>
                <p>Será que vocês sabiam dessas? </p>
              </div>

              <motion.div
                className="rainbow"
                animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              >
                🌈
              </motion.div>
            </div>

            <div className="details-grid">
              <div className="detail-box sky">
                <p className="detail-title">Música</p>
                <p>
                  Vocês sabiam que eu gosto do cantor João Gomes? Ele é o meu favorito! 
                </p>
              </div>

              <div className="detail-box sun">
                <p className="detail-title">Comida</p>
                <p>
                  Vocês sabiam que eu amo chupar laranja? É a minha fruta preferida!
                </p>
              </div>

              <div className="detail-box rose">
                <p className="detail-title">Sobre mim</p>
                <p>
                  Aprendi a falar lua, acho a lua linda e adoro olhar para ela. 
                  Ela é minha amiga brilhante no céu!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}