
export default function removeMasksTelephone(telephone: string) {
    const phoneFormatted = telephone.replace(/[^\d\s+]/g, '');

    const removeSpaces = phoneFormatted.replace(/[\s+]|^\+/, '');

    console.log(removeSpaces);

    return removeSpaces;
}