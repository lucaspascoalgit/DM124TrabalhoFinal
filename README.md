# DM124TrabalhoFinal

Caro Edy,

Segue trabalho final da DM124, estou enviando um export do Postman para que você realize os testes no software.

Modo de operação:

Foram criados três serviços rest api, todos funcionando independente com as seguintes funções POST, GET, PATCH e DELETE.
Uma aplicação intermediária “cadastro-entrega.js” foi criada para criar uma relação entre o serviço de Pedidos e o serviço de Entregas. Quando o pedido tem seu status alterado para “fechado”, automaticamente a aplicação “cadastro-entregas.js” é chamada e por sua vez realiza o cadastro de uma nova entrega, preenchendo os campos do Id do Cliente e do Id do Pedido, para testar esta aplicação basta criar uma Order com o POST e em seguida em PATCH ORDER alterar o status para “fechado”, logo após é possível verificar que uma nova entrega foi criada.

Muito obrigado pelo conteúdo apresentado,

Abraços.
