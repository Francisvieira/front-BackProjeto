/* 
Vamos criar um servidor em backend para cadastrar dados em banco de dados no mysql 
*/ 


const express =require("express"); 

const mysql = require("mysql");

const cors = require("cors");



// Vamos usar o servidor express passando com referencia a constante app 

const app = express();

// preparar o servidor para receber dados em formato json 
app.use(express.json());

// aplicar o cors no projeto
app.use(cors());


//estabelecer a conexao com o banco de dados e realizar um crud na base 

const conexao =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"dbprodutos"
}); 

// testar e estabelecer a conexao com o banco de dados 
conexao.connect((erro)=>{
    if(erro){
        console.error("erro ao tentar estabelecer a conexao"+erro.stack);
        return;
    }
    console.log("conectado ao banco de dados ->" +conexao.threadId);
})


// testes de rotas usando a arquitetura http com os verbos get post put e delete

app.get("/produtos/listar",(req,res)=>{
    //consulta sql para selecionar os produtos no DB
    conexao.query("select * from tbproduto",(erro,resultado)=>{
        if(erro){
            return res.status(500).send({output:"erro ao tentar executar a consulta"+erro});
        }
        res.status(200).send({output:resultado});
    });

}); 

    //rota para o metodo get,buscando um produto 

    app.get("/produto/buscar/:id",(req,res)=>{
        conexao.query("select * from tbproduto where idproduto=?",[req.params.id],(erro,resultado)=>{
            if(erro){
                return res.status(500).send({output:`Erro ao tentar executar a consulta ${erro}`});
            }
            if(resultado==null || resultado ==""){
                return res.status(404).send({output:`Não foi possivel localizar esse produto`});

            }
            res.status(200).send({output:resultado});
        });
    })

app.post("/produto/cadastro",(req,res)=>{
   conexao.query("insert into tbproduto set ?",[req.body],(erro,resultado)=>{
     if(erro){
        res.status(500).send({output:`Não foi possivel cadastrar -> ${erro}`});
        return;
    }
    res.status(201).send({output:resultado});
   });
}); 

app.put("/produto/atualizar/:id",(req,res)=>{
   conexao.query("update tbproduto set ? where idproduto=?",[req.body,req.params.id],(erro,resultado)=>{
       if(erro){
           res.status(500).send({output:`Erro ao tentar atualizar os dados -> ${erro}`});
           return;
       }
       res.status(200).send({output:resultado});
   });

}); 

app.delete("/produto/apagar/:id",(req,res)=>{
 conexao.query("delete from tbproduto where idproduto =?",[req.params.id],(erro,resultado)=>{
     if(erro){
         res.status(500).send({output:`Erro ao tenatar apagar o produto ->${erro}`});
         return;
     }
     res.status(204).send({output:resultado});
 });
}); 

// subir o servidor na porta 5000 
app.listen("5000", ()=>console.log("Servidor online em: http://localhost:5000"));

module.exports = app;