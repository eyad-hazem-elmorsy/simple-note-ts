import mongoose, {Schema, Document} from 'mongoose';
import express, {Express, Request, Response} from 'express';

const app: Express = express();

const dbUrl: string = 'mongodb://localhost:27017/test';

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

import { Note, INote } from './models/note';

mongoose.connect(dbUrl)
    .then(() => {
        console.log('Connected to database')
        const PORT: number = 4000;
        app.listen(PORT, () => {
            console.log('Server listen on PORT', PORT);
        });
    })
    .catch(err => console.log(err.message));

app.get('/', async (req: Request, res: Response) => {
    const notes: INote[] = await Note.find({});
    res.locals.notes = notes;
    res.render('index');
});

app.get('/add', (req: Request, res: Response) => {
    res.render('addNote');
});

app.post('/add', async (req: Request, res: Response) => {
    if (!req.body.note) res.redirect('/');
    const note: INote = new Note({
        note: req.body.note
    });
    await note.save();
    res.redirect('/');
});