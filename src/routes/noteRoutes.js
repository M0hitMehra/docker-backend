import express from 'express';
import { noteController } from '../controllers/noteController.js';
import { validateNote, validateId, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET /api/notes - Get all notes
router.get('/', noteController.getAllNotes.bind(noteController));

// GET /api/notes/export - Export all notes
router.get('/export', noteController.exportNotes.bind(noteController));

// GET /api/notes/:id - Get note by ID
router.get('/:id', 
  validateId,
  handleValidationErrors,
  noteController.getNoteById.bind(noteController)
);

// POST /api/notes - Create new note
router.post('/',
  validateNote,
  handleValidationErrors,
  noteController.createNote.bind(noteController)
);

// PUT /api/notes/:id - Update note
router.put('/:id',
  validateId,
  validateNote,
  handleValidationErrors,
  noteController.updateNote.bind(noteController)
);

// PATCH /api/notes/:id/archive - Archive/unarchive note
router.patch('/:id/archive',
  validateId,
  handleValidationErrors,
  noteController.archiveNote.bind(noteController)
);

// PATCH /api/notes/:id/pin - Pin/unpin note
router.patch('/:id/pin',
  validateId,
  handleValidationErrors,
  noteController.pinNote.bind(noteController)
);

// DELETE /api/notes/:id - Delete note
router.delete('/:id',
  validateId,
  handleValidationErrors,
  noteController.deleteNote.bind(noteController)
);

export { router as noteRoutes };
