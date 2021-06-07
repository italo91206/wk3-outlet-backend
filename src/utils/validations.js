/**
 * Documentos:
 * https://joi-tester.corneroftheinternet.rocks/public/html/docs.html#stringemailoptions
 * https://medium.com/@rossbulat/joi-for-node-exploring-javascript-object-schema-validation-50dd4b8e1b0f
 */

const Joi = require('@hapi/joi');
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;

const userSchema = Joi.object({
  /** A primeira regra é relacionada ao username, que será uma string (Joi.string),
   alfanumérica (alphanum), com no mínimo 3 no máximo 30 caracteres (min e max)
   e que é uma propriedade obrigatória (required). */
  username: Joi.string().min(3).max(85).required(),
  /** Já a terceira regra, birth_year define que esse dado deve ser um número (Joi.number),
   * inteiro (integer) e com o seu valor entre 1900 e 2001 (min e max). */
  //birth_year: Joi.number().integer().min(1900).max(2001),
  /** a função email que recebe configurações por parâmetro como
   * minDomainSegments (para definir o número de partes mínima no
   * domínio do e-mail) e tlds
   * (Top Level Domains – para permitir ou bloquear extensões específicas de
   * domínio). */
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  //lista dos dominios https://data.iana.org/TLD/tlds-alpha-by-domain.txt
});

const userSchemaPassword = Joi.object({
  /** A segunda regra é no password,
   * que também deve ser uma string mas deve seguir o padrão (pattern),
   * declarado sob a forma de uma expressão regular que aceita de 3 a 30
   * letras maiúsculas, minúsculas e números.*/
  password: Joi.string().regex(RegExp(passwordRegex)).required().min(6).max(20),
  confirmPassword: Joi.string()
    .regex(RegExp(passwordRegex))
    .required()
    .min(6)
    .max(20),
});

module.exports = {
  userSchema,
  userSchemaPassword,
};
