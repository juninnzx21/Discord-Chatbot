const sqlite3 = require("sqlite3")
const config = require("../config.json"); // Substitua pelo caminho real do seu arquivo de configuração
const Discord = require("discord.js");

module.exports = async (client, interaction) => {
  const arquivoBanco = 'pontos.db';
  const canalLogId = config.batepontolog
  const arquivoBancoAusencia = 'ausencia.db';


  const db = new sqlite3.Database(arquivoBanco);
  const dbAusencia = new sqlite3.Database(arquivoBancoAusencia);

  // Cria a tabela se ela não existir
  db.run(`
      CREATE TABLE IF NOT EXISTS pontos (
        usuario_id TEXT PRIMARY KEY,
        aberto INTEGER,
        intervalos TEXT
      )
    `);

  function formatarTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    return `${horas}h ${minutos}m ${segundosRestantes.toFixed(0)}s`;
  }

  function fecharPonto(idUsuario, interaction, client, canalLogId, db) {
    db.get('SELECT * FROM pontos WHERE usuario_id = ?', [idUsuario], async (err, row) => {
      if (err) {
        console.error(err);
        return;
      }


      if (row.aberto) {
        const fechado = new Date();
        const aberto = new Date(row.aberto);
        const intervalo = (fechado - aberto) / 1000;

        // Atualiza o banco de dados com o intervalo
        const novosIntervalos = JSON.parse(row.intervalos);
        novosIntervalos.push(intervalo);

        db.run('UPDATE pontos SET aberto = NULL, intervalos = ? WHERE usuario_id = ?', [JSON.stringify(novosIntervalos), idUsuario], (err) => {
          if (err) console.error(err);
        });

        await interaction.reply({ content: `> 🙋 | Ponto fechado! Intervalo: ${formatarTempo(intervalo)}`, ephemeral: true });
        const canalLog = client.channels.cache.get(canalLogId);
        if (canalLog) {
          canalLog.send(`> 🙋 | Ponto do usuário ${interaction.user} fechado com ${formatarTempo(intervalo)}.`);
        }
      } else {
        await interaction.reply({ content: '>  | Você não tem um ponto aberto.', ephemeral: true });
      }
    });
  }
  if (!interaction.isButton()) return;

  const idUsuario = interaction.user.id;
  // Verifica se o usuário está na lista de ausência
  dbAusencia.get('SELECT * FROM ausencia WHERE usuario_id = ?', [idUsuario], async (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

    if (row) {
      // Se o usuário está na lista de ausência, notifique-o e retorne
      await interaction.reply({ content: '>  | Você está ausente e não pode utilizar a função do bate-ponto.', ephemeral: true });
      return;
    }

    // Verifica se o usuário existe no banco de dados
    db.get('SELECT * FROM pontos WHERE usuario_id = ?', [idUsuario], async (err, row) => {
      if (err) {
        console.error(err);
        return;
      }

      if (!row) {
        // Se o usuário não existir, adiciona ao banco de dados
        db.run('INSERT INTO pontos (usuario_id, aberto, intervalos) VALUES (?, NULL, "[]")', [idUsuario]);
      }

      if (interaction.customId === 'abrir_ponto') {
        // Atualiza o campo 'aberto' no banco de dados
        db.run('UPDATE pontos SET aberto = ? WHERE usuario_id = ?', [Date.now(), idUsuario], (err) => {
          if (err) console.error(err);
        });
        // Verifica se row é definido antes de acessar a propriedade aberto
        if (row && row.aberto) {
          interaction.reply({ content: '>  | Você ja tem um ponto aberto.', ephemeral: true });
          return;
        }

        await interaction.reply({ content: ' | Ponto aberto!', ephemeral: true });
        const canalLog = client.channels.cache.get(canalLogId);
        if (canalLog) {
          canalLog.send({ content: `>  | Ponto do usuário ${interaction.user} aberto.`, });
        }
      } else if (interaction.customId === 'fechar_ponto') {
        fecharPonto(idUsuario, interaction, client, canalLogId, db);
      }
    });
  })
}