import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const productosIniciales = [
  { id: 1, nombre: 'Mouse Gamer', categoria: 'Audio', precio: 22000, stock: 22, imagen: '/TALLER2-REACT.github.io/images/MouseGamer.png' },
  { id: 2, nombre: 'Teclado Gamer', categoria: 'Periféricos', precio: 115000, stock: 3, imagen: '/TALLER2-REACT.github.io/images/teclado.png' },
  { id: 3, nombre: 'Pantalla Gamer', categoria: 'Periféricos', precio: 1149900, stock: 7, imagen: '/TALLER2-REACT.github.io/images/PantallaGamer.png' },
  { id: 4, nombre: 'Mouse Pad Gamer', categoria: 'Periféricos', precio: 669000, stock: 1, imagen: '/TALLER2-REACT.github.io/images/MousePadGamer.png' },
  { id: 5, nombre: 'Silla Gamer', categoria: 'Periféricos', precio: 3899000, stock: 3, imagen: '/TALLER2-REACT.github.io/images/SillaGamer.png' },
  { id: 6, nombre: 'Audiculares Gamer', categoria: 'Audio', precio: 72000, stock: 0, imagen: '/TALLER2-REACT.github.io/images/AudicularesGamer.png' },
];

const categorias = ['Audio', 'Periféricos', 'Almacenamiento'];

export const Content = () => {
  const [productos, setProductos] = useState(productosIniciales);
  const [form, setForm] = useState({ nombre: '', precio: 159900, stock: 10, categoria: '', imagen: '', descripcion: '' });

  const handleAgregar = () => {
    if (!form.nombre || !form.categoria) return;
    const nuevo = {
      id: Date.now(),
      nombre: form.nombre,
      categoria: form.categoria,
      precio: form.precio,
      stock: form.stock,
      imagen: form.imagen || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop',
    };
    setProductos([...productos, nuevo]);
    setForm({ nombre: '', precio: 159900, stock: 10, categoria: '', imagen: '', descripcion: '' });
  };

  const handleEliminar = (id) => setProductos(productos.filter(p => p.id !== id));

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: 'rgb(236, 232, 232)', minHeight: '100vh' }}>
      <div className="row px-2 px-md-3">

        {/* Lista de productos */}
        <div className="col-12 col-md-8 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Productos</h5>
            <small className="text-muted">Mostrando {productos.length} productos</small>
          </div>

          {/* 👇 row-cols-3 para mostrar 3 en 3 */}
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {productos.map(p => (
              <div className="col" key={p.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={p.imagen}
                    className="card-img-top"
                    alt={p.nombre}
                    style={{ height: '160px', objectFit: 'cover' }}
                  />
                  <div className="card-body pb-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="card-title mb-0">{p.nombre}</h6>
                      <span className={`badge ${p.stock === 0 ? 'bg-danger' : p.stock <= 2 ? 'bg-warning text-dark' : 'bg-success'}`} style={{ fontSize: '10px' }}>
                        {p.stock === 0 ? 'Sin stock' : p.stock <= 2 ? 'Pocas unidades' : 'En stock'}
                      </span>
                    </div>
                    <small className="text-muted">Categoría: {p.categoria}</small>
                    <p className="mt-2 fw-bold">COP ${p.precio.toLocaleString()}</p>
                  </div>
                  <div className="card-footer bg-white border-top-0 d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary">
                      ✎ Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(p.id)}>
                      🗑 Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario agregar */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm">
            <div className="card-header">
              + Agregar producto
            </div>
            <div className="card-body">
              <label className="form-label fw-semibold">Nombre del producto</label>
              <input
                className="form-control mb-1"
                placeholder="Ej: Auriculares Bluetooth"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
              />
              <small className="text-muted d-block mb-3">Nombre visible en la tarjeta.</small>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label fw-semibold">Precio (COP)</label>
                  <input
                    className="form-control"
                    type="number"
                    value={form.precio}
                    onChange={e => setForm({ ...form, precio: Number(e.target.value) })}
                  />
                </div>
                <div className="col">
                  <label className="form-label fw-semibold">Stock</label>
                  <input
                    className="form-control"
                    type="number"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                  />
                </div>
              </div>

              <label className="form-label fw-semibold">Categoría</label>
              <select
                className="form-select mb-3"
                value={form.categoria}
                onChange={e => setForm({ ...form, categoria: e.target.value })}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map(c => <option key={c}>{c}</option>)}
              </select>

              <label className="form-label fw-semibold">URL de imagen</label>
              <input
                className="form-control mb-1"
                placeholder="https://..."
                value={form.imagen}
                onChange={e => setForm({ ...form, imagen: e.target.value })}
              />
              <small className="text-muted d-block mb-3">Opcional. Si no se define, usa una imagen por defecto.</small>

              <label className="form-label fw-semibold">Descripción</label>
              <textarea
                className="form-control mb-3"
                rows={3}
                placeholder="Detalles del producto..."
                value={form.descripcion}
                onChange={e => setForm({ ...form, descripcion: e.target.value })}
              />

              <button className="btn btn-success w-100 mb-2" onClick={handleAgregar}>
                🛒 Agregar al catálogo
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => setForm({ nombre: '', precio: 159900, stock: 10, categoria: '', imagen: '', descripcion: '' })}
              >
                ◇ Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
