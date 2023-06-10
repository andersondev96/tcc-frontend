import { FormEvent } from "react";

export function cep(event: FormEvent<HTMLInputElement>) {
    event.currentTarget.maxLength = 9;
    let value = event.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    event.currentTarget.value = value;

    return event;
}


export function currency(event: FormEvent<HTMLInputElement>) {
    let value = event.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1.$2");
    //value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

    event.currentTarget.value = value;
    return event;

}

export function cnpj(event: FormEvent<HTMLInputElement>) {
    event.currentTarget.maxLength = 18;
    let value = event.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

    event.currentTarget.value = value;
    return event;

}

export function phone(event: FormEvent<HTMLInputElement>) {
    event.currentTarget.maxLength = 14;
    let value = event.currentTarget.value;
    value = value.replace(/\D/g, "");

    if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else if (value.length === 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }

    event.currentTarget.value = value;
    return event;
}

