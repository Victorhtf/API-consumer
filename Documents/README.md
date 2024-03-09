
# INTRADATA
O backend do INTRADATA; Acessível em https://api.intradata.ai/. É desenvolvido utilizando Typescript/Node e é acessado através da interface Frontend do INTRADATA, bem como por meio de CRUD, Dremio e outras funcionalidades.
O acesso ao INTRADATA seja de clientes é feito através de USUÁRIOS, cada cliente possui um usuário principal (administrador da loja) podendo ter ou não outros usuários associados ao Administrador, nesse caso é criado um 'Grupo de cliente', ao qual é possível associar outros usuários em um único grupo de loja, o usuário permite acesso ao frontend e à API.

Para a criação de cada usuário são necessários algumas informações, são elas:
-  _Nome de usuário e senha:_ Nome de usuário e senha que o cliente irá utilizar para autenticar na plataforma.

-  _E-mail:_ Para fim de registro e controle de acessos é necessário um e-mail, ao qual permite a identificação do usuário.

-  _Roles:_ Roles são os papéis que cada usuário vai possuir. Cada usuário pode possuir uma ou mais ROLES. A associação de USUÁRIOS à ROLES garante o acesso a diferentes funcionalidades de acordo com a permissão. Atualmente existem as seguintes ROLES que estão atreladas as seguintes permissões:

	- _SYS_ADMIN:_ Administrator of the Platform / All permissions

	-  _ADMIN:_ Administrator of the Customer_Group and its Customer / Ambients

	- _PHYSICAL_WORLD_READER:_ Can only read Physical World Data

	- _PHYSICAL_WORLD_MANAGER:_ Can read / manage Physical World Data

	- _META_WORLD_READER:_ Can only read Meta Integration Data

	- _META_WORLD_MANAGER:_ Can read / manage Meta Integration Data

	- _PHYSICAL_NOTIFICATIONS_READER:_ Can only read Physical World Notification Data

	- _PHYSICAL_NOTIFICATIONS_MANAGER:_ Can read / manage Physical World Notification Data.

	- _CALENDAR_EVENTS_DETAILS_READER:_ Can see the details of a Calendar Event.

	- _CALENDAR_EVENTS_MANAGER:_ Can create / update / delete Calendar Events.

Com a criação de usuários é feita também a criação de 'Grupos de clientes', onde é possível associar diversos usuários a um 'Grupo de usuário'.
Como o INTRADATA serve para visualizar e entender o fluxo de pessoas em um determinado espaço faz sentido alguns clientes terem mais de uma loja/espaço monitorado, esse espaço é denominado 'Ambiente' e posteriormente é possível vincular os usuários ao ambiente. Cada ambiente possui associado um **ID externo, nome, grupo de cliente e endereço**.
As câmeras são criadas através do consumo da API do X-Faces, e para a criação corretas são necessários passar alguns parâmetros como:

  
- **Nome:** Nome associado à câmera.

-  **Ambiente:** Ambiente vinculado à câmera.

-  **URL da stream:** URL fonte da stream da câmera. (Em protocolo RTSP - Real time streaming protocol).

-  **Tipo de câmera:** (ENTRANCE/EXIT/ZONE/EXTERNAL/PEDESTRIANS)

	-  _ENTRANCE_: Câmera do tipo 'ENTRADA'.
	-  _EXIT_: Câmera do tipo 'SAÍDA'.
	-  _ZONE_: Câmera do tipo 'ZONA'.
	-  _EXTERNAL_: Camera do tipo 'EXTERNA'.
	-  _PEDESTRIANS_: Câmera do tipo 'PEDESTRES'

  

