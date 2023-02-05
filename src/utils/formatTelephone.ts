
export default function formatTelephone(telephone: string) {
    const phoneNumber = telephone;
    const formattedPhone = phoneNumber.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');

    return formattedPhone;
}