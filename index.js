const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('express-mongo-db');
const cors = require('cors');
const OBjectID = require('mongodb')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(mongoDB("mongodb://localhost/lista"));


app.get('/produtos',  (req, res) => {
    req.db.collection('compras').find().toArray(erro, dados) => {
        if(!erro){
            res.send({produtos: dados});
        }
        return res.status(500).send({erro: erro});
    }
});

app.post('/produto/novo', (req, res) => {
    if(!req.body.nome || !req.body.quantidade){
        return res.status(400).send({erro: 'Dados obrigatórios ausentes.'})
    }
    let novoProduto = {
        nome: req.body.nome,
        quantidade:  req.body.quantidade,
        marca: req.body.marca || " "
    }
    req.db.collection('compras').insert(novoProduto,erro =>{
        if(!erro){
            res.status(201).send({mensagem: "Produto cadastrado com sucesso."});
        }
        return res.status(500).send({erro: erro});
    });
});

app.delete('/produto/:nomeDoProduto', (req, res) => {
    req.db.collection('compras').removeEventListener({_id: OBjectID(req.params.IdDoProduto)}; erro => {
        if(!erro){
            return res.status(202).send({mensagem: "Produto removido com sucesso"};)
        }
        return res.status(500).send({erro: erro});
    })
});

app.listen(5000, erro => {
    if(!erro){
        return console.log("Aplicação do backend iniciada");
    }
    return console.log(`ERRO: ${erro}`);
})