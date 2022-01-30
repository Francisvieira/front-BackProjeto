
const request = require("supertest");
const app = require("./index");


describe('Aplicacao Produto',()=>{
    it('Teste de Rota produtos/listar',async() =>{

        const res = await request(app).get("/produtos/listar");
        console.log(res);
        expect(res.body).toHaveProperty("output");

    });
    it("Teste de rota produto/buscar/:id",async()=>{
        const res_buscar = await request(app).get("/produto/buscar/1");
        expect(res_buscar.body).toHaveProperty("output");
    })

    it ("Teste dda rota dde cadastro produto/cadastro",async()=>{
        const res_cadastro = await request(app).post("/produto/cadastro")
        .send({
            nomeproduto:"fone",
            descricao:"fone jbl",
            preco:150.00,
            foto:"fone.png"
        })
        .set("Accept","application/json")
        .expect(201)
        console.log(res_cadastro.text);
        
    });

    it ("teste da rota para atualizar produto/atualizar/id",async()=>{
        const res_atualizar = await request(app)
        .put("/produto/atualizar/1")
        .send({
            nomeproduto:"microfone",
            descricao:"mic jbl",
            preco:199.99,
            foto:"mic.png"
        })
        .set("Accept","application/json")
        .expect(200);
        console.log(res_atualizar.text);
    });
     

    it("Testando a rota do Delete produto/apagar",async()=>{
        const res_apagar = await request(app).delete("/produto/apagar/1")
        .set("Accept","application/json")
        .expect(204);
    

    })
});