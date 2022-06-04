const Redux = require('redux');
const { createStore, combineReducers } = Redux;


// FUNÇÕES CRIADORAS
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


// FUNÇÕES REDUCERS
const vestibularReducer = (listaCandidatos = [], acao) => {
    if(acao.type === 'REALIZAR_VESTIBULAR') {
        listaCandidatos = [...listaCandidatos, acao.payload]
    }

    return listaCandidatos;
}


const matriculaReducer = (listaMatriculados = [], acao) => {
    if(acao.type === 'REALIZAR_MATRICULA') {
        listaMatriculados = [...listaMatriculados, acao.payload];
    }

    return listaMatriculados;
}

const listaAprovados = (store) => {
    console.log(store.getState().matriculaReducer.filter(candidato => candidato.status === 'M'));
}

const visualizarStatus = (store, cpf) => {
    console.log(store.getState().matriculaReducer.filter(candidato => candidato.cpf === cpf));
}


const reducers = combineReducers({
    vestibularReducer,
    matriculaReducer
});

const store = createStore(reducers);

console.log(store.getState());

const acaoVestibularJose = realizarVestibular('José', '123');
store.dispatch(acaoVestibularJose);
console.log(store.getState());

const acaoVestibularMaria = realizarVestibular('Maria', '124');
store.dispatch(acaoVestibularMaria);
console.log(store.getState());

const acaoVestibularJoao = realizarVestibular('João', '125');
store.dispatch(acaoVestibularJoao);
console.log(store.getState());


//
const acaoRealizarMatriculaJose = realizarMatricula('123', 'M');
store.dispatch(acaoRealizarMatriculaJose);
console.log(store.getState());

const acaoRealizarMatriculaMaria = realizarMatricula('124', 'NM');
store.dispatch(acaoRealizarMatriculaMaria);
console.log(store.getState());

const acaoRealizarMatriculaJoao = realizarMatricula('125', 'M');
store.dispatch(acaoRealizarMatriculaJoao);
console.log(store.getState());

listaAprovados(store);
visualizarStatus(store, '123');
visualizarStatus(store, '124');
visualizarStatus(store, '125');




