import { noteService } from '../services/noteService.js';
import { logger } from '../utils/logger.js';

export class NoteController {
  async getAllNotes(req, res, next) {
    try {
      const notes = await noteService.getAllNotes(req.query);
      res.json({
        success: true,
        data: notes,
        count: notes.length
      });
    } catch (error) {
      next(error);
    }
  }

  async getNoteById(req, res, next) {
    try {
      const { id } = req.params;
      const note = await noteService.getNoteById(id);
      
      res.json({
        success: true,
        data: note
      });
    } catch (error) {
      if (error.message === 'Note not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  async createNote(req, res, next) {
    try {
      const noteData = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category || 'Others',
        priority: req.body.priority || 'medium',
        mood: req.body.mood || '😊',
        tags: req.body.tags || [],
        color: req.body.color || '#667eea'
      };

      const note = await noteService.createNote(noteData);
      
      res.status(201).json({
        success: true,
        data: note,
        message: 'Note created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateNote(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category || 'Others',
        priority: req.body.priority || 'medium',
        mood: req.body.mood || '😊',
        tags: req.body.tags || [],
        color: req.body.color || '#667eea'
      };

      const note = await noteService.updateNote(id, updateData);
      
      res.json({
        success: true,
        data: note,
        message: 'Note updated successfully'
      });
    } catch (error) {
      if (error.message === 'Note not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  async archiveNote(req, res, next) {
    try {
      const { id } = req.params;
      const { archived } = req.body;
      
      const note = await noteService.archiveNote(id, archived);
      
      res.json({
        success: true,
        data: note,
        message: `Note ${archived ? 'archived' : 'unarchived'} successfully`
      });
    } catch (error) {
      if (error.message === 'Note not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  async pinNote(req, res, next) {
    try {
      const { id } = req.params;
      const { pinned } = req.body;
      
      const note = await noteService.pinNote(id, pinned);
      
      res.json({
        success: true,
        data: note,
        message: `Note ${pinned ? 'pinned' : 'unpinned'} successfully`
      });
    } catch (error) {
      if (error.message === 'Note not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  async deleteNote(req, res, next) {
    try {
      const { id } = req.params;
      const result = await noteService.deleteNote(id);
      
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      if (error.message === 'Note not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  async exportNotes(req, res, next) {
    try {
      const notes = await noteService.exportNotes();
      
      res.json({
        success: true,
        data: notes,
        count: notes.length
      });
    } catch (error) {
      next(error);
    }
  }
}

export const noteController = new NoteController();
