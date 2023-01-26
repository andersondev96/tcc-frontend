
export default function getCEP(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json`;

    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.onerror = function (e) {
        return 'CEP INVÁLIDO'
    }

    request.onload = () => {
        const response = JSON.parse(request.responseText);

        if (response.erro === true) {
            return 'CEP NÃO ENCONTRADO';
        } else {
            return {
                'cep': response.cep,
                'logadouro': response.logadouro,
                'bairro': response.bairro,
                'cidade': response.cidade,
                'uf': response.uf
            };
        }
    }

    request.send();
}