### Estrutura de Diretórios
-  **middleware**: Implementa middleware para processamento de solicitações, incluindo adição de metadados à token de login.
-  **migration**: Contém arquivos relacionados a migrações de banco de dados.
-  **queries**: Contém consultas relacionadas a obtenção e conversão de dados.
-  **queries_excel**: Implementa consultas e controle para integração "Phygital" e remoção de integração de linhas de banco de dados.
-  **queries_facebook**: Contém consultas relacionadas ao Facebook.
-  **ssl_certificate**: Contém os arquivos relacionados aos certificados SSL, gerados com o LETS_ENCRYPT.
-  **config**: Contém arquivos de configuração do projeto, incluindo ajustes e configurações gerais.
-  **controller**: Implementa controladores para manipular as rotas da interface.
-  **entity**: Contém arquivos relacionados à definição de entidades de dados.
-  **routes**: Contém a implementação das rotas (caminhos) adicionais para o backend do INTRADATA.
-  **services**: Implementa serviços relacionados ao GRAPHQL do Facebook, integração com Dremio e configurações relacionadas ao X-Faces.

  

### Middlewares
-  **checkJwt.ts**: Este middleware é responsável por verificar se um token JWT válido está presente nos cabeçalhos da solicitação HTTP. Ele garante a autenticação das solicitações antes de permitir o acesso aos recursos protegidos da API.

-  **checkPermission.ts**: Esse middleware é usado para verificar se o usuário tem permissões adequadas para acessar determinados recursos da API. Ele garante que apenas usuários autorizados possam realizar determinadas operações.

-  **checkRole.ts**: Este middleware é usado para verificar se o usuário possui o papel (role) necessário para acessar determinados recursos da API. Ele ajuda a controlar o acesso com base nas funções específicas atribuídas aos usuários.

-  **getJwtData.ts**: Esse middleware é responsável por extrair e decodificar os dados do token JWT, fornecendo acesso aos dados do usuário autenticado em outras partes da aplicação.

-  **setFiltersAux.ts**: Este middleware é usado para definir filtros auxiliares em consultas ou operações específicas da aplicação. Pode ser utilizado para manipular e refinar os dados antes de serem processados ou retornados pela API.

  

### Migrations
Atualmente o INTRADATA não possui arquivos de migrações ou históricos de mapeamento de bancos de dados.

  

### Queries
Apesar da aplicação do ORM (Object relational mapping) ainda sim existem algumas consultas que os controladores realizam são feitas através de **QUERIES** em linguagem SQL através do método queryRunner do TypeORM.
Obs: Esse mix se deve pela facilidade de realizar algumas tratativas de informações de forma mais fácil e prático por queries que por linguagem de programação orientada a objetos.

  

### Queries Excel
As queries Excel são queries que se utilizava quando o INTRADATA possuía um frontend de DEMONSTRAÇÃO da plataforma para novos usuários, e potenciais clientes. Atualmente não se usa essa plataforma.

  

### Queries Facebook
São queries que realizam consultas que dizem a respeito das informações Ads. Como impressões, curtidas, engajamento e etc. São utilizadas a fim de sincronizar o ambiente virtual (postagens e campanhas de marketing) com o físico.
Essa sincronia de físico + digital é chamado de Phygital.

  

### SSL Certificate
Esta pasta contém os certificados SSL para que o navegador consiga fazer a autenticação com o backend. Os certificados são checados pelo framework NGINX (servidor HTTP e proxy reverso).

Os certificados são gerados automaticamente a cada 90 dias pelo script Certbot, através da certificadora **LET'S ENCRYPT**.
Para gerar um par de certificado local é possível usar a biblioteca OpenSSL através do terminal bash (linux) ou Powershell (Windows) através do comando:

`openssl req -newkey rsa:2048 -nodes -keyout privkey.pem -x509 -days 365 -out fullchain.`

No contexto:
- rsa:2048 sinaliza a intenção de codificar uma chave privada utilizando a base de 2048 bits que é armazenada como **'privkey.pem'**.
- Como esse certificado autogerado será utilizado para desenvolvimento local, sinalizamos a intenção de não incluir uma autoridade certificadora através da flag **-x509**.
- O backend precisa do par de chaves para funcionar corretamente.

  

### Configs
Esta pasta contém todos os arquivos de configuração do Intradata, são arquivos que configuram o ambiente. Para configurar o projeto basta criar os arquivos com os nomes do arquivos e as informações, com os respectivos nomes, excluindo o 'Example'.
Obs: Todos os arquivos precisam estar presentes (pelo menos existentes) na pasta para a inicialização mínima do backend.
  

