# DIWE CHALLENGE
Listagem de contatos feita para o desafio técnico do processo seletivo da DIWE.

[![Netlify Status](https://api.netlify.com/api/v1/badges/6ad84fa7-f383-4750-ab1e-d8593b86581e/deploy-status)](https://app.netlify.com/sites/diwe-marcos/deploys)
## Demo

#### A aplicação em funcionamento pode ser vista [clicando aqui.](https://diwe-marcos.netlify.app);
```json
Login
{
  "email": "user@diwe.com.br",
  "password": "password"
}
```
##### O layout da aplicação foi baseado nesse arquivo do [Figma.](https://www.figma.com/file/MlDF7BP1BgodRv0BO4EQ4C/Desafio)

## Funcionalidades
- Visualizar os contatos no cadastrados em um banco de dados
- Ordenar os contatos através de diferentes filtros
- Registrar, deletar e criar novos contatos

## Tecnologias

As tecnologias usadas no projeto e o motivo pela qual usei elas foram:

- [React](https://pt-br.reactjs.org) - Framework de front-end com o qual tenho maior experiência.
- [Miragejs](https://miragejs.com) - Ferramenta usada para mockar a API do projeto tanto nos testes quanto no desenvolvimento.
- [react-query](https://react-query.tanstack.com) - Biblioteca para lidar com dados assíncronos com opções de customização úteis, como caching, auto-update, validation, etc;
- [Cypress](https://www.cypress.io) - Biblioteca para testes E2E
- [styled-components](https://styled-components.com/docs/basics) - Biblioteca que me permite criar "component-level css", pra facilitar na manuntenção e evitar problemas de nomenclaturas de classes, além de outras funcionalidades úteis.
- [Sass](https://sass-lang.com) - Sintaxe bem mais amigável e rica para CSS, usada junto com o styled-components.


## Instalação

Clone o projeto

```bash
  git clone git@github.com:marcosebsilva/diwe-challenge.git
```

Entre no diretório do projeto

```bash
  cd diwe-challenge
```

Instale as dependências

```bash
  yarn install
```

Inicie o projeto

```bash
   yarn start
```
## Hooks
#### Ambos os hooks usam ContextAPI por debaixo dos panos.
### useToken()
Permite resgatar e atualizar o token de autenticação em qualquer componente encapsulado pelo **TokenProvider.**
```js
// src/hooks/useToken 
import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const TokenContext = React.createContext('');

export function TokenProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const providerValue = useMemo(() => ([authToken, setAuthToken]), [authToken, setAuthToken]);
  return (
    <TokenContext.Provider value={providerValue}>
      {children}
    </TokenContext.Provider>
  );
}

export default function useToken() {
  return useContext(TokenContext);
}

TokenProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
```
#### Usabilidade
Retorna um array com dois valores, sendo `array[0]` o valor do token de autenticação e `array[1]` a função de atualização. É necessário que o componente fazendo uso desse hook esteja encapsulado pelo **TokenProvider** exportado  do mesmo módulo do hook.
```javascript
    const [token, setToken] = useToken();
```


### useEditMode()
Quando utilizado, fornece informações sobre o **modo de edição** dos contatos. 
```js
// src/hooks/useEditMode
import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const EditModeContext = React.createContext();

export function EditModeProvider({ children }) {
  const [editMode, setEditMode] = useState({ open: false, item: null });

  const toggleEditMode = (id = null) => {
    if (editMode.open) {
      setEditMode({ open: false, item: null });
      return;
    }

    setEditMode({ open: true, item: id });
  };
  const providerValue = useMemo(() => ([editMode, toggleEditMode]), [editMode, toggleEditMode]);
  return (
    <EditModeContext.Provider value={providerValue}>
      {children}
    </EditModeContext.Provider>
  );
}

export default function useEditMode() {
  return useContext(EditModeContext);
}

EditModeProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
```
#### Usabilidade
Recebe um parametro `id`, representando o contato a ser editado e retorna um objeto contendo as chaves: `open`  e `id` que indicam, respectivamente, o **status do modo de edição** e o **contato que está sendo editado**. Se for executado com o modo de edição aberto ou sem nenhum parâmetro, vai agir como um **toggle** para o modo de edição.

```javascript
  const editMode = useEditMode(id);
```
## Testes
Abre o Cypress com:
```sh
yarn run cypress:open
```
Selecione a spec disponível.
## Deploy

Para criação dos arquivos de produção:

```sh
yarn run build
```

### Melhorias e aprendizados.
Um tempo finalizado de ter finalizado o projeto, parei pra organizar a documentação e encontrei alguns problemas relativamente importantes e que eventualmente vão ser corrigidos e que me serviram como aprendizados:
- **1)** a funcionalidade dos hooks ficou um pouco imprevisível e sucetível a falhas por falta de uma lógica que garante o tipo dos inputs e outputs. Isso também poderia ser facilmente resolvido se o desenvolvimento fosse feito com **TypeScript** ou alguns testes unitarios.
- **2)** um dos hooks, o **useEditMode** partiu de uma idéia legal que poderia facilmente ter sido implementada de forma mais fácil usando modais.
- **3)** um dos pontos fortes do React são as bibliotecas disponibilizadas pela comunidade. Faz sentido não querer depender de várias bibliotecas diferentes por questões de compatibilidade, por exemplo. Apesar disso, algo que não tinha me atentado era: o quanto o uso daquela biblioteca é importante na minha aplicação? Isso me fez decidir por não implementar algumas libs simples que seriam extremamente úteis e não resultariam no problema descrito, como o **[react-modal](https://www.npmjs.com/package/react-modal)**.

