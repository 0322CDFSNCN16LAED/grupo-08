import React from 'react';

export default function LastRegister() {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 style={{color: 'green'}}> Soy el componente Last Register </h5>
                    <h5 className="m-0 font-weight-bold text-gray-800" >
                    ULTIMO USER REGISTRADO / ULTIMO PRODUCT AGREGADO
                    </h5>
                </div>
                <div className="card-body"> 
                    <p>Nombre y apellido del usuario </p>
                    <p>Localidad y Provincia de residencia</p>
                </div>
            </div>
        </div>
    );
}