-  **XFaceConfigGRAPHQL_Example.ts**: Usado para demonstrar como integrar o sistema com um servidor GraphQL.
	`protocol`: Define o protocolo de comunicação (http, https, etc.).
	`url`: Especifica o URL do servidor GraphQL, incluindo o endereço IP ou o nome do host e a porta.
	`basePath`: Define o caminho base para as solicitações GraphQL.

  
-  **XFaceConfigOdata_Example.ts**: Arquivo exemplo de configuração para integração com OData, um protocolo para construir e consumir APIs RESTful.

 
-  **XFaceConfigREST_Example.ts**: Exemplo de configuração para a criação de contêineres Docker, organizando os arquivos e dependências necessárias para implantar e executar a aplicação em um ambiente de contêiner.

- **dremioConfig_Example.ts**: Configuração relacionada a conexão com Dremio.

	`loginBasePath`: Define o caminho base para o login no servidor Dremio.
	`dataBasePath`: Define o caminho base para as operações de consulta de dados no servidor Dremio.
	`userName`: Especifica o nome de usuário para autenticação no servidor Dremio.
	`password`: Especifica a senha para autenticação no servidor Dremio. 


- **facebookAPIConfig_Example.ts**: Este arquivo parece ser uma configuração relacionada à integração com o Facebook, possivelmente contendo chaves de API, tokens de acesso e outras configurações necessárias para se comunicar com a API do Facebook.
 
	`appId`: Especifica o ID do aplicativo do Facebook.
	`appSecret`: Especifica o segredo do aplicativo do Facebook.
	

