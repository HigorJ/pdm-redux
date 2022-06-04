const Redux = require('redux');
const prompts = require('prompts');

const { createStore, combineReducers } = Redux;

const realizarVestibular = (nome, cpf) => {
    const entre6e10 = Math.random() <= 0.7;
    const nota = entre6e10 ? 6 + Math.random() * 4 : 0 + Math.random() * 6;

    return {
        type: 'REALIZAR_VESTIBULAR',
        payload: {
            nome,
            cpf,
            nota
        }
    }
}

const realizarMatricula = (cpf, status) => {
    return {
        type: 'REALIZAR_MATRICULA',
        payload: {
            cpf,
            status
        }
    }
}

const historicoVestibularReducer = (historicoVestibular = [], acao) => {
    if(acao.type === 'REALIZAR_VESTIBULAR') {
        historicoVestibular = [...historicoVestibular, acao.payload]
    }

    return historicoVestibular;
}


const historicoMatriculaReducer = (historicoListaMatriculados = [], acao) => {
    if(acao.type === 'REALIZAR_MATRICULA') {
        historicoListaMatriculados = [...historicoListaMatriculados, acao.payload];
    }

    return historicoListaMatriculados;
}

const todosOsReducers = combineReducers({
    historicoVestibularReducer,
    historicoMatriculaReducer
});

const store = createStore(todosOsReducers);

const main = async () => {
    const menu = "1 - Realizar Vestibular\n2 - Realizar Matrícula\n3 - Visualizar Meu Status\n4 - Visualizar a Lista de Aprovados\n0 - Sair";

    let response;
    
    do {
        response = await prompts({
            type: 'number',
            name: 'op',
            message: menu
        });

        switch(response.op) {
            case 1: {
                const { nome } = await prompts({
                    type: 'text',
                    name: 'nome',
                    message: 'Digite o seu nome: '
                });

                const { cpf } = await prompts({
                    type: 'text',
                    name: 'cpf',
                    message: 'Digite o seu CPF: '
                });

                const acao = realizarVestibular(nome, cpf);
                store.dispatch(acao);               
                break;
            }
            case 2: {
                const { cpf } = await prompts({
                    type: 'text',
                    name: 'cpf',
                    message: 'Digite o seu CPF: '
                });

                const aprovado = store.getState().historicoVestibular().find(aluno => aluno.cpf === cpf && aluno.aluno >= 6);

                store.dispatch(realizarMatricula(cpf, aprovado ? 'M' : 'NM'));
                break;
            }
            case 3: {

            }
                break;
            case 4: {

            }
                break;
            default:

        }
    } while (response.op !== 0);
}

const listaAprovados = (store) => {
    console.log(store.getState().matriculaReducer.filter(candidato => candidato.status === 'M'));
}

const visualizarStatus = (store, cpf) => {
    console.log(store.getState().matriculaReducer.filter(candidato => candidato.cpf === cpf));
}


