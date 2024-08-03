import mongoose, {Document, Schema} from 'mongoose';

interface INote extends Document {
    note: string;
}

const noteSchema: Schema<INote> = new Schema({
    note: {
        type: String,
        required: true
    }
});

const Note = mongoose.model<INote>('Note', noteSchema);

export { Note, INote };