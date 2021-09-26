USE clientes;
CREATE TABLE clientesbancarios (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    conta INT NOT NULL UNIQUE,
    agencia INT NOT NULL,
    saldo FLOAT NOT NULL,
    PRIMARY KEY(id)
);

    drop table clientesbancarios;