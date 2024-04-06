import { useEffect, useState } from "react";
import Pets from "../services/Pets";

export const useFormPet = (initialForm, validateForm, caso) => {
    const { createNewPet, response, errors: signinErrors } = Pets();
    const [responseSuccess, setResponseSuccess] = useState("");
    const [responseErrors, setResponseError] = useState("");
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm(form));

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            if (caso === 1) {
                createNewPet(form);
            }
        } else {
            return;
        }
    };

    useEffect(() => {
        setLoading(false);
        if (signinErrors) {
            setResponseError(signinErrors);
            const timeoutId = setTimeout(() => {
                setResponseError(null);
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [signinErrors]);

    useEffect(() => {
        setLoading(false);
        if (response) {
            setResponseSuccess(response);
            const timeout = setTimeout(() => {
                setResponseSuccess(null);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [response]);

    return {
        form,
        errors,
        loading,
        responseErrors,
        responseSuccess,
        handleChange,
        handleBlur,
        handleSubmit
    }
}