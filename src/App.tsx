import {
  FC,
  FormEvent,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";

interface Usuario {
  cep: string;
}

export const App = () => {
  const [usuario, setUsuario] = useState({} as Usuario);

  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }, []);

  return (
    <div className="w-full h-screen bg-slate-600  flex justify-center">
      <div className="container w-10/12 bg-white text-center">
        <h1 className="text-2xl font-bold">Input Masks com React</h1>
        <section id="inputs" className="px-4 mt-4">
          <label htmlFor="">CEP:</label>
          <CustomInput
            placeholder="12345-678"
            name="cep"
            onChange={handleChange}
            mask="cep"
          />
          <p className="text-left text-xs text-slate-400">
            *apenas números são permitidos
          </p>
          <label htmlFor="">CPF:</label>
          <CustomInput
            placeholder="123.456.789-10"
            name="cpf"
            onChange={handleChange}
            mask="cpf"
          />
          <p className="text-left text-xs text-slate-400">
            *apenas números são permitidos
          </p>
          <label htmlFor="">Moeda:</label>
          <CustomInput
            placeholder="123,10"
            name="currency"
            onChange={handleChange}
            mask="currency"
            prefix="R$"
          />
          <p className="text-left text-xs text-slate-400">
            *apenas números são permitidos
          </p>
        </section>
      </div>
    </div>
  );
};

export default App;

// ##################################################

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: "cep" | "cpf" | "currency";
  prefix?: string;
}

const CustomInput: FC<InputProps> = ({ mask, prefix, ...props }) => {
  const handleKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
    if (mask === "cep") {
      cep(e);
    }
    if (mask === "cpf") {
      cpf(e);
    }
    if (mask === "currency") {
      currency(e);
    }
  }, []);
  return (
    <div className="flex items-center">
      {prefix && <span className="text-4xl bg-slate-400 p-1">{prefix}</span>}
      <input
        {...props}
        onKeyUp={handleKeyUp}
        className="w-full border border-slate-900 text-2xl pl-4 py-2 "
      />
    </div>
  );
};

// ########################### //
// ### FUNÇÕES DE MASCARAS ### //
// ########################### //

function cep(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 9;
  let value = e.currentTarget.value;
  // D -> pega tudo que NÃO for número
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  e.currentTarget.value = value;
  return e;
}

function cpf(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14;
  let value = e.currentTarget.value;
  // D -> pega tudo que NÃO for número
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
  e.currentTarget.value = value;
  return e;
}

// 123.456.789-12

function currency(e: FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value;
  // D -> pega tudo que NÃO for número
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

  e.currentTarget.value = value;
  return e;
}
