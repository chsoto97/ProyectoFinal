let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let Perfil = mongoose.Schema({
    correo:{
        type:String,
        required : true,
        unique: true,
    },
    password:{
        type:String,
        required: true
    },
    tipo: String //usuario, restaurante, courier
})

let Restaurante = mongoose.Schema({
    nombre:{
        type:String
    },
    descripcion:{
        type:String
    },
    id : {
    	type : String,
    	required : true,
    	unique: true
    },
    menu:[{
        producto:String, 
        descripcion:String, 
        precio: Number
    }],
    direccion:{
        calle:String, 
        numero:Number
    },
    telefono:Number,
    review:[{
        descripcion:String, 
        calificacion:Number
    }],
    genero:String,
    correo: String,
    ordenes:[{
        id:String,
        timestamp: Date,
        direccion:{
            calle:String,
            numero:Number
        },
        status:String
    }]
});

let Restaurantes = mongoose.model('Restaurantes', Restaurante, 'Restaurantes');

let RestaurantesLista = {
	getAll : function(){
		return Restaurantes.find()
			.then((result)=>{
				return result;
			})
			.catch((err)=>{
				throw Error(err);
			});
	},
	buscar : function(query){
		return Restaurantes.find({ nombre: { $regex: query, $options: "i" } })
			.then((result)=>{
				return result;
			})
			.catch((err)=>{
				throw Error(err);
			});
	},
	getById : function(idParam){
		return Restaurantes.find({ id: idParam})
			.then((result)=>{
				return result;
			})
			.catch((err)=>{
				throw Error(err);
			});
	},
	newRestaurant : function(restaurant){
		return Restaurantes.create(restaurant)
		.then((response)=>{
			return restaurant;
		})
		.catch((err)=>{
			throw Error(err);
		})
	}
}

let Usuario = mongoose.Schema({
    nombre: String,
    pedidos:[{
        articulos:[String], 
        restaurante:String, 
        total:Number, 
        repartidor:String, 
        status:String, 
        confirmacion:String
    }],
    direccion:{
        calle:String, 
        numero:Number
    },
    carrito:{
        articulos:[{
            nombre:String,
            cantidad: Number,
            precio: Number
        }]
    },
    correo:String
});

let Usuarios = mongoose.model('Usuarios', Usuario, 'Usuarios');

let UsuariosLista = {
    
    ordenar:function(){

    },
    historial:function(correo){
        return Usuarios.find({correo:correo})
            .then(usuario=>{
                if(usuario)
                return usuario.pedidos
            })
            .catch(error=>{
                throw error;
            })
    },
    comentar:function(){

    }, 
    editar:function(){

    },
    confirmar:function(){
        
    }
}

let Perfiles = mongoose.model('Perfiles', Perfil, 'Perfiles');

let PerfilesLista = {
    buscarCorreo:function(correo){
        return Perfiles.find({correo:correo})
        .then(result=>{
            if(result){
                return result;
            }
        })
        .catch(error=>{
            throw error;
        }  
        )
    }
}

module.exports = {
    RestaurantesLista,
    UsuariosLista,
    PerfilesLista
};