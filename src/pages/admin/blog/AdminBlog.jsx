import { useEffect, useState } from "react";
import Danger from "../../../components/Ui/Alertas/Danger";
import Success from "../../../components/Ui/Alertas/Success";
import Loader from "../../../components/Ui/Loader";
import AdminLayout from "../AdminLayout";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import Button from "../../../components/Ui/Button";
import axios from "axios";
import CrudTableBlog from "./CrudTableBlog";
import Label from "../../../components/Ui/Label";
import { arrayBlog } from "../../../helpers/ArrayBlog";

function AdminBlog() {
  const [loading, setLoading] = useState(false);
  const [responseErrors, setResponseErrors] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [db, setDb] = useState([]);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/blog`)
      .then(({ data }) => setDb(data))
      .catch((error) => console.log(error));
    setLoading(false);
  }, [db]);

  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [clasificacion, setClasificacion] = useState("");
  const [categoria, setCategoria] = useState("");

  const editData = (el) => {
    setOpen3(true);
    setId(el._id);
    setSelectedImage(el.imageUrl);
    setTitulo(el.title);
    setDescripcion(el.content);
    setCategoria(el.categories);
  };

  const deleteData = (el) => {
    setOpen2(true);
    setId(el._id);
  };

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const clearFields = () => {
    setId("");
    setImage("");
    setTitulo("");
    setDescripcion("");
    setClasificacion("");
    setCategoria("");
    setSelectedClasificacion("");
    setSelectedCategoria("");
    setSelectedImage("");
    setMensajeError("");
  };

  const handleCanceled = () => {
    clearFields();
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  };

  const handleRegisterGaleria = async () => {
    if (
      titulo === "" ||
      descripcion === "" ||
      selectedCategoria === "" ||
      selectedImage === ""
    ) {
      setMensajeError("Todos los campos son obligatorios");
      return;
    } else {
      setLoading(true);
      const data = {
        title: titulo,
        content: descripcion,
        categories: selectedCategoria,
        imageUrl: selectedImage,
      };
      console.log(data);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/blog",
          data
        );
        setResponseSuccess(response.data.msj);
        console.log(response.data.msj);
      } catch (error) {
        if (error.response) {
          setResponseErrors(error.response.data);
        } else {
          setResponseErrors("Error al conectar con el servidor");
        }
      }
      setOpen(false);
      clearFields();
      setLoading(false);
    }
  };

  const [selectedClasificacion, setSelectedClasificacion] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");

  const handleClasificacionChange = (e) => {
    setSelectedClasificacion(e.target.value);
    console.log(e.target.value);
    setSelectedCategoria("");
  };

  const handleCategoriaChange = (e) => {
    setSelectedCategoria(e.target.value);
    console.log(e.target.value);
  };

  // Encontrar la clasificación seleccionada en el array
  const clasificacionSeleccionada = arrayBlog.find(
    (item) => item.clasificacion === selectedClasificacion
  );

  const [selectedImage, setSelectedImage] = useState("");
  const uploadImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "proyectojireh");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dl8odylct/image/upload",
      data
    );
    console.log(response.data);
    setSelectedImage(response.data.secure_url);
    console.log(response.data.secure_url);
    setLoading(false);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/blog/${id}`
      );
      setResponseSuccess(response.data.msj);
    } catch (error) {
      if (error.response) {
        setResponseErrors(error.response.data);
      } else {
        setResponseErrors("Error al conectar con el servidor");
      }
    }
    setOpen2(false);
    setLoading(false);
  };

  const confirmUpdate = async () => {
    if (
      titulo === "" ||
      descripcion === "" ||
      selectedCategoria === "" ||
      selectedImage === ""
    ) {
      setMensajeError("Todos los campos son obligatorios");
      return;
    } else {
      setLoading(true);
      const data = {
        title: titulo,
        content: descripcion,
        categories: selectedCategoria,
        imageUrl: selectedImage,
      };
      console.log(data);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/v1/blog/${id}`,
          data
        );
        setResponseSuccess(response.data.msj);
        console.log(response.data.msj);
      } catch (error) {
        if (error.response) {
          setResponseErrors(error.response.data);
        } else {
          setResponseErrors("Error al conectar con el servidor");
        }
      }
    }
    setOpen3(false);
    clearFields();
    setLoading(false);
  };

  useEffect(() => {
    if (responseErrors && responseErrors.length > 0) {
      const timer = setTimeout(() => {
        setResponseErrors(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [responseErrors]);

  useEffect(() => {
    if (responseSuccess && responseSuccess.length > 0) {
      const timer = setTimeout(() => {
        setResponseSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [responseSuccess]);

  return (
    <AdminLayout>
      <HeaderAdmin texto="BLOG ADMIN" linkText="blog administrador" />
      {loading && <Loader />}
      {responseSuccess && <Success mensaje={responseSuccess} />}
      {responseErrors && <Danger mensaje={responseErrors} />}
      <div className="px-10">
        <h1 className="my-10 bg-primaryBlue text-secondaryBlue p-2 text-4xl font-bold text-center">
          Blog
        </h1>
        <Button texto="Agregar un nuevo blog" onClick={() => setOpen(true)} />
        <CrudTableBlog data={db} editData={editData} deleteData={deleteData} />

        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="mx-auto my-4 w-96 mb-3">
            <h1 className="text-xl font-black text-gray-800 text-center">
              Agregar una nueva galeria
            </h1>
          </div>

          <div className="grid grid-cols-2 space-x-10">
            <div>
              <Label>Seleccione una clasificación</Label>
              <select
                className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
                value={selectedClasificacion}
                onChange={handleClasificacionChange}
              >
                <option value="">Selecciona una clasificación</option>
                {arrayBlog.map((item, index) => (
                  <option key={index} value={item.clasificacion}>
                    {item.clasificacion}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Seleccione una categoría</Label>
              <select
                className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
                value={selectedCategoria}
                onChange={handleCategoriaChange}
                disabled={!selectedClasificacion}
              >
                <option value="">Selecciona una categoría</option>
                {clasificacionSeleccionada &&
                  clasificacionSeleccionada.categorias.map((item, index) => (
                    <option key={index} value={item.categoriabd}>
                      {item.categoria}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="my-3">
            <Label>Titulo</Label>
            <textarea
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="my-3">
            <Label>Contenido</Label>
            <textarea
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="my-5 w-full">
            <Label>Imagen</Label>
            <div className="w-[80%] flex ml-[10%] rounded-full mb-5">
              {selectedImage && (
                <img
                  src={selectedImage}
                  className="w-28 h-28"
                  alt="Vista previa"
                />
              )}
              <div className="flex items-center justify-center w-[100%]">
                <input type="file" name="image" onChange={uploadImage} />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-red-500 font-bold">{mensajeError}</p>
          </div>

          <div className="flex gap-10 mt-10">
            <button
              onClick={handleCanceled}
              className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
            >
              Cancelar
            </button>
            <button
              onClick={handleRegisterGaleria}
              className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
            >
              Confirmar
            </button>
          </div>
        </Modal>

        <Modal open={open2} onClose={() => setOpen2(false)}>
          <div className="mx-auto my-4 w-96 mb-3">
            <h1 className="text-lg font-black text-gray-800 text-center">
              Eliminar Galeria
            </h1>
            <p className="text-sm text-gray-500 text-center mt-3">
              ¿Estas seguro que deseas eliminar esta galeria?
            </p>
          </div>
          <div className="flex gap-10 mt-10">
            <button
              onClick={handleCanceled}
              className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
            >
              Confirmar
            </button>
          </div>
        </Modal>

        <Modal open={open3} onClose={() => setOpen3(false)}>
          <div className="mx-auto my-4 w-96 mb-3">
            <h1 className="text-xl font-black text-gray-800 text-center">
              Editar blog
            </h1>
          </div>

          <div className="grid grid-cols-2 space-x-10">
            <div>
              <Label>Seleccione una clasificación</Label>
              <select
                className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
                value={selectedClasificacion}
                onChange={handleClasificacionChange}
              >
                <option value="">Selecciona una clasificación</option>
                {arrayBlog.map((item, index) => (
                  <option key={index} value={item.clasificacion}>
                    {item.clasificacion}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Seleccione una categoría</Label>
              <select
                className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
                value={selectedCategoria}
                onChange={handleCategoriaChange}
                disabled={!selectedClasificacion}
              >
                <option value="">Selecciona una categoría</option>
                {clasificacionSeleccionada &&
                  clasificacionSeleccionada.categorias.map((item, index) => (
                    <option key={index} value={item.categoriabd}>
                      {item.categoria}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="my-3">
            <Label>Titulo</Label>
            <textarea
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="my-3">
            <Label>Contenido</Label>
            <textarea
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="my-5 w-full">
            <Label>Imagen</Label>
            <div className="w-[80%] flex ml-[10%] rounded-full mb-5">
              {selectedImage && (
                <img
                  src={selectedImage}
                  className="w-28 h-28"
                  alt="Vista previa"
                />
              )}
              <div className="flex items-center justify-center w-[100%]">
                <input type="file" name="image" onChange={uploadImage} />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-red-500 font-bold">{mensajeError}</p>
          </div>

          <div className="flex gap-10 mt-10">
            <button
              onClick={handleCanceled}
              className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
            >
              Cancelar
            </button>
            <button
              onClick={confirmUpdate}
              className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
            >
              Confirmar
            </button>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
}

function Modal({ open, onClose, children }) {
  return (
    <div
      className={`fixed z-40 inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-gray-900 bg-opacity-70" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-[50%] rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminBlog;
