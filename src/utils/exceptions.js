export class DataNotFoundException {
  constructor(message = 'Nenhum dado foi encontrado') {
    this.msg = message;
    const exception = {
      success: false,
      message: this.msg,
    };
    return exception;
  }
}

export class AuthenticationFailedException {
  constructor(message = 'Falha na autenticação') {
    this.msg = message;
    const exception = {
      auth: false,
      message: this.msg,
    };
    return exception;
  }
}

export class InvalidCredentialsException {
  constructor(message = 'Login digitado inválido ou não encontrado') {
    this.msg = message;
    const exception = {
      auth: false,
      message: this.msg,
    };
    return exception;
  }
}

export class CredentialsExistenteException {
  constructor(message = 'E-mail já cadastrado') {
    this.msg = message;
    const exception = {
      auth: false,
      message: this.msg,
    };
    return exception;
  }
}

export class InvalidEmailException {
  constructor(message = 'E-mail inválido') {
    this.msg = message;
    const exception = {
      auth: false,
      message: this.msg,
    };
    return exception;
  }
}

export class PasswordTips {
  constructor(
    message = 'Senha inválida, use pelo menos 6 caracteres, letra maiúscula, minúscula e número'
  ) {
    this.msg = message;
    const exception = {
      auth: false,
      message: this.msg,
    };
    return exception;
  }
}

export class PasswordsDontMatch {
  constructor(message = 'Senhas não conferrem, tente novamente') {
    this.msg = message;
    const exception = {
      auth: false,
      message: this.msg,
    };
    return exception;
  }
}

export class PasswordPrevious {
  constructor(message = 'Senha precisa ser diferente da anterior') {
    this.msg = message;
    const exception = {
      auth: false,
      message: this.msg,
    };
    return exception;
  }
}

export class InvalidQueryException {
  constructor(message = 'Tipo inválido/query não encontrada') {
    this.msg = message;
    const exception = {
      success: false,
      message: this.msg,
    };
    return exception;
  }
}

export class CacheError {
  constructor(message = 'Erro ao buscar dados no cache') {
    this.msg = message;
    const exception = {
      success: false,
      message: this.msg,
    };
    return exception;
  }
}
