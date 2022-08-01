const express = require ("express");
const res = require("express/lib/response");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta = require("./database/Pergunta");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/resposta") // recebe o valor do que foi buscado no banco

connection.authenticate()// conect com banco de dados
.then(()=>{
    console.log('ok feita');
}).catch((msgErr)=>{
    console.log('err');
})
//----

// dizendo para o express usar o ejs como engine;
app.set('view engine','ejs');
app.use(express.static('public'));

//bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());  

// rotas 
app.get("/",(req,res)=>{  
    pergunta.findAll({ raw:true, order:[
        ['id','DESC'] // OERDENACAO POR ORDEM decrescente || ASC =cres
    ]}).then(perguntas=>{ 
        res.render("index",{
            perguntas: perguntas
        
        });
        
    }); // select * from ...                                                            
});

app.get("/perguntar",(req,res)=>{                                                              
    res.render("perguntar"); 
});

app.post("/salvarpergunta",(req,res)=>{ // rota para dados form
    var titulo = req.body.titulo; //salvando dados do form
    var descricao = req.body.descricao;
    pergunta.create({ //insert 
        titulo:titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id}
    }).then(pergunta=>{// qndo operacao de busca for concluida buscando infor
        if(pergunta != undefined ){ // se existe um id na perg
            Resposta.findAll({
                where:{perguntaId:pergunta.id},
                order: [['id','DESC']]
            }).then(respostas=>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas: respostas
                });

            });

        }else{ // nao encontrada
            res.redirect("/");
        }
    });//metodo busca apenas um dado com condicao
});
// dados do form
app.post("/responder", (req,res)=>{
    const corpo = req.body.corpo;
    const perguntaId = req.body.pergunta;
    // process.exit( code );
   
    Resposta.create({
        corpo: corpo, // corrspondem ao banco de dados, coluna criada
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(8080,()=>{console.log("Rodando app");});   //porta 8080  localhost                        