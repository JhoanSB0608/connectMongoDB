import {connect} from './helpers/db/connect.js';
import { Movis } from './js/module/movis.js';

let mongo = new Movis()
console.log(await mongo.getMoviesWithFormatBluray());