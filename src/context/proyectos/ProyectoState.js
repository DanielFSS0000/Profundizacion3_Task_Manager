import React, {useReducer} from 'react';
import {v4 as uuidv4} from 'uuid';
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';



const ProyectoState = props => {

    const proyectos = [
        {id:1,nombre:'Tienda Virtual'},
        {id:2,nombre:'Tomorrowland'},
        {id:3,nombre:'Defqon.1'},
        {id:4,nombre:'Decibel'}
    ]

    const initialState = {
        proyectos : [],
        formulario:false,
        errorformulario: false,
        proyecto: null
    }

    

    //Dispatch para ejecutar las acciones

    const [state, dispatch] = useReducer (ProyectoReducer, initialState);

    //Serie de funciones

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos

    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    //Agregar nuevo proyecto

    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4();

        //Insertar el proyecto en el state

        dispatch({
            type: AGREGAR_PROYECTO,
            payload:proyecto
        })
    }

    //Validar el formulario por errores

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto que el usuario dio click

    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload:proyectoId
        })
    }

    //Elimina un proyecto

    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload:proyectoId
        })
    }

    return(
        <ProyectoContext.Provider
        value={{
            proyectos: state.proyectos,
            formulario:state.formulario,
            errorformulario:state.errorformulario,
            proyecto: state.proyecto,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
        }}> 

            {props.children}
        </ProyectoContext.Provider>    
    )
}

export default ProyectoState;