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
        let res = await this.collection.aggregate([
            { $project: { _id: 0, name: 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMovieGenreAccion() {
        let res = await this.collection.aggregate([
            { $match: { genre: { $elemMatch: { $eq: "Accion" } } } },
            { $project: { _id: 0, name: 1, genre: 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMovieFormatBlurayMoreThanTwoHundred() {
        let res = await this.collection.aggregate([
            { $unwind: '$format' },
            { $match: { 'format.name': 'Bluray', 'format.copies': { $gt: 200 } } },
            { $project: { name: 1, 'format.name': 1, 'format.copies': 1, _id: 0 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesFormatDVDLessThanTen() {
        let res = await this.collection.aggregate([
            { $unwind: '$format' },
            { $match: { 'format.name': 'dvd', 'format.value': { $lt: 10 } } },
            { $project: { _id: 0, name: 1, 'format.name': 1, 'format.value': 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesActorCobb() {
        let res = await this.collection.aggregate([
            { $match: { "character.apodo": "Cobb" } },
            { $project: { _id: 0, name: 1, "character": 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesIdActorTwoAndThree() {
        let res = await this.collection.aggregate([
            { $match: { "character.id_actor": { $in: [2, 3] } } },
            { $project: { _id: 0, name: 1, character: 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesWithFormatBluray() {
        let res = await this.collection.aggregate([
            { $match: { "format.name": "Bluray" } },
            { $project: { _id: 0, name: 1, "format.name": 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesGenreCienciaFiccion() {
        let res = await this.collection.aggregate([
            { $match: { genre: { $elemMatch: { $eq: "Ciencia Ficción" } } } },
            { $project: { _id: 0, name: 1, genre: 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesWithPrincipalRolMiguel() {
        let res = await this.collection.aggregate([
            { $match: { "character": { $elemMatch: { "rol": "principal", "apodo": "Miguel" } } } },
            { $project: { _id: 0, name: 1, "character": 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesWithFormatLessThanOneHundred() {
        let res = await this.collection.aggregate([
            { $match: { "format.copies": { $gte: 100 } } },
            { $project: { _id: 0, name: 1, format: 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesWithIdActorOne() {
        let res = await this.collection.aggregate([
            { $match: { "character.id_actor": 1 } },
            { $project: { _id: 0, name: 1, "character": 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesWithPrincipalRolCobb() {
        let res = await this.collection.aggregate([
            { $match: { "character": { $elemMatch: { "rol": "principal", "apodo": "Cobb" } } } },
            { $project: { _id: 0, name: 1, "character": 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesWithFormatDVDLessThanTen() {
        let res = await this.collection.aggregate([
            { $unwind: '$format' },
            { $match: { "format.name": "dvd", "format.value": { $lt: 10 } } },
            { $project: { _id: 0, name: 1, "format": 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesWithSecondaryActorArthur() {
        let res = await this.collection.aggregate([
            { $match: { "character": { $elemMatch: { "rol": "secundario", "apodo": "Arthur" } } } },
            { $project: { _id: 0, name: 1, "character": 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesWithPrincipalActorMiguel() {
        let res = await this.collection.aggregate([
            { $match: { "character": { $elemMatch: { "rol": "principal", "apodo": "Miguel" } } } },
            { $project: { _id: 0, name: 1, character: 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async getMoviesWithMoreThanTwoHundredCopies() {
        let res = await this.collection.aggregate([
            { $unwind: '$format' },
            { $match: { "format.name": "Bluray", "format.copies": { $gt: 200 } } },
            { $project: { _id: 0, name: 1, "format": 1 } }
        ]).toArray();
        await this.closeConnection();
        return res;
    }

    async closeConnection() {
        await this.conexion.close();
    }
}