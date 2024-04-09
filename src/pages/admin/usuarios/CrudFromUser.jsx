import { useEffect, useState } from "react"
import { Input } from "../../../components/Ui/Input";

const initialForm = {
    usuario: "",
    email: "",
    phone: "",
    password: "",
    id: null
}


function CrudFromUser({createData, updateData, dataToEdit, setDataToEdit}) {

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initialForm);
        }
    }, [dataToEdit]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.constellation){
            alert("Datos incompletos");
            return;
        }

        if (form.id === null){
            createData(form);
        } else {
            updateData(form);
        }

        handleReset();
    };

    const handleReset = (e) => {
        setForm(initialForm);
        setDataToEdit(null);
    };

    return (
        <div className="">
            <h1 className="bg-secondaryBlue text-primaryBlue p-2 text-center font-medium text-xl">Agrear nuevo usuario</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex space-x-5 mt-3">
                    <Input
                        type="text"
                        name="usuario"
                        placeholder="Usuario"
                        onChange={handleChange}
                        value={form.usuario}
                    />
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={form.email}
                    />
                </div>
                <div className="flex space-x-5 mt-3">
                    <Input
                        type="text"
                        name="phone"
                        placeholder="Teléfono"
                        onChange={handleChange}
                        value={form.phone}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        value={form.password}
                    />
                </div>
                <div className="flex mt-3 space-x-5">
                    <input
                        className="rounded-2xl border-2 border-secondaryBlue bg-white px-3 py-3
                        font-semibold uppercase text-secondaryBlue transition-all duration-300
                        hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                        hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                        active:rounded-2xl active:shadow-none"
                        type="submit"
                        value="Enviar"
                    />
                    <input
                        className="rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                        font-semibold uppercase text-secondaryBlue transition-all duration-300
                        hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                        hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                        active:rounded-2xl active:shadow-none"
                        type="reset"
                        value="Limpiar"
                        onClick={handleReset}
                    />
                </div>
            </form>
        </div>
    )
}

export default CrudFromUser