- **jwtConfig_Example.ts**: Este arquivo de configuração é relacionado à configurações do JWT (JSON Web Token) usado para autenticação e autorização na aplicação.

	`jwtSecret`: Especifica a chave secreta usada para assinar e verificar tokens JWT.

	- Obs: Para criação de uma chave JWT basta acessar o BCrypt Generator (https://bcrypt-generator.com/) e gerar uma chave de autenticação utilizando 8 rounds de criptografia.

  

-  **ormConfig_Example.ts**: Relacionado à estrutura do banco de dados, possivelmente descrevendo as mudanças na estrutura do banco de dados e revisando as APIs associadas para refletir essas mudanças.

	`type`: Define o tipo de banco de dados (postgres, mysql, etc.).
	`host`: Especifica o endereço do servidor de banco de dados.
	`port`: Define a porta de conexão com o servidor de banco de dados.
	`username`: Especifica o nome de usuário para autenticação no banco de dados.
	`password`: Especifica a senha para autenticação no banco de dados.
	`database`: Especifica o nome do banco de dados a ser utilizado.
	`schema`: Define o esquema do banco de dados.
	`synchronize`: Indica se as entidades devem ser sincronizadas automaticamente com o banco de dados. (True or false: **True** cria as entidades não sincronizadas automaticamente)
	`logging`: Indica se as consultas SQL devem ser registradas. (true or false)
	`entities`: Especifica o caminho para os arquivos de entidades (modelos de dados).
	`migrations`: Define o caminho para os arquivos de migração do banco de dados.

  

### Controllers
Grande parte dos controllers possuem controladores para os métodos GET, POST, PATCH e DELETE. Grande parte dos controllers e dos métodos são utilizados tanto no Frontend quanto no CRUD. Alguns estão presentes apenas no CRUD pelo fato do CRUD ser uma plataforma apenas para a role SYS_ADMIN (administrador de sistema)

-  **AmbientController.ts**: Implementa rotas para operações CRUD relacionadas a ambientes.
-  **AmbientSalesController.ts**: Implementa rotas relacionadas a vendas de ambientes.
-  **AuthController.ts**: Implementa autenticação e manipulação de tokens de login.
-  **CalendarEventController.ts**: Implementa rotas para operações CRUD relacionadas a eventos de calendário.
-  **CalendarEventGlobalController.ts**: Implementa rotas globais para operações CRUD relacionadas a eventos de calendário.
-  **CameraController.ts**: Implementa rotas relacionadas a câmeras, incluindo validação de tipo ao criar câmeras.
-  **CityController.ts**: Implementa rotas relacionadas a cidades, incluindo uma nova rota para listar cidades.
-  **CustomerController.ts**: Implementa rotas para operações CRUD relacionadas a clientes.
-  **CustomerGroupController.ts**: Implementa rotas para operações CRUD relacionadas a grupos de clientes.
-  **DremioController.ts** / **DremioController_DEMO.ts** / **DremioFacebookController.ts**: Implementam alterações relacionadas às queries do Dremio.
-  **FbCampaignsController.ts**: Implementa consultas e controle relacionados a campanhas do Facebook, trazendo informações sobre curtidas, campanhas, público atingido, etc.
-  **MetaAPIController.ts**: Implementa consultas relacionadas ao Facebook Insights, para entender como as campanhas têm relação com o público-alvo da página.
-  **UserController.ts**: Implementa rotas para operações CRUD relacionadas a usuários da plataforma.
-  **UserXAmbientController.ts**: Implementa novas rotas relacionadas a associações entre usuários e ambientes.
-  **WatchlistAmbientController.ts** e outros controllers de watchlist: Implementam consultas e controle relacionados a listas de observação do X-Faces.

  

### Entity:
No INTRADATA as entidades usam o TypeORM para para criação das tabelas e das colunas necessárias.

Foram definidas algumas relações através da propriedade **Many to Many e One to Many**, dessa forma é possível criar **relations** entre colunas de uma tabela com colunas de outra tabela. Essas relations são criadas pelo próprio TypeORM através de chaves estrangeiras no banco de dados.

  

### Routes
Criação de rotas para direcionar os controladores, organizadas em um arquivo central index.ts para seguir padrões de clean code, com controle de acesso baseado em roles de usuários.
As rotas retornam uma função (no controller) que irá como o nome diz, controlar o comportamento ao acessar a rota. Além disso todas as rotas possuem seus próprios arquivos, no entanto uma hierarquia foi estabelecida e todas as rotas foram centralizadas no arquivo index.ts a fim de seguir padrões de clean code. Ex: na autenticação a primeira rota a ser chamada é a rota de autenticação (auth.ts). Se o usuário autenticado for conter as roles de 'ADMIN' ele poderá acessar as demais rotas, inclusive rotas de administração.

Obs: Existem rotas que possuem acesso liberado apenas ao administrador, essas se encontram nos diretórios 'admin'. As demais podem ser acessadas independente de autenticação.

  

### Services
Plugins do backend para integração com Dremio, Facebook API e X-Faces, facilitando a comunicação e manipulação de dados entre diferentes sistemas.
1.  **Dremio:** Criação de uma instância do Dremio, login/conexão nessa instância e por fim; envio da query, todas solicitações HTTPS utilizando AXIOS.

	- É possível também fazer uma requisição ao Dremio solicitando os status de jobs.

2.  **Facebook GraphQL:** Semelhante ao serviço anterior, no entanto nessa instância se define apenas a conexão com a API do Facebook. Ao qual será utilizada em outros ambientes, como por exemplo no Frontend.

3.  **X-Faces:** Por fim é consumida a API do X-Faces, nessa API existem 3 diferentes arquivos:

	- Camera.ts:\*\* Responsável por criar uma câmera para streaming e reconhecimento facial dentro do portal do X-Faces, aqui são passados alguns parâmetros como tamanho mínimo do rosto, threshold (margem de acerto) mínima e outras configurações. Para acessar todos os possíveis parâmetros consultar a documentação do X-Faces (https://developers.innovatrics.com/smartface/docs/manuals/smartface-platform/api/).

  
---
### Observações
- Não existem testes automatizados de carga, unitários e etc.
- Logs atualmente estão descentralizados.
- Não existe um container que possua o INTRADATA para fins de desenvolvimento.

  

---