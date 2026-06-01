CREATE DATABASE microtonal_blog;
USE microtonal_blog;

CREATE TABLE quiz(
    id_quiz INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    dt_criacao DATETIME DEFAULT NOW()
);

CREATE TABLE genero(
id_genero INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45)
);

CREATE TABLE usuario(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL,
    telefone CHAR(11) NOT NULL,
    senha VARCHAR(255) NOT NULL
);


CREATE TABLE pergunta(
    id_pergunta INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    fk_quiz INT,
    CONSTRAINT cFkQuizPergunta FOREIGN KEY (fk_quiz) REFERENCES quiz(id_quiz)
);

CREATE TABLE alternativa(
    id_alternativa INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    correta TINYINT(1) NOT NULL,
    fk_pergunta INT,
    CONSTRAINT cFkPerguntaAlternativa FOREIGN KEY (fk_pergunta) REFERENCES pergunta(id_pergunta)
);

CREATE TABLE usuario_resposta(
	id_tentativa INT AUTO_INCREMENT,
    fk_usuario INT,
    fk_alternativa INT,
    correta TINYINT(1),
    dt_resposta DATETIME DEFAULT NOW(),
    PRIMARY KEY (id_tentativa, fk_usuario, fk_alternativa),
    CONSTRAINT cFkUsuarioResposta FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT cFkAlternativaResposta FOREIGN KEY (fk_alternativa) REFERENCES alternativa(id_alternativa)
);

CREATE TABLE artista(
    id_artista INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    qtd_integrantes INT,
    banda BOOLEAN NOT NULL
);

CREATE TABLE album(
    id_album INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    dt_lancamento DATE NOT NULL,
    fk_artista INT,
    CONSTRAINT cFkArtistaAlbum FOREIGN KEY (fk_artista) REFERENCES artista(id_artista)
);

CREATE TABLE musica(
    id_musica INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    dt_lancamento DATE NOT NULL,
    fk_album INT,
    CONSTRAINT cFkAlbumMusica FOREIGN KEY (fk_album) REFERENCES album(id_album)
);

CREATE TABLE genero_entidades(
fk_genero INT,
fk_artista INT,
CONSTRAINT cFkGenero FOREIGN KEY (fk_genero) REFERENCES genero(id_genero),
CONSTRAINT cFkGeneroArtista FOREIGN KEY (fk_artista) REFERENCES artista(id_artista)
);

CREATE TABLE like_musica(
    fk_usuario INT,
    fk_musica INT,
    dt_like DATETIME DEFAULT NOW() ON UPDATE NOW(),
    tipo_like VARCHAR(45) DEFAULT 'DEFAULT',
    PRIMARY KEY (fk_usuario, fk_musica),
    CONSTRAINT cFkUsuarioLike FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT cFkMusicaLike FOREIGN KEY (fk_musica) REFERENCES musica(id_musica),
    CONSTRAINT cTipo CHECK (tipo_like IN('LIKE', 'DISLIKE', 'DEFAULT'))
);

INSERT INTO quiz (nome) VALUES ('Quiz Microtonal');

INSERT INTO pergunta (descricao, fk_quiz) VALUES
('O que é música microtonal?', 1),
('Por que a música microtonal é tão desconhecida?', 1),
('Quantas notas existem normalmente na escala ocidental tradicional?', 1),
('Qual o nome do movimento que ficou conhecido por provocar o experimentalismo microtonal no Brasil?', 1),
('A música microtonal é algo novo?', 1),
('Qual destes artistas ficou conhecido por explorar microtonalidade?', 1),
('Os instrumentos tradicionais são naturalmente microtonais?', 1),
('O que diferencia a música microtonal da música ocidental comum?', 1),
('Qual cultura possui forte tradição em microtonalidade?', 1),
('Esse tipo de sonoridade pode causar qual sensação em ouvintes não acostumados?', 1);
;

-- alternativa 1
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('Música feita apenas com instrumentos elétricos', 0, 1),
('Música que utiliza diferentes notas entre as que tradicionalmente conhecemos', 1, 1),
('Música tocada em volume baixo', 0, 1);

-- alternativa 2
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('Por que é um estilo musical ruim', 0, 2),
('Por que a Indústria Musical Ocidental limitou sonoridades padrão para a construção de instrumentos', 1, 2),
('Por que somente músicos podem a ouvir', 0, 2);

-- alternativa 3
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('8 notas', 0, 3),
('12 notas', 1, 3),
('10', 0, 3);

-- alternativa 4
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('Vanguarda Paulista', 1, 4),
('Vanguarda Carioca', 0, 4),
('Vanguarda Baiana', 0, 4);

-- alternativa 5
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('Sim, nasceu em 2012', 0, 5),
('Não, está presente desde a Antiguidade', 1, 5),
('Não, está presente desde a Revolução Francesa', 0, 5);

-- alternativa 6
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('Arrigo Barnabé', 1, 6),
('Rita Lee', 0, 6),
('Arrigo Barreto', 0, 6);

-- alternativa 7
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('Sim', 0, 7),
('Não', 1, 7),
('Somente em músicas clássicas', 0, 7);

-- alternativa 8
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('O ritmo', 0, 8),
('O volume', 0, 8),
('A divisão das notas e sonoridade', 1, 8);

-- alternativa 9
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('Música árabe', 1, 9),
('Música country', 0, 9),
('Música punk', 0, 9);

-- alternativa 10
INSERT INTO alternativa (descricao, correta, fk_pergunta) VALUES
('Sons diferentes ou "estranhos"', 1, 10),
('Silêncio absoluto', 0, 10),
('Ecos automáticos', 0, 10);

INSERT INTO artista (nome, qtd_integrantes, banda) VALUES
('King Gizzard & The Lizard Wizard', 7, 1),
('Arrigo Barnabé', 1, 0),
('Itamar Assumpção', 1, 0),
('Ná Ozzetti', 1, 0),
('Grupo Rumo', 10, 1),
('Angine de Poitrine', 2, 1);

INSERT INTO album (nome, dt_lancamento, fk_artista) VALUES
('Flying Microtonal Banana', '2017-02-24', 1),
('Clara Crocodilo', '1980-11-15', 2),
('Beleléu, Leléu, Eu', '1980-01-01', 3),
('Ná', '1994-01-01', 4),
('Rumo', '1981-01-01', 5),
('Vol. I', '2024-06-14', 6);

INSERT INTO musica (nome, dt_lancamento, fk_album) VALUES
('Rattlesnake', '2017-02-24', 1),
('Clara Crocodilo', '1980-11-15', 2),
('Nego Dito (feat. Paulo, Rondó, Eliane e Luiz)', '1980-01-01', 3),
('Sutil', '2007-01-01', 4),
('Carnaval do Geraldo', '1981-01-01', 5),
('Sherpa', '2024-06-14', 6);

INSERT INTO genero (nome) VALUES
('Rock Psicodélico'),
('Rock Progressivo'),
('Música Erudita Contemporânea'),
('Pop'),
('Rock'),
('MPB'),
('Samba'),
('Reggae'),
('Rap'),
('Jazz'),
('Música Regional Brasileira'),
('Math Rock'),
('Dadaísmo Musical'),
('Surrealismo Musical');

INSERT INTO genero_entidades(fk_artista, fk_genero) VALUES
-- king
(1, 1),
(1, 2),
(1, 5),
-- arrigo
(2, 3),
(2, 4),
(2, 5),
-- itamar
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
-- ozzetti
(4, 6),
-- rumo
(5, 5),
(5, 6),
(5, 11),
-- angine
(6, 12),
(6, 13),
(6, 14);