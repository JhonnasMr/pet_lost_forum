
export const regularExpresion = {
    email : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]{11,}$/,
    uuid: /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/,
    url: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?(\?[^\s]*)?$/,
    noSimbol25char: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,25}$/  
}
