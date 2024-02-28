import Advantix from '../assets/images/products/Advantix.webp';
import Bolf from '../assets/images/products/Bolf.jpg';
import Drontal from '../assets/images/products/Drontal.jpg';
import Essec from '../assets/images/products/essec.gif';
import Neutrolor from '../assets/images/products/neutrolor.jpg';
import Procox from '../assets/images/products/Procox.jpg';
import Profender from '../assets/images/products/Profender.jpeg';
import Seresto from '../assets/images/products/Seresto.jpeg';
import Veraflox from '../assets/images/products/Veraflox.jpg';
import Vetridem from '../assets/images/products/vetridem.jpg';

export const productos  = [
    {
        id: 1,
        nombre: 'Advantix',
        descripcion: 'Descripción del producto 1. Detalles adicionales sobre el producto.',
        precio: 19.99,
        disponibles: 10,
        imagen: [Advantix, Bolf, Drontal, Essec, Neutrolor],
        mascota: 'perro',
    },
    {
        id: 2,
        nombre: 'Bolfo',
        descripcion: 'Descripción del producto 2. Detalles adicionales sobre el producto.',
        precio: 29.99,
        disponibles: 5,
        imagen: [Bolf, Advantix, Drontal, Essec, Neutrolor],
        mascota: 'gato',
    },
    {
        id: 3,
        nombre: 'Drontal',
        descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
        precio: 39.99,
        disponibles: 15,
        imagen: [Drontal, Bolf, Advantix, Essec, Neutrolor],
        mascota: 'perro',
    },
    {
        id: 4,
        nombre: 'Essec',
        descripcion: 'Descripción del producto 4. Detalles adicionales sobre el producto.',
        precio: 49.99,
        disponibles: 15,
        imagen: [Essec, Drontal, Bolf, Advantix, Neutrolor],
        mascota: 'perro',
    },
    {
        id: 5,
        nombre: 'Neutrolor',
        descripcion: 'Descripción del producto 5. Detalles adicionales sobre el producto.',
        precio: 59.99,
        disponibles: 15,
        imagen: [Neutrolor, Essec, Drontal, Bolf, Advantix],
        mascota: 'perro',
    },{
        id: 6,
        nombre: 'Procox',
        descripcion: 'Descripción del producto 6. Detalles adicionales sobre el producto.',
        precio: 69.99,
        disponibles: 15,
        imagen: [Procox, Essec, Drontal, Bolf, Advantix],
        mascota: 'perro',
    },
    {
        id: 7,
        nombre: 'Profender',
        descripcion: 'Descripción del producto 7. Detalles adicionales sobre el producto.',
        precio: 79.99,
        disponibles: 15,
        imagen: [Profender, Essec, Drontal, Bolf, Advantix],
        mascota: 'gato',
    },
    {
        id: 8,
        nombre: 'Seresto',
        descripcion: 'Descripción del producto 8. Detalles adicionales sobre el producto.',
        precio: 89.99,
        disponibles: 15,
        imagen: [Seresto, Essec, Drontal, Bolf, Advantix],
        mascota: 'gato',
    },
    {
        id: 9,
        nombre: 'Veraflox',
        descripcion: 'Descripción del producto 9. Detalles adicionales sobre el producto.',
        precio: 99.99,
        disponibles: 15,
        imagen: [Veraflox, Essec, Drontal, Bolf, Advantix],
        mascota: 'gato',
    },
    {
        id: 10,
        nombre: 'vetridem',
        descripcion: 'Descripción del producto 10. Detalles adicionales sobre el producto.',
        precio: 100.00,
        disponibles: 15,
        imagen: [Vetridem, Essec, Drontal, Bolf, Advantix],
        mascota: 'gato',
    },
];