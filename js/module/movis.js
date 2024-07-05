// Importar el módulo connect desde la ruta correcta
import { connect } from "../../helpers/db/connect.js";

// Clase Movis que extiende de connect
export class Movis extends connect {
    static instance;

    constructor() {
        super();
        if (typeof Movis.instance === "object") {
            return Movis.instance;
        }
        this.collection = this.db.collection("movis");
        Movis.instance = this;
        return this;
    }

    async getAllMovis() {
        try {
            let res = await this.collection.find({}, { projection: { _id: 0, name: 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMovieGenreAccion() {
        try {
            let res = await this.collection.find({ genre: { $elemMatch: { $eq: "Accion" } } }, { projection: { _id: 0, name: 1, genre: 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMovieFormatBlurayMoreThanTwoHundred() {
        try {
            let res = await this.collection.find({ "format.name": "Bluray", "format.copies": { $gt: 200 } }, { projection: {_id: 0, name: 1, "format.name": 1, "format.copies": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesFormatDVDLessThanTen() {
        try {
            let res = await this.collection.find({ "format": { $elemMatch: { name: 'dvd', value: { $lt: 10 } } } }, { projection: { _id: 0, name: 1, 'format.name': 1, 'format.value': 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesActorCobb() {
        try {
            let res = await this.collection.find({ "character": { $elemMatch: { "apodo": "Cobb" } } }, { projection: { _id: 0, name: 1, "character": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesIdActorTwoAndThree() {
        try {
            let res = await this.collection.find({ "character.id_actor": { $in: [2, 3] } }, { projection: { _id: 0, name: 1, character: 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesWithFormatBluray() {
        try {
            let res = await this.collection.find({ "format.name": "Bluray" }, { projection: { _id: 0, name: 1, "format.name": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesGenreCienciaFiccion() {
        try {
            let res = await this.collection.find({ genre: { $elemMatch: { $eq: "Ciencia Ficción" } } }, { projection: { _id: 0, name: 1, genre: 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesWithPrincipalRolMiguel() {
        try {
            let res = await this.collection.find({ "character": { $elemMatch: { "rol": "principal", "apodo": "Miguel" } } }, { projection: { _id: 0, name: 1, "character": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesWithFormatLessThanOneHundred() {
        try {
            let res = await this.collection.find({ "format.copies": { $gte: 100 } }, { projection: { _id: 0, name: 1, format: 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesWithIdActorOne() {
        try {
            let res = await this.collection.find({ "character.id_actor": 1 }, { projection: { _id: 0, name: 1, "character": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesWithPrincipalRolCobb() {
        try {
            let res = await this.collection.find({ "character": { $elemMatch: { "rol": "principal", "apodo": "Cobb" } } }, { projection: { _id: 0, name: 1, "character": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesWithFormatDVDLessThanTen() {
        try {
            let res = await this.collection.find({ "format.name": "dvd", "format.value": { $lt: 10 } }, { projection: { _id: 0, name: 1, "format": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesWithSecondaryActorArthur() {
        try {
            let res = await this.collection.find({ "character": { $elemMatch: { "rol": "secundario", "apodo": "Arthur" } } }, { projection: { _id: 0, name: 1, "character": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesWithPrincipalActorMiguel() {
        try {
            let res = await this.collection.find({ "character": { $elemMatch: { "rol": "principal", "apodo": "Miguel" } } }, { projection: { _id: 0, name: 1, "character": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async getMoviesWithMoreThanTwoHundredCopies() {
        try {
            let res = await this.collection.find({ "format.name": "Bluray", "format.copies": { $gt: 200 } }, { projection: { _id: 0, name: 1, "format": 1 } }).toArray();
            return res;
        } finally {
            await this.closeConnection();
        }
    }

    async closeConnection() {
        await this.conexion.close();
    }
}