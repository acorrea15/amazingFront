import * as Yup from 'yup';

export const LOGIN_SCHEMA = Yup.object().shape({
    documento: Yup.number()
        .required("Documento es requerido"),
      password: Yup.string()
        .min(8, "debe tener al menos 8 caracteres")
        .max(15, "debe tener máximo 15 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            "debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"
            )
        .required("Contraseña es requerida"),
});